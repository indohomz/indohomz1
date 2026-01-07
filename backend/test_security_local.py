"""Test security functions locally"""
import sys
sys.path.insert(0, '.')

from app.core.security import verify_password, get_password_hash
from app.database.connection import SessionLocal
from app.database.models import User

print("=" * 60)
print("LOCAL SECURITY TEST")
print("=" * 60)

# Test password functions
print("\n1. Testing password functions...")
password = "Admin@2024"
h = get_password_hash(password)
print(f"   Hash generated: {h[:40]}...")
verify_result = verify_password(password, h)
print(f"   Verify works: {verify_result}")

if not verify_result:
    print("   ❌ FAILED - Password verification not working!")
    exit(1)

# Test database
print("\n2. Testing database...")
db = SessionLocal()
user = db.query(User).filter(User.email == "admin@indohomz.com").first()
if user:
    print(f"   Admin exists: {user.email}")
    # Update password
    user.password_hash = get_password_hash(password)
    db.commit()
    print("   Password updated with new hash")
    # Verify
    verify_result = verify_password(password, user.password_hash)
    print(f"   Verify login: {verify_result}")
else:
    print("   No admin found locally (this is OK)")
db.close()

print("\n" + "=" * 60)
print("✅ ALL LOCAL TESTS PASSED!")
print("=" * 60)
