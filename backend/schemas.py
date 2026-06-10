from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class VideoFormat(BaseModel):
    format_id: str
    format_name: str
    ext: str
    resolution: Optional[str] = None
    filesize: Optional[int] = None
    bitrate: Optional[str] = None

class Subtitle(BaseModel):
    language: str
    ext: str

class MetadataResponse(BaseModel):
    platform: str
    title: str
    thumbnail: str
    duration: float
    uploader: Optional[str] = None
    upload_date: Optional[str] = None
    formats: List[VideoFormat]
    audio_formats: Optional[List[VideoFormat]] = None
    subtitles: List[Subtitle]
    playlist_count: Optional[int] = None

class AnalysisRequest(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    url: str
    format_id: str
    type: str  # 'video', 'audio', 'subtitle'

class BatchDownloadRequest(BaseModel):
    urls: List[str]
    format_id: str
    type: str

class DownloadHistoryItem(BaseModel):
    id: str
    title: str
    platform: str
    format: str
    downloaded_at: datetime
    file_size: Optional[int] = None

class AdminStats(BaseModel):
    total_analyses: int
    total_downloads: int
    platform_usage: dict
    popular_formats: dict
    error_count: int
