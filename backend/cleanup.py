"""
Utility functions for cleanup tasks and background jobs
"""
import asyncio
import os
import shutil
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

async def cleanup_old_temp_files(temp_dir: str, hours: int = 24) -> int:
    """
    Clean up temporary files older than specified hours
    
    Args:
        temp_dir: Directory to clean
        hours: Files older than this many hours will be deleted
        
    Returns:
        Number of files deleted
    """
    if not os.path.exists(temp_dir):
        return 0
    
    deleted_count = 0
    cutoff_time = datetime.now() - timedelta(hours=hours)
    
    try:
        for filename in os.listdir(temp_dir):
            file_path = os.path.join(temp_dir, filename)
            
            if os.path.isfile(file_path):
                file_mtime = datetime.fromtimestamp(os.path.getmtime(file_path))
                
                if file_mtime < cutoff_time:
                    try:
                        os.remove(file_path)
                        deleted_count += 1
                        logger.info(f"Deleted old temp file: {filename}")
                    except Exception as e:
                        logger.error(f"Failed to delete {filename}: {e}")
    
    except Exception as e:
        logger.error(f"Error during cleanup: {e}")
    
    return deleted_count

async def cleanup_directory(directory: str) -> bool:
    """
    Clean up entire directory
    
    Args:
        directory: Directory to clean
        
    Returns:
        True if successful
    """
    try:
        if os.path.exists(directory):
            shutil.rmtree(directory)
            os.makedirs(directory)
            logger.info(f"Cleaned directory: {directory}")
            return True
    except Exception as e:
        logger.error(f"Error cleaning directory: {e}")
        return False
    
    return False

def ensure_temp_dir(temp_dir: str) -> bool:
    """
    Ensure temporary directory exists
    
    Args:
        temp_dir: Directory to create
        
    Returns:
        True if directory exists or was created
    """
    try:
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir, mode=0o755)
        return True
    except Exception as e:
        logger.error(f"Error creating temp directory: {e}")
        return False
