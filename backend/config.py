import os
from dotenv import load_dotenv

load_dotenv()

# Database
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://arjun@localhost:5432/socialgrab')

# Redis
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')

# yt-dlp
TEMP_DOWNLOAD_DIR = os.getenv('TEMP_DOWNLOAD_DIR', '/tmp/socialgrab')

# API
API_TITLE = 'SocialGrab API'
API_VERSION = '1.0.0'
API_DESCRIPTION = 'Download and analyze videos from public sources'

# Security
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = 'HS256'

# Rate limiting
RATE_LIMIT_REQUESTS = 100
RATE_LIMIT_WINDOW = 3600  # 1 hour

# CORS
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000,https://socialgrab.vercel.app').split(',')

# Google Analytics
GOOGLE_ANALYTICS_ID = os.getenv('GOOGLE_ANALYTICS_ID', '')

# Google AdSense
GOOGLE_ADSENSE_CLIENT = os.getenv('GOOGLE_ADSENSE_CLIENT', '')
