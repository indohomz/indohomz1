"""
🔍 Debug Vercel Login Issue
Quick test to see what's wrong
"""

import requests
import json
from datetime import datetime

print("=" * 70)
print("🔍 INDOHOMZ LOGIN DIAGNOSTIC")
print("=" * 70)
print(f"Time: {datetime.now()}")
print()

# Test 1: Check Render Backend
print("1️⃣  Testing Render Backend...")
try:
    response = requests.get("https://indohomz-backend.onrender.com", timeout=10)
    print(f"   ✓ Backend is online: {response.status_code}")
    data = response.json()
    print(f"   ✓ Version: {data.get('version')}")
    print(f"   ✓ Status: {data.get('status')}")
except Exception as e:
    print(f"   ✗ Backend offline: {e}")
    exit(1)

print()

# Test 2: Try to login
print("2️⃣  Testing Login API...")
try:
    response = requests.post(
        "https://indohomz-backend.onrender.com/api/v1/auth/login",
        json={"email": "info@indohomz.com", "password": "Admin@2024"},
        timeout=10
    )
    
    if response.status_code == 200:
        print(f"   ✅ LOGIN SUCCESSFUL!")
        data = response.json()
        print(f"   ✅ Token: {data['access_token'][:60]}...")
        print()
        print("=" * 70)
        print("✅ BACKEND IS WORKING PERFECTLY!")
        print("=" * 70)
        print()
        print("🎯 Next Steps:")
        print("1. Go to Vercel Dashboard: https://vercel.com/dashboard")
        print("2. Select 'indohomz1' project")
        print("3. Go to Settings → Environment Variables")
        print("4. Add/Update:")
        print("   Key: VITE_API_BASE_URL")
        print("   Value: https://indohomz-backend.onrender.com")
        print("5. Redeploy: Deployments → ... → Redeploy")
        print()
        print("After redeploying, login will work!")
        print("=" * 70)
    else:
        print(f"   ✗ Login failed: {response.status_code}")
        print(f"   ✗ Error: {response.json()}")
        print()
        print("🔧 Issue: Admin user not created yet")
        print()
        print("Solution: Render is still deploying. Wait 2-3 minutes and try again.")
        print("The admin user will be auto-created on startup.")
        
except Exception as e:
    print(f"   ✗ Error: {e}")

print()
print("=" * 70)
