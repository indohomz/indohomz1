"""
IndoHomz Rate Limiting

Simple in-memory rate limiting for API endpoints.
For production with multiple workers, use Redis-based rate limiting.
"""

from fastapi import HTTPException, Request, status
from datetime import datetime, timedelta
from typing import Dict, Tuple
import asyncio

# In-memory store for rate limiting
# Format: {client_identifier: (request_count, window_start_time)}
_rate_limit_store: Dict[str, Tuple[int, datetime]] = {}
_cleanup_task = None


# =============================================================================
# RATE LIMIT STORAGE
# =============================================================================

async def cleanup_old_entries():
    """Periodically clean up old rate limit entries"""
    while True:
        await asyncio.sleep(300)  # Clean up every 5 minutes
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
    
    # For authenticated requests, you could also include user_id
    # auth_header = request.headers.get("Authorization")
    # if auth_header:
    #     # Extract user_id from JWT and add to identifier
    #     pass
    
    return client_ip


# =============================================================================
# RATE LIMIT FUNCTIONS
# =============================================================================

async def check_rate_limit(
    identifier: str,
    max_requests: int,
    window_seconds: int
) -> Tuple[bool, int, int]:
    """
    Check if the request should be rate limited.
    
    Args:
        identifier: Client identifier (IP address, user ID, etc.)
        max_requests: Maximum number of requests allowed in the time window
        window_seconds: Time window in seconds
    
    Returns:
        Tuple of (is_allowed, current_count, retry_after_seconds)
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
# INITIALIZATION
# =============================================================================

def init_rate_limiting():
    """Initialize rate limiting (start cleanup task)"""
    global _cleanup_task
    if _cleanup_task is None:
        _cleanup_task = asyncio.create_task(cleanup_old_entries())
