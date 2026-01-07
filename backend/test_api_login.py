"""Test API login endpoint"""
import requests
import json

# Test the login endpoint
url = "http://localhost:8000/api/v1/auth/login"
payload = {
    "email": "admin@indohomz.com",
    "password": "Admin@2024"
}

print("Testing login endpoint...")
print(f"URL: {url}")
print(f"Payload: {json.dumps(payload, indent=2)}")
print()

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        print("\n✓ Login successful!")
    else:
        print("\n✗ Login failed!")
        
except Exception as e:
    print(f"✗ Error: {e}")
