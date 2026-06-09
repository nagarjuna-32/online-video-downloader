# SocialGrab Backend

A FastAPI backend for extracting metadata and downloading videos from public sources using yt-dlp.

## Tech Stack
- FastAPI
- Python 3.10+
- yt-dlp
- PostgreSQL
- Redis
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
├── database.py          # SQLAlchemy database models
├── yt_dlp_handler.py   # yt-dlp integration and extraction logic
├── cache.py             # Redis caching utilities
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
# Database
DATABASE_URL=postgresql://user:password@localhost/socialgrab

# Redis
REDIS_URL=redis://localhost:6379

# API
SECRET_KEY=your-secret-key-change-in-production

# Services
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxxxx

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://socialgrab.vercel.app

# Storage
TEMP_DOWNLOAD_DIR=/tmp/socialgrab
```

## Database Setup

### PostgreSQL

```bash
# Create database
createdb socialgrab

# Initialize tables
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"
```

### Migrations with Alembic

```bash
# Create migration
alembic revision --autogenerate -m "Description"

# Apply migration
alembic upgrade head
```

## Redis Setup

```bash
# Start Redis
redis-server

# Or with Docker
docker run -d -p 6379:6379 redis:7-alpine
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

- Metadata caching (24-hour TTL)
- Async/await for non-blocking I/O
- Connection pooling
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
docker build -t socialgrab-backend .
docker run -p 8000:8000 socialgrab-backend
```

### Docker Compose

```bash
docker-compose up -d
```

## Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=.
```

## Troubleshooting

### Database Connection Error
```
Check DATABASE_URL format and PostgreSQL is running
```

### Redis Connection Error
```
Check REDIS_URL and Redis server is running
```

### yt-dlp Not Found
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
3. Write tests for new features
4. Submit pull request

## License
Educational and personal use only.

---

Made with ❤️ by SocialGrab Team
