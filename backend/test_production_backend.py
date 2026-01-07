#!/usr/bin/env python3
"""
Quick Test: Check Production Backend Status
"""

import requests
import json

def test_backend(backend_url):
    """Test if backend is accessible and working"""
    
    print("=" * 70)
    print("🔍 TESTING PRODUCTION BACKEND")
    print("=" * 70)
    print(f"Backend URL: {backend_url}")
    print("=" * 70)
    
    # Test 1: Root endpoint
    print("\n1. Testing root endpoint...")
    try:
        response = requests.get(f"{backend_url}", timeout=10)
        print(f"   ✓ Status: {response.status_code}")
        print(f"   ✓ Response: {response.json()}")
    except Exception as e:
        print(f"   ✗ Failed: {e}")
        return False
    
    # Test 2: Health check
    print("\n2. Testing health endpoint...")
    try:
        response = requests.get(f"{backend_url}/health", timeout=10)
        print(f"   ✓ Status: {response.status_code}")
        print(f"   ✓ Response: {response.json()}")
    except Exception as e:
        print(f"   ⚠ Health endpoint not found (this is okay)")
    
    # Test 3: Login endpoint with admin credentials
    print("\n3. Testing login endpoint...")
    try:
        response = requests.post(
            f"{backend_url}/api/v1/auth/login",
            json={"email": "admin@indohomz.com", "password": "Admin@2024"},
            timeout=10
        )
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ LOGIN SUCCESSFUL!")
            print(f"   ✓ Token received: {data.get('access_token', 'N/A')[:50]}...")
            return True
        else:
            print(f"   ✗ Login failed: {response.json()}")
            print(f"\n   📋 This means admin user doesn't exist in production DB")
            print(f"   📋 You need to create it using: python create_admin.py")
            return False
            
    except Exception as e:
        print(f"   ✗ Failed: {e}")
        return False


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        backend_url = sys.argv[1]
    else:
        print("Usage: python test_production_backend.py <backend_url>")
        print("\nExample:")
        print("  python test_production_backend.py https://indohomz-backend.onrender.com")
        print("\nOr provide URL when prompted...")
        backend_url = input("\nEnter backend URL: ").strip()
    
    # Remove trailing slash
    backend_url = backend_url.rstrip('/')
    
    success = test_backend(backend_url)
    
    print("\n" + "=" * 70)
    if success:
        print("✅ BACKEND IS WORKING! You can now login at:")
        print("   https://indohomz1.vercel.app/admin/login")
    else:
        print("❌ BACKEND NEEDS SETUP")
        print("\nNext steps:")
        print("1. Deploy backend to Render (see QUICK_FIX_VERCEL.md)")
        print("2. Create admin user in production database")
        print("3. Update Vercel VITE_API_BASE_URL environment variable")
    print("=" * 70)
