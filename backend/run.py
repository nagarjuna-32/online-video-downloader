#!/usr/bin/env python3
"""
SocialGrab Backend - Entry Point
"""
import uvicorn
import logging
from main import app

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

if __name__ == '__main__':
    uvicorn.run(
        'main:app',
        host='0.0.0.0',
        port=8000,
        reload=True,  # Disable in production
        log_level='info'
    )
