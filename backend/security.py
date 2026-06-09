"""
Security utilities for input validation and sanitization
"""
import re
from typing import Optional
import logging

logger = logging.getLogger(__name__)

def validate_url(url: str) -> bool:
    """
    Validate URL format
    
    Args:
        url: URL to validate
        
    Returns:
        True if URL is valid
    """
    # Basic URL pattern
    url_pattern = r'^https?://[^\s/$.?#].[^\s]*$'
    
    if not url or not isinstance(url, str):
        return False
    
    if not re.match(url_pattern, url, re.IGNORECASE):
        return False
    
    # Check for suspicious patterns
    suspicious_patterns = [
        r'javascript:',
        r'data:',
        r'file:',
        r'about:',
    ]
    
    for pattern in suspicious_patterns:
        if re.search(pattern, url, re.IGNORECASE):
            logger.warning(f"Suspicious URL pattern detected: {url[:50]}")
            return False
    
    return True

def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename to prevent directory traversal
    
    Args:
        filename: Original filename
        
    Returns:
        Sanitized filename
    """
    # Remove path separators
    filename = filename.replace('/', '_').replace('\\', '_')
    
    # Remove dangerous characters
    filename = re.sub(r'[<>:"|?*]', '', filename)
    
    # Remove leading/trailing dots and spaces
    filename = filename.strip('. ')
    
    # Limit length
    max_length = 255
    if len(filename) > max_length:
        name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
        name = name[:max_length - len(ext) - 1]
        filename = f"{name}.{ext}" if ext else name
    
    return filename

def is_drm_protected_platform(url: str) -> bool:
    """
    Check if URL is from platform that typically has DRM protection
    
    Args:
        url: URL to check
        
    Returns:
        True if platform likely has DRM
    """
    drm_platforms = [
        'netflix',
        'disneyplus',
        'hulu',
        'hbo',
        'amazon.com/Prime',
        'twitch.tv',
        'peacock',
        'appleplus',
    ]
    
    url_lower = url.lower()
    for platform in drm_platforms:
        if platform in url_lower:
            return True
    
    return False

def is_login_required_platform(url: str) -> bool:
    """
    Check if URL is from platform that requires login
    
    Args:
        url: URL to check
        
    Returns:
        True if platform requires login
    """
    login_platforms = [
        'instagram.com',
        'facebook.com',
        'twitter.com',
    ]
    
    # These platforms require login for direct download
    # Check if URL looks like it might be private
    if any(platform in url.lower() for platform in login_platforms):
        if 'reel' in url.lower() or 'post' in url.lower():
            # Could be private, yt-dlp will handle the check
            return False  # Let yt-dlp determine
    
    return False
