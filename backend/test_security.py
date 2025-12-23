"""
Security Implementation Test Script

Run this to verify Phase 1 & 2 security features are working.
"""

import asyncio
import httpx
from app.core.security import (
    validate_phone_number, 
    sanitize_html, 
    validate_password_strength,
    get_password_hash,
    verify_password,
    generate_otp
)
from app.core.rate_limit import check_rate_limit

def test_phone_validation():
    """Test phone number validation"""
    print("\n📱 Testing Phone Validation...")
    
    tests = [
        ("9876543210", True),
        ("+919876543210", True),
        ("919876543210", True),
        ("1234567890", False),  # Doesn't start with 6-9
        ("98765", False),  # Too short
        ("abc123", False),  # Invalid characters
    ]
    
    for phone, should_pass in tests:
        result = validate_phone_number(phone)
        status = "✅" if result == should_pass else "❌"
        print(f"  {status} {phone:20s} → {'Valid' if result else 'Invalid'}")

def test_html_sanitization():
    """Test HTML/XSS sanitization"""
    print("\n🛡️ Testing HTML Sanitization...")
    
    tests = [
        "<script>alert('xss')</script>",
        "<img src=x onerror=alert('xss')>",
        "Normal text",
        "Price: $100 & above"
    ]
    
    for text in tests:
        sanitized = sanitize_html(text)
        print(f"  Input:  {text}")
        print(f"  Output: {sanitized}")
        print()

def test_password_security():
    """Test password hashing and validation"""
    print("\n🔐 Testing Password Security...")
    
    # Test password strength
    weak_passwords = ["123456", "password", "abc"]
    strong_passwords = ["MyP@ssw0rd123", "SecurePass2024!"]
    
    print("  Weak passwords (should fail):")
    for pwd in weak_passwords:
        valid = validate_password_strength(pwd)
        status = "❌" if not valid else "⚠️"
        print(f"    {status} {pwd}")
    
    print("\n  Strong passwords (should pass):")
    for pwd in strong_passwords:
        valid = validate_password_strength(pwd)
        status = "✅" if valid else "❌"
        print(f"    {status} {pwd}")
    
    # Test hashing
    print("\n  Testing password hashing:")
    password = "MySecurePassword123"
    hashed = get_password_hash(password)
    print(f"    Original: {password}")
    print(f"    Hashed:   {hashed[:50]}...")
    print(f"    Verify:   {'✅ Match' if verify_password(password, hashed) else '❌ No Match'}")

async def test_rate_limiting():
    """Test rate limiting"""
    print("\n⏱️ Testing Rate Limiting...")
    
    client_id = "test_client_123"
    max_requests = 5
    window = 60  # 60 seconds
    
    print(f"  Limit: {max_requests} requests per {window} seconds")
    
    for i in range(7):
        allowed, count, retry_after = await check_rate_limit(client_id, max_requests, window)
        if allowed:
            print(f"  ✅ Request {i+1}: Allowed (count: {count}/{max_requests})")
        else:
            print(f"  ❌ Request {i+1}: Blocked! Retry after {retry_after}s")

def test_otp_generation():
    """Test OTP generation"""
    print("\n🔢 Testing OTP Generation...")
    
    for length in [4, 6, 8]:
        otp = generate_otp(length)
        print(f"  {length}-digit OTP: {otp} (length: {len(otp)})")

async def test_api_endpoints():
    """Test API endpoints are accessible"""
    print("\n🌐 Testing API Endpoints...")
    
    base_url = "http://localhost:8000"
    
    endpoints = [
        "/",
        "/health",
        "/api/v1/properties?limit=1",
        "/api/v1/maps/config",
    ]
    
    async with httpx.AsyncClient() as client:
        for endpoint in endpoints:
            try:
                response = await client.get(f"{base_url}{endpoint}", timeout=5.0)
                status = "✅" if response.status_code == 200 else f"⚠️ {response.status_code}"
                print(f"  {status} {endpoint}")
            except Exception as e:
                print(f"  ❌ {endpoint} - Error: {str(e)}")

def main():
    """Run all tests"""
    print("=" * 70)
    print("🔒 INDOHOMZ SECURITY IMPLEMENTATION TEST")
    print("=" * 70)
    
    try:
        test_phone_validation()
        test_html_sanitization()
        test_password_security()
        asyncio.run(test_rate_limiting())
        test_otp_generation()
        
        print("\n" + "=" * 70)
        print("Testing live API (ensure server is running on :8000)...")
        print("=" * 70)
        asyncio.run(test_api_endpoints())
        
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n" + "=" * 70)
    print("✅ Security tests completed!")
    print("=" * 70)
    print("\nNext steps:")
    print("1. Start the backend server: uvicorn main:app --reload")
    print("2. Configure environment variables in .env")
    print("3. Test lead form submission with rate limiting")
    print("4. Verify reCAPTCHA integration")

if __name__ == "__main__":
    main()
