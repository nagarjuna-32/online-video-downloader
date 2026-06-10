# DownloadMedia Development Instructions

## Project Overview
DownloadMedia is a professional production-ready web application for analyzing and downloading publicly accessible video media from platforms like YouTube, Instagram, TikTok, Facebook, and more.

**Tech Stack:**
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- Backend: FastAPI + Python + yt-dlp + FFmpeg
- Deployment: Vercel (Frontend) + Render (Backend)

## Development Guidelines

### Frontend Development
- Use React Hooks for state management (Zustand for global state)
- TypeScript strict mode enabled
- Tailwind CSS for styling with dark mode support via class strategy
- Framer Motion for smooth animations
- Axios for HTTP requests with centralized API client
- Mobile-first responsive design
- Component-based architecture with small, focused components

### Backend Development
- Use FastAPI async endpoints for performance
- Pydantic models for strict request/response validation
- Rate limiting (100 requests/hour) for abuse prevention
- yt-dlp integration for media extraction
- In-memory stats and history (thread-safe MemoryStorage)
- Automatic cleanup of temporary files
- Comprehensive error logging and monitoring
- CORS protection with configurable origins

## Project Structure

```
downloadmedia/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page-level components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── stores/         # Zustand state stores
│   │   ├── utils/          # Helper functions and API client
│   │   └── types/          # TypeScript interfaces
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── Dockerfile
│
├── backend/
│   ├── main.py             # FastAPI application
│   ├── config.py           # Configuration settings
│   ├── schemas.py          # Pydantic models
│   ├── yt_dlp_handler.py   # yt-dlp integration
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml      # Local development
├── README.md               # Main documentation
├── DEVELOPMENT.md          # Development guide
├── DEPLOYMENT.md           # Deployment instructions
├── CONTRIBUTING.md         # Contribution guidelines
└── setup.sh               # Setup automation script
```

## Key Features Implemented

### Core Features
✅ URL analysis and metadata extraction using yt-dlp
✅ Video download with format selection (360p-1080p)
✅ Audio extraction (MP3, M4A)
✅ Subtitle download (SRT, VTT)
✅ Platform detection (YouTube, Instagram, TikTok, etc.)
✅ Download history tracking (in-memory)
✅ Batch download support
✅ Playlist support

### UI/UX
✅ Clean, modern interface with animations
✅ Light and dark mode support
✅ Mobile responsive design
✅ Animated components with Framer Motion
✅ Loading states and error handling
✅ Privacy notice display
✅ Admin dashboard with statistics

### Backend
✅ yt-dlp integration for format extraction
✅ Rate limiting and abuse prevention
✅ In-memory stats and history storage
✅ Admin statistics endpoint
✅ CORS middleware configuration
✅ Error logging and monitoring
✅ Automatic temporary file cleanup

### Security
✅ URL validation
✅ Input sanitization
✅ Rate limiting
✅ DRM content rejection
✅ Login-required content rejection
✅ Temporary file cleanup
✅ CORS protection
│   └── Environment variable configuration

## Setup Instructions

### Quick Start
```bash
# Run setup script
bash setup.sh

# Start development
# Terminal 1
cd frontend && npm run dev

# Terminal 2
cd backend && source venv/bin/activate && python main.py
```

### With Docker Compose
```bash
docker-compose up
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## API Endpoints

- `POST /analyze` - Extract metadata from URL
- `POST /download` - Download media file
- `POST /batch-download` - Download multiple URLs
- `GET /history` - Get download history
- `DELETE /history` - Clear history
- `GET /admin/stats` - Admin statistics
- `GET /health` - Health check

See backend README for detailed API documentation.

## Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes following code standards
3. Test locally
4. Commit with clear message: `git commit -m "feat: description"`
5. Push and create pull request
6. Request review

## Deployment

### Production Deployment
See DEPLOYMENT.md for detailed instructions:
1. Frontend: Vercel
2. Backend: Render

### Environment Variables
Set in production:
- `SECRET_KEY` - Random 32+ character string
- `TEMP_DOWNLOAD_DIR` - Set to `./temp_downloads`
- `ALLOW_ORIGINS` - Frontend URLs
- `ENVIRONMENT` - Set to `production`

## Performance Considerations

- In-memory stats for rapid response
- Rate limit: 100 requests/hour
- Async/await for non-blocking I/O
- Lazy loading and code splitting
- Image optimization
- Automatic cleanup of temp files

## Testing

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && python main.py
```

## Troubleshooting

**CORS Issues**: Update ALLOW_ORIGINS in backend .env
**yt-dlp Errors**: Update with `pip install --upgrade yt-dlp`

## Contributing

Follow CONTRIBUTING.md for:
- Code standards and style
- Commit message format
- Pull request process
- Feature requests and bug reports

## Support & Documentation

- [README.md](./README.md) - Overview and features
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [Frontend README](./frontend/README.md) - Frontend specifics
- [Backend README](./backend/README.md) - Backend specifics
