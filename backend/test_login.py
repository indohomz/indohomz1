"""Test admin login credentials"""
import sys
sys.path.insert(0, '.')

from app.core.security import verify_password
from app.database.connection import SessionLocal
from app.database.models import User

db = SessionLocal()

try:
    user = db.query(User).filter(User.email == 'admin@indohomz.com').first()
    
    if user:
        print(f"✓ User found: {user.email}")
        print(f"  Role: {user.role}")
        print(f"  Active: {user.is_active}")
        print(f"  Verified: {user.is_verified}")
        
        # Test password
        test_password = "Admin@2024"
        is_valid = verify_password(test_password, user.password_hash)
        
        if is_valid:
            print(f"✓ Password '{test_password}' is CORRECT")
        else:
            print(f"✗ Password '{test_password}' is INCORRECT")
            print(f"\nLet's reset the password...")
            from app.core.security import get_password_hash
            user.password_hash = get_password_hash(test_password)
            db.commit()
            print(f"✓ Password has been reset to: {test_password}")
    else:
        print("✗ User not found")
        
finally:
    db.close()
