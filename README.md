# SocialGrab - Download Smarter. Faster. Simpler.

A modern web application for analyzing and downloading publicly accessible videos from popular platforms.

**⚠️ IMPORTANT:** This tool is intended only for downloading content that users own or have permission to download. Private, copyrighted, DRM-protected, or login-required content is not supported.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Zustand (State management)
- Axios (HTTP client)

### Backend
- FastAPI (Web framework)
- Python 3.10+
- yt-dlp (Media extraction)
- PostgreSQL (Database)
- Redis (Caching)
- FFmpeg (Media processing)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon (PostgreSQL)
- Cache: Upstash (Redis)

## Supported Platforms
- YouTube
- Instagram (Reels & Posts)
- Facebook Videos
- X (Twitter)
- TikTok
- Pinterest
- LinkedIn

## Features

✅ **Video Download** - Multiple resolutions and formats
✅ **Audio Extraction** - MP3, M4A, and other formats
✅ **Subtitle Download** - SRT and VTT formats
✅ **Batch Processing** - Download multiple videos
✅ **Playlist Support** - Download entire playlists
✅ **Download History** - Track your downloads
✅ **Dark Mode** - Light and dark themes
✅ **Mobile Responsive** - Works on all devices
✅ **Rate Limiting** - Prevent abuse
✅ **Caching** - Fast metadata retrieval

## Getting Started

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.10+ (for backend)
- PostgreSQL 13+ (for database)
- Redis 6+ (for caching)
- FFmpeg (for media processing)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the server
python main.py
```

The backend will be available at `http://localhost:8000`

## Project Structure

```
socialgrab/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── stores/          # Zustand stores
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # FastAPI backend
│   ├── main.py              # Application entry point
│   ├── config.py            # Configuration
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database models & setup
│   ├── yt_dlp_handler.py    # yt-dlp integration
│   ├── cache.py             # Redis caching
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables template
│
└── README.md                 # This file
```

## API Endpoints

### POST /analyze
Analyze a video URL and extract metadata.

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
  "formats": [...],
  "audio_formats": [...],
  "subtitles": [...]
}
```

### POST /download
Download video, audio, or subtitles.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "format_id": "18",
  "type": "video"
}
```

### GET /history
Get download history.

### DELETE /history
Clear download history.

### GET /admin/stats
Get admin statistics (requires authentication in production).

### GET /health
Health check endpoint.

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```
DATABASE_URL=postgresql://user:password@localhost/socialgrab
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxxxx
ALLOWED_ORIGINS=http://localhost:3000,https://socialgrab.vercel.app
```

## Security

- ✅ URL validation
- ✅ Rate limiting (100 requests per hour)
- ✅ Input sanitization
- ✅ Automatic temporary file cleanup
- ✅ CORS protection
- ✅ DRM content detection (reject login-required)

## Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend (Render)

```bash
cd backend
# Push to GitHub
git push
# Connect repository to Render and deploy
```

### Database (Neon)

Connect your Neon PostgreSQL database URL to the backend environment variables.

### Cache (Upstash)

Connect your Upstash Redis URL to the backend environment variables.

## Monetization

- Google AdSense integration for display ads
- Ad placements:
  - Below hero section
  - Between metadata and format selection
  - Before download button
  - In footer

## Performance

- Lazy loading of components
- Code splitting in Vite
- Image optimization
- Redis caching (24-hour TTL for metadata)
- Background cleanup tasks
- Async/await for non-blocking operations

## License

This project is provided as-is for educational and personal use.

## Disclaimer

Users are responsible for ensuring they have the legal right to download content. The tool does not support:
- Private content
- DRM-protected media
- Login-required content
- Copyrighted material without permission

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by SocialGrab Team
