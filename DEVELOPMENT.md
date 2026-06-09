# SocialGrab Development

SocialGrab is a professional-grade web application for downloading videos from public sources.

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
│  yt-dlp + FFmpeg + PostgreSQL       │
└──────────────┬──────────────────────┘
       ┌───────┴────────┐
       │                │
   PostgreSQL        Redis
  (Database)      (Caching)
```

## Feature Checklist

### Core Features
- [x] URL analysis and metadata extraction
- [x] Video download with format selection
- [x] Audio extraction (MP3, M4A)
- [x] Subtitle download (SRT, VTT)
- [x] Platform detection
- [x] Download history
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
- [x] Redis caching
- [x] Database models
- [x] Admin statistics
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
- [ ] Database: Neon
- [ ] Cache: Upstash

## Environment Setup

### Required Software
- Node.js 16+
- Python 3.10+
- PostgreSQL 13+
- Redis 6+
- FFmpeg

### Installation (Ubuntu/Debian)

```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Python
sudo apt-get install -y python3 python3-venv python3-pip

# PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Redis
sudo apt-get install -y redis-server

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

- Metadata cached for 24 hours
- Rate limit: 100 requests/hour
- Automatic cleanup of temp files
- Async/await for non-blocking I/O
- Lazy loading and code splitting
- Image optimization
- CDN ready for static assets

## Troubleshooting

### CORS Issues
Ensure `ALLOWED_ORIGINS` in backend `.env` includes frontend URL:
```
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Database Connection
Check PostgreSQL is running:
```bash
sudo service postgresql status
```

### Redis Connection
Check Redis is running:
```bash
redis-cli ping
```

### yt-dlp Issues
Update yt-dlp:
```bash
pip install --upgrade yt-dlp
```

## Production Deployment

### Environment Variables
Set these in production environment:
- `DATABASE_URL` - Production PostgreSQL
- `REDIS_URL` - Production Redis
- `SECRET_KEY` - Secure random string
- `GOOGLE_ANALYTICS_ID` - GA tracking ID
- `GOOGLE_ADSENSE_CLIENT` - AdSense ID

### Security Checklist
- [ ] Enable HTTPS
- [ ] Set strong SECRET_KEY
- [ ] Configure ALLOWED_ORIGINS
- [ ] Enable database backups
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
- [Backend Documentation](./backend/README.md)
- [GitHub Issues](https://github.com/yourusername/socialgrab/issues)

---

Last Updated: 2024
