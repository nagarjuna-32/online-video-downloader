import yt_dlp
import os
from typing import Optional, Dict, Any
from schemas import VideoFormat, Subtitle, MetadataResponse
import asyncio
from config import TEMP_DOWNLOAD_DIR

async def get_video_metadata(url: str) -> MetadataResponse:
    """Extract metadata from video URL using yt-dlp"""
    
    loop = asyncio.get_event_loop()
    
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'socket_timeout': 30,
    }
    
    def extract_metadata():
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            try:
                info = ydl.extract_info(url, download=False)
            except yt_dlp.utils.DownloadError as e:
                err_msg = str(e)
                if "ERROR:" in err_msg:
                    err_msg = err_msg.split("ERROR:", 1)[1].strip()
                raise ValueError(err_msg)
            
            # Extract formats
            formats = []
            audio_formats = []
            
            if 'formats' in info:
                for fmt in info['formats']:
                    if fmt.get('vcodec') != 'none':  # Video formats
                        formats.append(VideoFormat(
                            format_id=fmt.get('format_id', ''),
                            format_name=fmt.get('format', ''),
                            ext=fmt.get('ext', ''),
                            resolution=f"{fmt.get('height', 'unknown')}p" if fmt.get('height') else None,
                            filesize=int(fmt.get('filesize')) if fmt.get('filesize') else None,
                            bitrate=f"{int(fmt.get('tbr'))} kbps" if fmt.get('tbr') else None
                        ))
                    elif fmt.get('acodec') != 'none':  # Audio formats
                        audio_formats.append(VideoFormat(
                            format_id=fmt.get('format_id', ''),
                            format_name=fmt.get('format', ''),
                            ext=fmt.get('ext', ''),
                            bitrate=f"{int(fmt.get('abr'))} kbps" if fmt.get('abr') else (f"{fmt.get('abr')} kbps" if fmt.get('abr') else None),
                            filesize=int(fmt.get('filesize')) if fmt.get('filesize') else None
                        ))
            
            # Extract subtitles
            subtitles = []
            if 'subtitles' in info:
                for lang, sub_list in info['subtitles'].items():
                    for sub in sub_list:
                        ext = sub.get('ext', 'vtt')
                        subtitles.append(Subtitle(language=lang, ext=ext))
            
            # Detect platform
            platform = extract_platform(info.get('extractor', 'unknown'))
            
            # Extract uploader info
            uploader = info.get('uploader') or info.get('uploader_id') or 'Unknown'
            
            return MetadataResponse(
                platform=platform,
                title=info.get('title', 'Unknown'),
                thumbnail=info.get('thumbnail', ''),
                duration=info.get('duration', 0),
                uploader=uploader,
                upload_date=info.get('upload_date'),
                formats=formats,
                audio_formats=audio_formats if audio_formats else None,
                subtitles=subtitles,
                playlist_count=info.get('n_entries') if info.get('_type') == 'playlist' else None
            )
    
    return await loop.run_in_executor(None, extract_metadata)

def extract_platform(extractor: str) -> str:
    """Extract platform name from yt-dlp extractor"""
    mapping = {
        'youtube': 'YouTube',
        'instagram': 'Instagram',
        'facebook': 'Facebook',
        'twitter': 'X (Twitter)',
        'tiktok': 'TikTok',
        'pinterest': 'Pinterest',
        'linkedin': 'LinkedIn',
    }
    
    extractor_lower = extractor.lower()
    for key, value in mapping.items():
        if key in extractor_lower:
            return value
    
    return extractor.title()

async def download_video(url: str, format_id: str, download_type: str) -> str:
    """Download video/audio using yt-dlp and return the file path"""
    
    os.makedirs(TEMP_DOWNLOAD_DIR, exist_ok=True)
    loop = asyncio.get_event_loop()
    
    ydl_opts = {
        'format': f"{format_id}+bestaudio/best" if download_type == 'video' else 'bestaudio/best',
        'quiet': True,
        'no_warnings': True,
        'socket_timeout': 30,
        'outtmpl': os.path.join(TEMP_DOWNLOAD_DIR, '%(title)s-%(id)s.%(ext)s'),
        'ffmpeg_location': '/home/arjun/bin',
    }
    
    if download_type == 'video':
        ydl_opts['merge_output_format'] = 'mp4'
    elif download_type == 'audio':
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }]
    
    def download() -> str:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
            if download_type == 'audio':
                base, _ = os.path.splitext(filename)
                filename = f"{base}.mp3"
            elif download_type == 'video':
                base, _ = os.path.splitext(filename)
                filename = f"{base}.mp4"
            return filename
    
    return await loop.run_in_executor(None, download)
