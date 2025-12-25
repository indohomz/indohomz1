"""
IndoHomz Rate Limiting

Redis-based rate limiting for production (works across multiple workers).
Falls back to in-memory rate limiting when Redis is not available.
"""

from fastapi import HTTPException, Request, status
from datetime import datetime, timedelta
from typing import Dict, Tuple, Optional
import asyncio
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

# Redis client (optional)
_redis_client = None

# In-memory fallback store for rate limiting
# Format: {client_identifier: (request_count, window_start_time)}
_rate_limit_store: Dict[str, Tuple[int, datetime]] = {}
_cleanup_task = None
_using_redis = False


# =============================================================================
# REDIS INITIALIZATION
# =============================================================================

async def init_redis():
    """Initialize Redis connection if enabled"""
    global _redis_client, _using_redis
    
    if not settings.REDIS_ENABLED:
        logger.info("Redis disabled - using in-memory rate limiting")
        return False
    
    try:
        import redis.asyncio as redis
        _redis_client = redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True
        )
        # Test connection
        await _redis_client.ping()
        _using_redis = True
        logger.info("Redis connected - using Redis-based rate limiting")
        return True
    except ImportError:
        logger.warning("redis package not installed - using in-memory rate limiting")
        return False
    except Exception as e:
        logger.warning(f"Redis connection failed: {e} - using in-memory rate limiting")
        return False


# =============================================================================
# RATE LIMIT STORAGE
# =============================================================================

async def cleanup_old_entries():
    """Periodically clean up old rate limit entries (for in-memory store)"""
    while True:
        await asyncio.sleep(300)  # Clean up every 5 minutes
        if _using_redis:
            continue  # Redis handles expiration automatically
            
        now = datetime.now()
        keys_to_delete = []
        
        for key, (_, window_start) in _rate_limit_store.items():
            if now - window_start > timedelta(hours=1):
                keys_to_delete.append(key)
        
        for key in keys_to_delete:
            del _rate_limit_store[key]


def get_client_identifier(request: Request) -> str:
    """
    Get a unique identifier for the client.
    Uses IP address by default, but can be enhanced with user ID for authenticated requests.
    """
    # Try to get real IP from headers (for proxies/load balancers)
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # X-Forwarded-For can contain multiple IPs, take the first one
        client_ip = forwarded_for.split(",")[0].strip()
    else:
        client_ip = request.client.host if request.client else "unknown"
    
    return client_ip


# =============================================================================
# REDIS-BASED RATE LIMITING
# =============================================================================

async def check_rate_limit_redis(
    identifier: str,
    max_requests: int,
    window_seconds: int
) -> Tuple[bool, int, int]:
    """
    Check rate limit using Redis with sliding window algorithm.
    """
    key = f"ratelimit:{identifier}"
    now = datetime.now().timestamp()
    window_start = now - window_seconds
    
    pipe = _redis_client.pipeline()
    
    # Remove old entries outside the window
    pipe.zremrangebyscore(key, 0, window_start)
    # Count current requests in window
    pipe.zcard(key)
    # Add current request
    pipe.zadd(key, {str(now): now})
    # Set expiration
    pipe.expire(key, window_seconds + 1)
    
    results = await pipe.execute()
    current_count = results[1]
    
    if current_count >= max_requests:
        # Get oldest request in window to calculate retry-after
        oldest = await _redis_client.zrange(key, 0, 0, withscores=True)
        if oldest:
            retry_after = int(oldest[0][1] + window_seconds - now)
            return False, current_count, max(retry_after, 1)
        return False, current_count, window_seconds
    
    return True, current_count + 1, 0


# =============================================================================
# IN-MEMORY RATE LIMITING (Fallback)
# =============================================================================

async def check_rate_limit_memory(
    identifier: str,
    max_requests: int,
    window_seconds: int
) -> Tuple[bool, int, int]:
    """
    Check rate limit using in-memory store (fallback when Redis unavailable).
    """
    now = datetime.now()
    window_start = now - timedelta(seconds=window_seconds)
    
    if identifier in _rate_limit_store:
        count, stored_window_start = _rate_limit_store[identifier]
        
        # Check if we're still in the same time window
        if stored_window_start > window_start:
            # Same window - check if limit exceeded
            if count >= max_requests:
                # Calculate when the window expires
                window_end = stored_window_start + timedelta(seconds=window_seconds)
                retry_after = int((window_end - now).total_seconds())
                return False, count, max(retry_after, 1)
            else:
                # Increment counter
                _rate_limit_store[identifier] = (count + 1, stored_window_start)
                return True, count + 1, 0
        else:
            # New window - reset counter
            _rate_limit_store[identifier] = (1, now)
            return True, 1, 0
    else:
        # First request from this identifier
        _rate_limit_store[identifier] = (1, now)
        return True, 1, 0


# =============================================================================
# UNIFIED RATE LIMIT CHECK
# =============================================================================

async def check_rate_limit(
    identifier: str,
    max_requests: int,
    window_seconds: int
) -> Tuple[bool, int, int]:
    """
    Check if the request should be rate limited.
    Uses Redis if available, falls back to in-memory.
    
    Args:
        identifier: Client identifier (IP address, user ID, etc.)
        max_requests: Maximum number of requests allowed in the time window
        window_seconds: Time window in seconds
    
    Returns:
        Tuple of (is_allowed, current_count, retry_after_seconds)
    """
    if _using_redis and _redis_client:
        try:
            return await check_rate_limit_redis(identifier, max_requests, window_seconds)
        except Exception as e:
            logger.warning(f"Redis rate limit check failed: {e}, falling back to memory")
    
    return await check_rate_limit_memory(identifier, max_requests, window_seconds)


# =============================================================================
# RATE LIMIT DECORATORS & DEPENDENCIES
# =============================================================================

async def rate_limit_dependency(
    request: Request,
    max_requests: int = 100,
    window_seconds: int = 60
):
    """
    FastAPI dependency for rate limiting.
    
    Usage:
        @router.post("/leads")
        async def create_lead(
            data: LeadCreate,
            _: None = Depends(lambda req: rate_limit_dependency(req, max_requests=10, window_seconds=60))
        ):
            # Only 10 requests per minute allowed
    """
    identifier = get_client_identifier(request)
    is_allowed, current_count, retry_after = await check_rate_limit(
        identifier, max_requests, window_seconds
    )
    
    if not is_allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded. Try again in {retry_after} seconds.",
            headers={"Retry-After": str(retry_after)},
        )
    
    # Add rate limit info to response headers (optional, for debugging)
    # This would require a custom middleware to add to response


# =============================================================================
# PRE-CONFIGURED RATE LIMITERS
# =============================================================================

async def rate_limit_strict(request: Request):
    """Strict rate limiting: 10 requests per minute"""
    return await rate_limit_dependency(request, max_requests=10, window_seconds=60)


async def rate_limit_moderate(request: Request):
    """Moderate rate limiting: 30 requests per minute"""
    return await rate_limit_dependency(request, max_requests=30, window_seconds=60)


async def rate_limit_relaxed(request: Request):
    """Relaxed rate limiting: 100 requests per minute"""
    return await rate_limit_dependency(request, max_requests=100, window_seconds=60)


async def rate_limit_lead_submission(request: Request):
    """Rate limit for lead submissions: 5 per hour"""
    return await rate_limit_dependency(request, max_requests=5, window_seconds=3600)


async def rate_limit_auth_attempts(request: Request):
    """Rate limit for authentication attempts: 5 per 15 minutes"""
    return await rate_limit_dependency(request, max_requests=5, window_seconds=900)


# =============================================================================
# SIMPLE RATE LIMIT FUNCTION (for direct use)
# =============================================================================

async def rate_limit(
    identifier: str,
    max_requests: int = 100,
    window_seconds: int = 60
):
    """
    Simple rate limit function for direct use in route handlers.
    Raises HTTPException if rate limit exceeded.
    
    Usage:
        await rate_limit(f"register:{client_ip}", max_requests=5, window_seconds=3600)
    """
    is_allowed, current_count, retry_after = await check_rate_limit(
        identifier, max_requests, window_seconds
    )
    
    if not is_allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded. Try again in {retry_after} seconds.",
            headers={"Retry-After": str(retry_after)}
        )


# =============================================================================
# INITIALIZATION
# =============================================================================

async def init_rate_limiting():
    """Initialize rate limiting (Redis + cleanup task)"""
    global _cleanup_task
    
    # Try to connect to Redis
    await init_redis()
    
    # Start cleanup task for in-memory fallback
    if _cleanup_task is None:
        _cleanup_task = asyncio.create_task(cleanup_old_entries())
    
    return _using_redis
