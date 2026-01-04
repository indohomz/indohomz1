"""
Create Admin User for IndoHomz

Run this script to create an admin user who can access the admin portal.

Usage:
    python create_admin.py
    python create_admin.py --email admin@indohomz.com --password YourSecurePass123 --name "Admin Boss"
"""

import argparse
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from datetime import datetime
from sqlalchemy.orm import Session

# Import database connection and models
from app.database.connection import SessionLocal, engine, Base
from app.database.models import User
from app.core.security import get_password_hash


def create_admin_user(
    email: str,
    password: str,
    name: str = "Admin",
    phone: str = None
) -> User:
    """Create an admin user in the database"""
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if user already exists
        existing = db.query(User).filter(User.email == email.lower()).first()
        
        if existing:
            print(f"⚠️  User with email '{email}' already exists!")
            
            # Update to admin if not already
            if existing.role != "admin":
                existing.role = "admin"
                existing.is_active = True
                existing.is_verified = True
                db.commit()
                print(f"✅ Updated '{email}' to admin role")
            else:
                print(f"ℹ️  User is already an admin")
            
            return existing
        
        # Create new admin user
        admin = User(
            email=email.lower(),
            password_hash=get_password_hash(password),
            name=name,
            phone=phone,
            role="admin",
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow()
        )
        
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        print(f"""
╔══════════════════════════════════════════════════════════════╗
║              🔐 ADMIN USER CREATED SUCCESSFULLY              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Email:    {email:<46} ║
║  Password: {password:<46} ║
║  Name:     {name:<46} ║
║  Role:     admin                                             ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🌐 Login URL: https://indohomz1.vercel.app/admin/login     ║
║                                                              ║
║  ⚠️  IMPORTANT: Save these credentials securely!             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
""")
        
        return admin
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error creating admin: {e}")
        raise
    finally:
        db.close()


def main():
    parser = argparse.ArgumentParser(description='Create IndoHomz Admin User')
    
    parser.add_argument(
        '--email', 
        type=str, 
        default='admin@indohomz.com',
        help='Admin email address'
    )
    parser.add_argument(
        '--password', 
        type=str, 
        default='IndoHomz@2024',
        help='Admin password (min 8 chars, uppercase, lowercase, number)'
    )
    parser.add_argument(
        '--name', 
        type=str, 
        default='IndoHomz Admin',
        help='Admin display name'
    )
    parser.add_argument(
        '--phone', 
        type=str, 
        default='9053070100',
        help='Admin phone number'
    )
    
    args = parser.parse_args()
    
    print("\n🏠 IndoHomz Admin Creator")
    print("=" * 50)
    
    create_admin_user(
        email=args.email,
        password=args.password,
        name=args.name,
        phone=args.phone
    )


if __name__ == "__main__":
    main()
