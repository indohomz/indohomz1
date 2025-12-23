"""
IndoHomz OTP Service

SMS/Email OTP verification for phone and email validation.
Supports Twilio and MSG91 for SMS.
"""

from typing import Dict, Optional
import httpx
from datetime import datetime, timedelta
from app.core.config import settings
from app.core.security import generate_otp
import asyncio

# In-memory OTP storage (use Redis in production)
_otp_store: Dict[str, Dict[str, any]] = {}


# =============================================================================
# OTP STORAGE
# =============================================================================

def store_otp(identifier: str, otp: str, purpose: str = "verification"):
    """Store OTP with expiry"""
    _otp_store[identifier] = {
        "otp": otp,
        "purpose": purpose,
        "created_at": datetime.now(),
        "expires_at": datetime.now() + timedelta(minutes=settings.OTP_EXPIRY_MINUTES),
        "attempts": 0
    }


def verify_otp(identifier: str, otp: str, max_attempts: int = 3) -> bool:
    """Verify OTP"""
    if identifier not in _otp_store:
        return False
    
    stored = _otp_store[identifier]
    
    # Check if expired
    if datetime.now() > stored["expires_at"]:
        del _otp_store[identifier]
        return False
    
    # Check attempts
    if stored["attempts"] >= max_attempts:
        del _otp_store[identifier]
        return False
    
    # Check OTP
    if stored["otp"] == otp:
        del _otp_store[identifier]
        return True
    else:
        _otp_store[identifier]["attempts"] += 1
        return False


def get_otp_status(identifier: str) -> Optional[Dict]:
    """Get OTP status (for testing/debugging)"""
    if identifier not in _otp_store:
        return None
    
    stored = _otp_store[identifier]
    return {
        "exists": True,
        "expires_at": stored["expires_at"],
        "is_expired": datetime.now() > stored["expires_at"],
        "attempts": stored["attempts"]
    }


# =============================================================================
# SMS PROVIDERS
# =============================================================================

async def send_sms_twilio(phone: str, message: str) -> bool:
    """Send SMS using Twilio"""
    if not all([settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN, settings.TWILIO_PHONE_NUMBER]):
        print("Twilio credentials not configured")
        return False
    
    try:
        auth = (settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        url = f"https://api.twilio.com/2010-04-01/Accounts/{settings.TWILIO_ACCOUNT_SID}/Messages.json"
        
        data = {
            "To": phone if phone.startswith("+") else f"+91{phone}",
            "From": settings.TWILIO_PHONE_NUMBER,
            "Body": message
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, auth=auth, data=data, timeout=10.0)
            return response.status_code == 201
    except Exception as e:
        print(f"Twilio SMS error: {e}")
        return False


async def send_sms_msg91(phone: str, message: str) -> bool:
    """Send SMS using MSG91"""
    if not settings.MSG91_AUTH_KEY:
        print("MSG91 credentials not configured")
        return False
    
    try:
        url = "https://api.msg91.com/api/v5/flow/"
        
        headers = {
            "authkey": settings.MSG91_AUTH_KEY,
            "content-type": "application/json"
        }
        
        # Extract OTP from message (assuming format like "Your OTP is 123456")
        otp = message.split()[-1] if "OTP" in message else message
        
        payload = {
            "sender": settings.MSG91_SENDER_ID,
            "mobile": phone if phone.startswith("91") else f"91{phone}",
            "otp": otp
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload, timeout=10.0)
            return response.status_code == 200
    except Exception as e:
        print(f"MSG91 SMS error: {e}")
        return False


# =============================================================================
# OTP SENDING FUNCTIONS
# =============================================================================

async def send_otp_sms(phone: str, otp: Optional[str] = None) -> tuple[bool, Optional[str]]:
    """
    Send OTP via SMS.
    
    Returns:
        Tuple of (success, otp_code)
    """
    # Generate OTP if not provided
    if not otp:
        otp = generate_otp(6)
    
    # Store OTP
    store_otp(phone, otp, purpose="phone_verification")
    
    # Create message
    message = f"Your IndoHomz verification code is {otp}. Valid for {settings.OTP_EXPIRY_MINUTES} minutes. Do not share this code."
    
    # Send via configured provider
    success = False
    if settings.SMS_PROVIDER == "twilio":
        success = await send_sms_twilio(phone, message)
    elif settings.SMS_PROVIDER == "msg91":
        success = await send_sms_msg91(phone, message)
    else:
        print(f"Unknown SMS provider: {settings.SMS_PROVIDER}")
    
    # For development/testing, also log OTP
    if settings.DEBUG:
        print(f"📱 OTP for {phone}: {otp}")
    
    return success, otp if success else None


async def send_otp_email(email: str, otp: Optional[str] = None) -> tuple[bool, Optional[str]]:
    """
    Send OTP via email.
    
    Note: Email sending not yet implemented. Returns OTP for testing.
    """
    # Generate OTP if not provided
    if not otp:
        otp = generate_otp(6)
    
    # Store OTP
    store_otp(email, otp, purpose="email_verification")
    
    # TODO: Implement email sending (SendGrid/SMTP)
    # For now, just log in development
    if settings.DEBUG:
        print(f"📧 OTP for {email}: {otp}")
    
    return True, otp


async def verify_phone_otp(phone: str, otp: str) -> bool:
    """Verify phone OTP"""
    return verify_otp(phone, otp)


async def verify_email_otp(email: str, otp: str) -> bool:
    """Verify email OTP"""
    return verify_otp(email, otp)


# =============================================================================
# TESTING UTILITIES
# =============================================================================

async def send_test_otp(phone: str) -> str:
    """Send test OTP (development only)"""
    if not settings.DEBUG:
        raise Exception("Test OTP only available in development")
    
    otp = "123456"  # Fixed OTP for testing
    store_otp(phone, otp, purpose="testing")
    print(f"🧪 Test OTP for {phone}: {otp}")
    return otp
