from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import hashlib
import uuid
import os
import logging
from datetime import datetime
from collections import deque
import threading

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("socialgrab.api")

from config import ALLOWED_ORIGINS, RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW, ENVIRONMENT
from schemas import AnalysisRequest, MetadataResponse, DownloadRequest, AdminStats, DownloadHistoryItem
from yt_dlp_handler import get_video_metadata, download_video

# Thread-safe In-memory storage for runtime history & stats
class MemoryStorage:
    def __init__(self, max_history=100):
        self.history = deque(maxlen=max_history)
        self.stats = {
            "total_analyses": 0,
            "total_downloads": 0,
            "error_count": 0,
            "platform_usage": {},
            "popular_formats": {}
        }
        self.lock = threading.Lock()

    def add_analysis(self, platform: str, success: bool, error_message: str = None):
        with self.lock:
            self.stats["total_analyses"] += 1
            if success:
                if platform:
                    self.stats["platform_usage"][platform] = self.stats["platform_usage"].get(platform, 0) + 1
            else:
                self.stats["error_count"] += 1

    def add_download(self, item: dict):
        with self.lock:
            self.history.appendleft(item)
            self.stats["total_downloads"] += 1
            fmt = item.get("format")
            if fmt:
                self.stats["popular_formats"][fmt] = self.stats["popular_formats"].get(fmt, 0) + 1

    def get_history(self):
        with self.lock:
            return list(self.history)

    def clear_history(self):
        with self.lock:
            self.history.clear()

    def get_stats(self):
        with self.lock:
            return dict(self.stats)

memory_storage = MemoryStorage()

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(
    title='DownloadMedia API',
    version='1.0.0',
    description='Video download and metadata extraction API',
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if ENVIRONMENT == "production" else ["*"],
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
async def analyze_url(request: AnalysisRequest):
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
        # Extract metadata directly (no cache)
        metadata = await get_video_metadata(request.url)
        
        # Log usage in memory storage
        memory_storage.add_analysis(platform=metadata.platform, success=True)
        
        logger.info(f"Successfully analyzed URL: {request.url} - Platform: {metadata.platform}")
        return metadata
        
    except Exception as e:
        logger.error(f"Error during metadata extraction for URL {request.url}: {e}")
        # Log error in memory storage
        memory_storage.add_analysis(platform=None, success=False, error_message=str(e))
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
    background_tasks: BackgroundTasks
):
    """Download video/audio/subtitle"""
    
    if not check_rate_limit('global'):
        raise HTTPException(status_code=429, detail='Rate limit exceeded')
    
    try:
        # Get metadata
        metadata = await get_video_metadata(request.url)
        
        # Download file
        file_path = await download_video(request.url, request.format_id, request.type)
        
        # Get actual file size
        file_size = os.path.getsize(file_path) if os.path.exists(file_path) else None
        
        # Log download in memory
        download_item = {
            "id": str(uuid.uuid4()),
            "title": metadata.title,
            "platform": metadata.platform,
            "format": request.format_id,
            "downloaded_at": datetime.utcnow(),
            "file_size": file_size
        }
        memory_storage.add_download(download_item)
        
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
        logger.error(f"Error during download for URL {request.url}: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get('/history')
async def get_history():
    """Get download history"""
    return memory_storage.get_history()

@app.delete('/history')
async def clear_history():
    """Clear download history"""
    memory_storage.clear_history()
    return {'message': 'History cleared'}

@app.get('/admin/stats', response_model=AdminStats)
async def get_stats():
    """Get admin statistics"""
    return memory_storage.get_stats()

@app.get('/health')
async def health_check():
    """Health check endpoint"""
    return {'status': 'ok'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
