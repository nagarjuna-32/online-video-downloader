import os
from dotenv import load_dotenv

load_dotenv()

# API Info
API_TITLE = 'DownloadMedia API'
API_VERSION = '1.0.0'
API_DESCRIPTION = 'Download and analyze videos from public sources'

# Environment
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')

# Security
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = 'HS256'

# Storage
TEMP_DOWNLOAD_DIR = os.getenv('TEMP_DOWNLOAD_DIR', './temp_downloads')

# Rate limiting
RATE_LIMIT_REQUESTS = 100
RATE_LIMIT_WINDOW = 3600  # 1 hour

# CORS
raw_origins = os.getenv('ALLOW_ORIGINS') or os.getenv('ALLOWED_ORIGINS') or 'http://localhost:3000,https://downloadmedia.site,https://www.downloadmedia.site'
ALLOWED_ORIGINS = [origin.strip() for origin in raw_origins.split(',') if origin.strip()]

# Google Analytics
GOOGLE_ANALYTICS_ID = os.getenv('GOOGLE_ANALYTICS_ID', '')

# Google AdSense
GOOGLE_ADSENSE_CLIENT = os.getenv('GOOGLE_ADSENSE_CLIENT', '')
