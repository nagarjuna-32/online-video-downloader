# DownloadMedia Backend

A FastAPI backend for extracting metadata and downloading videos from public sources using yt-dlp.

## Tech Stack
- FastAPI
- Python 3.10+
- yt-dlp
- FFmpeg
- Pydantic

## Development

### Install Dependencies

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install packages
pip install -r requirements.txt
```

### Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### Start Development Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

### API Documentation
Swagger UI: `http://localhost:8000/docs`
ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── main.py              # FastAPI application and routes
├── config.py            # Configuration and settings
├── schemas.py           # Pydantic models for request/response
├── yt_dlp_handler.py   # yt-dlp integration and extraction logic
├── requirements.txt     # Python dependencies
└── .env.example         # Environment template
```

## API Endpoints

### POST /analyze
Extract metadata from a video URL.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "platform": "YouTube",
  "title": "Video Title",
  "thumbnail": "https://...",
  "duration": 300,
  "formats": [
    {
      "format_id": "18",
      "format_name": "480p",
      "ext": "mp4",
      "resolution": "480p",
      "filesize": 52428800
    }
  ],
  "audio_formats": [...],
  "subtitles": [
    {
      "language": "en",
      "ext": "vtt"
    }
  ]
}
```

### POST /download
Download media file.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "format_id": "18",
  "type": "video"
}
```

**Response:** Binary file data

### GET /history
Get download history.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Video Title",
    "platform": "YouTube",
    "format": "18",
    "downloaded_at": "2024-01-01T12:00:00",
    "file_size": 52428800
  }
]
```

### DELETE /history
Clear download history.

### GET /admin/stats
Get admin statistics.

**Response:**
```json
{
  "total_analyses": 100,
  "total_downloads": 50,
  "platform_usage": {
    "YouTube": 80,
    "Instagram": 20
  },
  "popular_formats": {
    "18": 30,
    "22": 20
  },
  "error_count": 5
}
```

### GET /health
Health check endpoint.

## Configuration

### Environment Variables

```
SECRET_KEY=generate_a_long_random_secret
TEMP_DOWNLOAD_DIR=./temp_downloads
ALLOW_ORIGINS=https://downloadmedia.site,https://www.downloadmedia.site
ENVIRONMENT=production
```

## Security Features

- ✅ URL validation
- ✅ Rate limiting (100 requests/hour)
- ✅ CORS protection
- ✅ Input sanitization
- ✅ DRM detection
- ✅ Login-required detection
- ✅ Automatic file cleanup
- ✅ Error logging

## Performance Optimizations

- In-memory stats for rapid response
- Async/await for non-blocking I/O
- Background cleanup tasks
- Lazy loading of formats

## Rate Limiting

Default: 100 requests per hour per client

Configure in `config.py`:
```python
RATE_LIMIT_REQUESTS = 100
RATE_LIMIT_WINDOW = 3600  # seconds
```

## Error Handling

All errors return appropriate HTTP status codes:
- 400: Invalid URL or format
- 429: Rate limit exceeded
- 500: Server error

Error responses include detailed error messages for debugging.

## Logging

Configure logging in `main.py`:

```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

## Deployment

### Render

1. Connect GitHub repository
2. Create new Web Service
3. Set environment variables
4. Deploy

### Docker

```bash
docker build -t downloadmedia-backend .
docker run -p 8000:8000 downloadmedia-backend
```

### Docker Compose

```bash
docker-compose up -d
```

## Troubleshooting

### yt-dlp Issues
Update yt-dlp:
```bash
pip install --upgrade yt-dlp
```

### FFmpeg Not Found
```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Windows
choco install ffmpeg
```

## Contributing

1. Create feature branch
2. Follow PEP 8 style guide
3. Submit pull request

## License
Educational and personal use only.

---

Made with ❤️ by DownloadMedia Team
