from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uuid
import os
import logging
import re
from datetime import datetime
from collections import deque, defaultdict
import threading
from config import ALLOWED_ORIGINS, RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW, ENVIRONMENT
from schemas import AnalysisRequest, MetadataResponse, DownloadRequest, AdminStats
from yt_dlp_handler import get_video_metadata, download_video

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("downloadmedia.api")


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

    def add_analysis(self, platform: str | None, success: bool):
        with self.lock:
            self.stats["total_analyses"] += 1
            if success and platform:
                self.stats["platform_usage"][platform] = (
                    self.stats["platform_usage"].get(platform, 0) + 1
                )
            elif not success:
                self.stats["error_count"] += 1

    def add_download(self, item: dict):
        with self.lock:
            self.history.appendleft(item)
            self.stats["total_downloads"] += 1

            fmt = item.get("format")
            if fmt:
                self.stats["popular_formats"][fmt] = (
                    self.stats["popular_formats"].get(fmt, 0) + 1
                )

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
request_counts = defaultdict(list)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("DownloadMedia API started")
    yield
    logger.info("DownloadMedia API stopped")


app = FastAPI(
    title="DownloadMedia API",
    version="1.0.0",
    description="Public video metadata and download API",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if ENVIRONMENT == "production" else ["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "DownloadMedia backend is running",
        "status": "ok",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}


def check_rate_limit(client_id: str) -> bool:
    current_time = datetime.utcnow().timestamp()

    request_counts[client_id] = [
        req_time for req_time in request_counts[client_id]
        if current_time - req_time < RATE_LIMIT_WINDOW
    ]

    if len(request_counts[client_id]) >= RATE_LIMIT_REQUESTS:
        return False

    request_counts[client_id].append(current_time)
    return True


def is_valid_url(url: str) -> bool:
    if not url:
        return False

    url = url.strip()

    pattern = re.compile(
        r"^https?://"
        r"([A-Za-z0-9-]+\.)+[A-Za-z]{2,}"
        r"(:\d+)?"
        r"(/[^\s]*)?$"
    )

    return bool(pattern.match(url))


def safe_filename(name: str) -> str:
    name = re.sub(r'[\\/*?:"<>|]', "", name)
    name = name.strip()
    return name[:120] if name else "downloadmedia-file"


def remove_file(path: str):
    try:
        if path and os.path.exists(path):
            os.remove(path)
            logger.info(f"Temporary file removed: {path}")
    except Exception as e:
        logger.warning(f"Failed to remove temporary file {path}: {e}")


@app.post("/analyze", response_model=MetadataResponse)
async def analyze_url(request: AnalysisRequest, fastapi_request: Request):
    url = request.url.strip() if request.url else ""

    logger.info(f"Incoming analyze request: {url}")

    if not is_valid_url(url):
        memory_storage.add_analysis(platform=None, success=False)
        raise HTTPException(
            status_code=400,
            detail="Invalid or missing URL. Please enter a valid public URL starting with http:// or https://"
        )

    client_ip = fastapi_request.client.host if fastapi_request.client else "global"

    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")

    try:
        metadata = await get_video_metadata(url)

        memory_storage.add_analysis(
            platform=getattr(metadata, "platform", None),
            success=True
        )

        logger.info(f"Analyze successful: {url}")
        return metadata

    except Exception as e:
        logger.error(f"Analyze failed for {url}: {e}")
        memory_storage.add_analysis(platform=None, success=False)
        raise HTTPException(
            status_code=400,
            detail=f"Unable to analyze this URL. Make sure it is public and supported. Error: {str(e)}"
        )


@app.post("/download")
async def download(
    request: DownloadRequest,
    background_tasks: BackgroundTasks,
    fastapi_request: Request
):
    url = request.url.strip() if request.url else ""

    if not is_valid_url(url):
        raise HTTPException(
            status_code=400,
            detail="Invalid or missing URL"
        )

    client_ip = fastapi_request.client.host if fastapi_request.client else "global"

    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")

    try:
        metadata = await get_video_metadata(url)

        file_path = await download_video(
            url=url,
            format_id=request.format_id,
            download_type=request.type
        )

        if not file_path or not os.path.exists(file_path):
            raise HTTPException(
                status_code=500,
                detail="Download failed. File was not created."
            )

        file_size = os.path.getsize(file_path)
        title = safe_filename(getattr(metadata, "title", "downloadmedia-file"))
        if request.type == "video":
            download_filename = f"{title}.mp4"
        elif request.type == "audio":
            download_filename = f"{title}.mp3"
        else:
            _, ext = os.path.splitext(file_path)
            download_filename = f"{title}{ext}"

        memory_storage.add_download({
            "id": str(uuid.uuid4()),
            "title": getattr(metadata, "title", "Unknown"),
            "platform": getattr(metadata, "platform", "Unknown"),
            "format": request.format_id,
            "downloaded_at": datetime.utcnow().isoformat(),
            "file_size": file_size
        })

        background_tasks.add_task(remove_file, file_path)

        return FileResponse(
            path=file_path,
            media_type="application/octet-stream",
            filename=download_filename,
            background=background_tasks
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Download failed for {url}: {e}")
        raise HTTPException(
            status_code=400,
            detail="The selected media could not be converted into a standard format. Please try another quality option."
        )


@app.get("/history")
async def get_history():
    return memory_storage.get_history()


@app.delete("/history")
async def clear_history():
    memory_storage.clear_history()
    return {"message": "History cleared"}


@app.get("/admin/stats", response_model=AdminStats)
async def get_stats():
    return memory_storage.get_stats()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
