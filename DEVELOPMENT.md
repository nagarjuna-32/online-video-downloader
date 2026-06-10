# DownloadMedia Development

DownloadMedia is a professional-grade web application for downloading videos from public sources.

## Quick Start

### Start Both Services

```bash
# Terminal 1: Frontend
cd frontend
npm install
npm run dev

# Terminal 2: Backend  
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Development URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Architecture

```
┌─────────────────────────────────────┐
│      React Frontend (Vite)          │
│    TypeScript + Tailwind + Framer   │
└──────────────┬──────────────────────┘
               │ HTTP/REST
┌──────────────▼──────────────────────┐
│      FastAPI Backend                │
│       yt-dlp + FFmpeg               │
└─────────────────────────────────────┘
```

## Feature Checklist

### Core Features
- [x] URL analysis and metadata extraction
- [x] Video download with format selection
- [x] Audio extraction (MP3, M4A)
- [x] Subtitle download (SRT, VTT)
- [x] Platform detection
- [x] Download history (in-memory)
- [x] Batch download support
- [x] Playlist support

### UI/UX
- [x] Clean, modern interface
- [x] Dark mode support
- [x] Mobile responsive
- [x] Animated components
- [x] Loading states
- [x] Error handling
- [x] Privacy notice display

### Backend
- [x] yt-dlp integration
- [x] Format extraction
- [x] Rate limiting
- [x] Admin statistics (in-memory)
- [x] CORS middleware
- [x] Error logging

### Security
- [x] URL validation
- [x] Input sanitization
- [x] Rate limiting
- [x] DRM rejection
- [x] Login-required rejection
- [x] Temporary file cleanup
- [x] CORS protection

### Deployment
- [ ] Frontend: Vercel
- [ ] Backend: Render

## Environment Setup

### Required Software
- Node.js 16+
- Python 3.10+
- FFmpeg

### Installation (Ubuntu/Debian)

```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Python
sudo apt-get install -y python3 python3-venv python3-pip

# FFmpeg
sudo apt-get install -y ffmpeg
```

## API Documentation

Full API documentation available at: `http://localhost:8000/docs` (Swagger UI)

### Key Endpoints
- `POST /analyze` - Extract metadata from URL
- `POST /download` - Download media
- `GET /history` - Get download history
- `DELETE /history` - Clear history
- `GET /admin/stats` - Admin statistics
- `GET /health` - Health check

## Performance Considerations

- Rate limit: 100 requests/hour
- Automatic cleanup of temp files
- Async/await for non-blocking I/O
- Lazy loading and code splitting
- Image optimization
- CDN ready for static assets

## Troubleshooting

### CORS Issues
Ensure `ALLOW_ORIGINS` in backend `.env` includes frontend URL:
```
ALLOW_ORIGINS=http://localhost:3000,https://downloadmedia.site
```

### yt-dlp Issues
Update yt-dlp:
```bash
pip install --upgrade yt-dlp
```

## Production Deployment

### Environment Variables
Set these in production environment:
- `SECRET_KEY` - Secure random string
- `TEMP_DOWNLOAD_DIR` - Set to `./temp_downloads`
- `ALLOW_ORIGINS` - Frontend URLs (comma-separated)
- `ENVIRONMENT` - Set to `production`

### Security Checklist
- [ ] Enable HTTPS
- [ ] Set strong SECRET_KEY
- [ ] Configure ALLOW_ORIGINS
- [ ] Monitor rate limits
- [ ] Set up error logging
- [ ] Enable CORS only for allowed domains
- [ ] Use environment variables for secrets

## Contributing

Follow these guidelines:
1. Create feature branches
2. Write clear commit messages
3. Test your changes
4. Submit pull requests with descriptions

## Support

For questions and issues, refer to:
- [Frontend Documentation](./frontend/README.md)
- [Backend/API Documentation](./backend/README.md)
- [GitHub Issues](https://github.com/nagarjuna-32/online-video-downloader/issues)

---

Last Updated: 2026
