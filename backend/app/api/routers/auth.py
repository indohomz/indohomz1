"""
Authentication Router

Handles user registration, login, logout, password reset, and token management.
"""

from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.connection import get_db
from app.database.models import User
from app.schemas.schemas import (
    UserCreate, User as UserSchema, UserLogin, 
    Token, UserUpdate, UserPasswordUpdate
)
from app.core.security import (
    verify_password, get_password_hash, validate_password_strength,
    create_access_token, create_refresh_token, verify_token,
    get_current_user, verify_recaptcha
)
from app.core.rate_limit import rate_limit

router = APIRouter(prefix="/auth", tags=["Authentication"])


# =============================================================================
# REGISTRATION
# =============================================================================

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Register a new user.
    
    - **email**: Valid email address (unique)
    - **password**: Minimum 8 chars with uppercase, lowercase, and number
    - **name**: User's full name
    - **phone**: Optional phone number
    """
    # Rate limiting
    client_ip = request.client.host if request.client else "unknown"
    await rate_limit(f"register:{client_ip}", max_requests=5, window_seconds=3600)
    
    # Verify reCAPTCHA if provided
    recaptcha_token = request.headers.get("X-Recaptcha-Token")
    if recaptcha_token:
        is_valid = await verify_recaptcha(recaptcha_token, client_ip)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="reCAPTCHA verification failed"
            )
    
    # Validate password strength
    if not validate_password_strength(user_data.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters with uppercase, lowercase, and a number"
        )
    
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email.lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if phone already exists (if provided)
    if user_data.phone:
        existing_phone = db.query(User).filter(User.phone == user_data.phone).first()
        if existing_phone:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered"
            )
    
    # Create user
    new_user = User(
        email=user_data.email.lower(),
        password_hash=get_password_hash(user_data.password),
        name=user_data.name,
        phone=user_data.phone,
        role="user",
        is_active=True,
        is_verified=False,  # Requires email verification
        created_at=datetime.utcnow()
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Generate tokens
    token_data = {
        "user_id": new_user.id,
        "email": new_user.email,
        "role": new_user.role
    }
    
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


# =============================================================================
# LOGIN
# =============================================================================

@router.post("/login", response_model=Token)
async def login(
    credentials: UserLogin,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Login with email and password.
    
    Returns access token and refresh token on success.
    """
    client_ip = request.client.host if request.client else "unknown"
    
    # Rate limiting - 10 attempts per 15 minutes
    await rate_limit(f"login:{client_ip}", max_requests=10, window_seconds=900)
    
    # Find user by email
    user = db.query(User).filter(User.email == credentials.email.lower()).first()
    
    if not user or not verify_password(credentials.password, user.password_hash):
        # Generic message to prevent email enumeration
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Generate tokens
    token_data = {
        "user_id": user.id,
        "email": user.email,
        "role": user.role
    }
    
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


# =============================================================================
# TOKEN REFRESH
# =============================================================================

@router.post("/refresh", response_model=Token)
async def refresh_token(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Refresh access token using refresh token.
    
    Send refresh token in Authorization header as Bearer token.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token required"
        )
    
    token = auth_header.replace("Bearer ", "")
    payload = verify_token(token)
    
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Verify user still exists and is active
    user = db.query(User).filter(User.id == payload.get("user_id")).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Generate new tokens
    token_data = {
        "user_id": user.id,
        "email": user.email,
        "role": user.role
    }
    
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


# =============================================================================
# PROFILE MANAGEMENT
# =============================================================================

@router.get("/me", response_model=UserSchema)
async def get_current_user_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current user's profile information.
    """
    user = db.query(User).filter(User.id == current_user.get("user_id")).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.put("/me", response_model=UserSchema)
async def update_profile(
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update current user's profile.
    """
    user = db.query(User).filter(User.id == current_user.get("user_id")).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if new email is already taken
    if user_update.email and user_update.email.lower() != user.email:
        existing = db.query(User).filter(User.email == user_update.email.lower()).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use"
            )
        user.email = user_update.email.lower()
        user.is_verified = False  # Require re-verification
    
    # Check if new phone is already taken
    if user_update.phone and user_update.phone != user.phone:
        existing = db.query(User).filter(User.phone == user_update.phone).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already in use"
            )
        user.phone = user_update.phone
    
    if user_update.name:
        user.name = user_update.name
    
    user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(user)
    
    return user


@router.put("/me/password")
async def change_password(
    password_update: UserPasswordUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Change current user's password.
    """
    user = db.query(User).filter(User.id == current_user.get("user_id")).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Verify current password
    if not verify_password(password_update.current_password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Validate new password strength
    if not validate_password_strength(password_update.new_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters with uppercase, lowercase, and a number"
        )
    
    # Update password
    user.password_hash = get_password_hash(password_update.new_password)
    user.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Password updated successfully"}


# =============================================================================
# LOGOUT (Token Blacklisting - Optional)
# =============================================================================

@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    Logout current user.
    
    Note: Since JWTs are stateless, true logout requires token blacklisting
    which needs Redis or database storage. For now, this is a placeholder
    that the frontend should use to clear stored tokens.
    """
    # In a production system, you would add the token to a blacklist here
    # For now, return success and let the frontend handle token removal
    return {"message": "Logged out successfully"}


# =============================================================================
# PASSWORD RESET (Placeholder)
# =============================================================================

@router.post("/forgot-password")
async def forgot_password(
    email: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Request password reset email.
    
    Note: This is a placeholder. In production, you would:
    1. Generate a secure reset token
    2. Store it with expiration
    3. Send email with reset link
    """
    client_ip = request.client.host if request.client else "unknown"
    await rate_limit(f"forgot_password:{client_ip}", max_requests=3, window_seconds=3600)
    
    # Always return success to prevent email enumeration
    # In production, send email only if user exists
    return {"message": "If an account exists with this email, you will receive a password reset link."}


@router.post("/reset-password")
async def reset_password(
    token: str,
    new_password: str,
    db: Session = Depends(get_db)
):
    """
    Reset password using reset token.
    
    Note: This is a placeholder. In production, you would:
    1. Verify the reset token
    2. Check expiration
    3. Update password
    4. Invalidate the token
    """
    # Validate password strength
    if not validate_password_strength(new_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters with uppercase, lowercase, and a number"
        )
    
    # In production: verify token, find user, update password
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Password reset not implemented. Please contact support."
    )
