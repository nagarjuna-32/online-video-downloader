import redis.asyncio as redis
from typing import Optional, Any
import json
from config import REDIS_URL

redis_client = None

def get_redis():
    global redis_client
    if redis_client is None:
        redis_client = redis.from_url(REDIS_URL, decode_responses=True)
    return redis_client

async def get_from_cache(key: str) -> Optional[Any]:
    """Get value from Redis cache"""
    client = get_redis()
    value = await client.get(key)
    if value:
        return json.loads(value)
    return None

async def set_in_cache(key: str, value: Any, ttl: int = 3600) -> None:
    """Set value in Redis cache"""
    client = get_redis()
    await client.setex(key, ttl, json.dumps(value))

async def delete_from_cache(key: str) -> None:
    """Delete value from Redis cache"""
    client = get_redis()
    await client.delete(key)

async def clear_cache() -> None:
    """Clear all cache"""
    client = get_redis()
    await client.flushdb()

async def close_redis():
    """Close Redis connection"""
    global redis_client
    if redis_client:
        await redis_client.close()
        redis_client = None
