from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import hashlib
import uuid
import os
import logging
from datetime import datetime
from sqlalchemy.orm import Session

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("socialgrab.api")

from config import ALLOWED_ORIGINS, RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW
from schemas import AnalysisRequest, MetadataResponse, DownloadRequest, AdminStats
from database import get_db, DownloadHistory, AnalysisCache, APIUsage, engine, Base
from yt_dlp_handler import get_video_metadata, download_video
from cache import get_redis, get_from_cache, set_in_cache, close_redis

# Initialize database
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    yield
    # Shutdown
    await close_redis()

app = FastAPI(
    title='SocialGrab API',
    version='1.0.0',
    description='Video download and metadata extraction API',
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting middleware
from collections import defaultdict
request_counts = defaultdict(list)

def check_rate_limit(client_id: str) -> bool:
    """Check if client is within rate limits"""
    current_time = datetime.utcnow().timestamp()
    
    # Clean old requests
    request_counts[client_id] = [
        req_time for req_time in request_counts[client_id]
        if current_time - req_time < RATE_LIMIT_WINDOW
    ]
    
    if len(request_counts[client_id]) >= RATE_LIMIT_REQUESTS:
        return False
    
    request_counts[client_id].append(current_time)
    return True

@app.post('/analyze', response_model=MetadataResponse)
async def analyze_url(
    request: AnalysisRequest,
    db: Session = Depends(get_db)
):
    """Analyze video URL and extract metadata"""
    
    logger.info(f"Incoming URL to analyze: {request.url}")
    
    # URL Validation
    if not request.url or not (request.url.startswith("http://") or request.url.startswith("https://")):
        logger.warning(f"URL validation failed for input: {request.url}")
        raise HTTPException(
            status_code=400,
            detail="Invalid or missing URL. URL must start with http:// or https://"
        )
        
    logger.info("URL validation passed successfully")
    
    # Check rate limit
    if not check_rate_limit('global'):
        raise HTTPException(status_code=429, detail='Rate limit exceeded')
    
    try:
        # Check cache first
        cache_key = f'metadata:{hashlib.md5(request.url.encode()).hexdigest()}'
        cached = await get_from_cache(cache_key)
        
        if cached:
            logger.info("Metadata fetched from cache")
            return MetadataResponse(**cached)
        
        # Extract metadata
        metadata = await get_video_metadata(request.url)
        
        # Cache result
        await set_in_cache(cache_key, metadata.dict(), ttl=86400)  # 24 hours
        
        # Log usage
        usage = APIUsage(
            id=str(uuid.uuid4()),
            endpoint='/analyze',
            platform=metadata.platform,
            status='success'
        )
        db.add(usage)
        db.commit()
        
        logger.info(f"Successfully analyzed URL: {request.url} - Platform: {metadata.platform}")
        return metadata
        
    except Exception as e:
        logger.error(f"Error during metadata extraction for URL {request.url}: {e}")
        # Log error in DB
        usage = APIUsage(
            id=str(uuid.uuid4()),
            endpoint='/analyze',
            status='error',
            error_message=str(e)
        )
        db.add(usage)
        db.commit()
        
        raise HTTPException(status_code=400, detail=str(e))

def remove_file(path: str):
    try:
        if os.path.exists(path):
            os.remove(path)
    except Exception:
        pass

@app.post('/download')
async def download(
    request: DownloadRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Download video/audio/subtitle"""
    
    if not check_rate_limit('global'):
        raise HTTPException(status_code=429, detail='Rate limit exceeded')
    
    try:
        # Get metadata first
        metadata = await get_video_metadata(request.url)
        
        # Download file
        file_path = await download_video(request.url, request.format_id, request.type)
        
        # Get actual file size
        file_size = os.path.getsize(file_path) if os.path.exists(file_path) else None
        
        # Log download
        history = DownloadHistory(
            id=str(uuid.uuid4()),
            url=request.url,
            title=metadata.title,
            platform=metadata.platform,
            format=request.format_id,
            format_id=request.format_id,
            download_type=request.type,
            file_size=file_size
        )
        db.add(history)
        db.commit()
        
        # Register background task to clean up the file after response completes
        background_tasks.add_task(remove_file, file_path)
        
        # Extract file extension from downloaded file
        _, ext = os.path.splitext(file_path)
        download_filename = f"{metadata.title}{ext}"
        
        return FileResponse(
            file_path,
            media_type='application/octet-stream',
            filename=download_filename
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get('/history')
async def get_history(db: Session = Depends(get_db)):
    """Get download history"""
    history = db.query(DownloadHistory).order_by(DownloadHistory.downloaded_at.desc()).limit(50).all()
    return history

@app.delete('/history')
async def clear_history(db: Session = Depends(get_db)):
    """Clear download history"""
    db.query(DownloadHistory).delete()
    db.commit()
    return {'message': 'History cleared'}

@app.get('/admin/stats', response_model=AdminStats)
async def get_stats(db: Session = Depends(get_db)):
    """Get admin statistics"""
    
    total_analyses = db.query(APIUsage).filter(APIUsage.endpoint == '/analyze').count()
    total_downloads = db.query(DownloadHistory).count()
    error_count = db.query(APIUsage).filter(APIUsage.status == 'error').count()
    
    # Platform usage
    platform_usage = {}
    platforms = db.query(APIUsage.platform).filter(APIUsage.status == 'success').all()
    for (platform,) in platforms:
        if platform:
            platform_usage[platform] = platform_usage.get(platform, 0) + 1
    
    # Popular formats
    popular_formats = {}
    formats = db.query(DownloadHistory.format).all()
    for (fmt,) in formats:
        popular_formats[fmt] = popular_formats.get(fmt, 0) + 1
    
    return AdminStats(
        total_analyses=total_analyses,
        total_downloads=total_downloads,
        platform_usage=platform_usage,
        popular_formats=popular_formats,
        error_count=error_count
    )

@app.get('/health')
async def health_check():
    """Health check endpoint"""
    return {'status': 'ok'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
