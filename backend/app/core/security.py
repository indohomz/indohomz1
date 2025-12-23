"""
IndoHomz Security Module

JWT authentication, password hashing, and security utilities.
"""

from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
import secrets
import re
from app.core.config import settings

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# HTTP Bearer token scheme
security = HTTPBearer()


# =============================================================================
# PASSWORD UTILITIES
# =============================================================================

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


def validate_password_strength(password: str) -> bool:
    """
    Validate password strength:
    - At least 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one digit
    """
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"\d", password):
        return False
    return True


# =============================================================================
# JWT TOKEN UTILITIES
# =============================================================================

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: Dict[str, Any]) -> str:
    """Create a JWT refresh token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None


# =============================================================================
# AUTHENTICATION DEPENDENCIES
# =============================================================================

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    FastAPI dependency to get current authenticated user from JWT token.
    
    Usage:
        @router.get("/protected")
        async def protected_route(user: dict = Depends(get_current_user)):
            return {"user_id": user["user_id"]}
    """
    token = credentials.credentials
    payload = verify_token(token)
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type",
        )
    
    return payload


async def get_current_admin(user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """
    FastAPI dependency to ensure user is an admin.
    
    Usage:
        @router.delete("/properties/{id}")
        async def delete_property(id: int, admin: dict = Depends(get_current_admin)):
            # Only admins can delete
    """
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return user


# Optional authentication (allows both authenticated and anonymous access)
async def get_current_user_optional(request: Request) -> Optional[Dict[str, Any]]:
    """
    Optional authentication - returns user if authenticated, None otherwise.
    Useful for endpoints that work for both authenticated and anonymous users.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    
    token = auth_header.replace("Bearer ", "")
    return verify_token(token)


# =============================================================================
# RECAPTCHA VERIFICATION
# =============================================================================

async def verify_recaptcha(token: str, remote_ip: Optional[str] = None) -> bool:
    """
    Verify reCAPTCHA token with Google's API.
    
    Args:
        token: The reCAPTCHA response token from frontend
        remote_ip: Optional IP address of the user
    
    Returns:
        True if verification succeeds, False otherwise
    """
    if not settings.RECAPTCHA_ENABLED or not settings.RECAPTCHA_SECRET_KEY:
        # If reCAPTCHA is not enabled/configured, skip verification
        return True
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://www.google.com/recaptcha/api/siteverify",
                data={
                    "secret": settings.RECAPTCHA_SECRET_KEY,
                    "response": token,
                    "remoteip": remote_ip,
                },
                timeout=5.0,
            )
            result = response.json()
            return result.get("success", False) and result.get("score", 0) >= 0.5  # v3 score threshold
    except Exception as e:
        print(f"reCAPTCHA verification error: {e}")
        return False  # Fail closed for security


async def require_recaptcha(request: Request, recaptcha_token: Optional[str] = None) -> bool:
    """
    FastAPI dependency to require reCAPTCHA verification.
    
    Usage:
        @router.post("/leads")
        async def create_lead(
            data: LeadCreate,
            verified: bool = Depends(require_recaptcha)
        ):
            # Lead creation code
    """
    if not settings.RECAPTCHA_ENABLED:
        return True
    
    if not recaptcha_token:
        # Try to get from request body or headers
        try:
            body = await request.json()
            recaptcha_token = body.get("recaptcha_token")
        except:
            pass
    
    if not recaptcha_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="reCAPTCHA token required",
        )
    
    # Get client IP
    client_ip = request.client.host if request.client else None
    
    is_valid = await verify_recaptcha(recaptcha_token, client_ip)
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="reCAPTCHA verification failed",
        )
    
    return True


# =============================================================================
# INPUT SANITIZATION
# =============================================================================

def sanitize_html(text: str) -> str:
    """
    Remove potentially dangerous HTML/JavaScript from user input.
    
    For now, we're using simple escaping. For production, consider using bleach library.
    """
    if not text:
        return text
    
    # Escape HTML special characters
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    text = text.replace('"', "&quot;")
    text = text.replace("'", "&#x27;")
    text = text.replace("/", "&#x2F;")
    
    return text


def validate_phone_number(phone: str) -> bool:
    """
    Validate Indian phone number format.
    Accepts: 10 digits starting with 6-9
    """
    # Remove common formatting characters
    cleaned = re.sub(r'[\s\-\(\)\+]', '', phone)
    
    # Check if it's a valid Indian number
    if re.match(r'^[6-9]\d{9}$', cleaned):
        return True
    
    # Also accept with +91 prefix
    if re.match(r'^\+?91[6-9]\d{9}$', cleaned):
        return True
    
    return False


def normalize_phone_number(phone: str) -> str:
    """
    Normalize phone number to standard format (10 digits).
    """
    cleaned = re.sub(r'[\s\-\(\)\+]', '', phone)
    
    # Remove +91 or 91 prefix if present
    if cleaned.startswith('91') and len(cleaned) == 12:
        cleaned = cleaned[2:]
    
    return cleaned


def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


# =============================================================================
# OTP GENERATION
# =============================================================================

def generate_otp(length: int = 6) -> str:
    """Generate a random OTP of specified length"""
    return ''.join(secrets.choice('0123456789') for _ in range(length))


def generate_secure_token(length: int = 32) -> str:
    """Generate a cryptographically secure random token"""
    return secrets.token_urlsafe(length)
