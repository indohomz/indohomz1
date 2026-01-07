"""
Create Admin User for Production Database
==========================================

This script connects to your production database and creates an admin user.

Usage:
    # For SQLite (if using serverless backend)
    python create_admin_production.py --db sqlite
    
    # For PostgreSQL/Supabase
    python create_admin_production.py --db postgresql --url "your-database-url"
"""

import argparse
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.models import Base, User
from app.core.security import get_password_hash


def create_admin_production(database_url: str, email: str, password: str, name: str = "Admin"):
    """Create admin user in production database"""
    
    print("=" * 70)
    print("🏠 INDOHOMZ PRODUCTION ADMIN CREATOR")
    print("=" * 70)
    print(f"Database: {database_url[:50]}...")
    print(f"Email: {email}")
    print("=" * 70)
    
    # Create engine and session
    engine = create_engine(database_url)
    Base.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Check if user exists
        existing = db.query(User).filter(User.email == email.lower()).first()
        
        if existing:
            print(f"⚠️  User '{email}' already exists!")
            
            # Update to admin if not already
            if existing.role != "admin":
                existing.role = "admin"
                existing.is_active = True
                existing.is_verified = True
                db.commit()
                print(f"✅ Updated '{email}' to admin role")
            else:
                # Update password anyway
                existing.password_hash = get_password_hash(password)
                db.commit()
                print(f"✅ Password updated for existing admin")
            
            return existing
        
        # Create new admin user
        admin = User(
            email=email.lower(),
            password_hash=get_password_hash(password),
            name=name,
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
║       🎉 PRODUCTION ADMIN USER CREATED SUCCESSFULLY          ║
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
        print(f"❌ Error: {e}")
        raise
    finally:
        db.close()
        engine.dispose()


def main():
    parser = argparse.ArgumentParser(description="Create admin user in production database")
    parser.add_argument("--db", choices=["sqlite", "postgresql"], default="sqlite",
                       help="Database type")
    parser.add_argument("--url", help="Database URL (for postgresql)")
    parser.add_argument("--email", default="admin@indohomz.com",
                       help="Admin email")
    parser.add_argument("--password", default="Admin@2024",
                       help="Admin password")
    parser.add_argument("--name", default="Admin User",
                       help="Admin name")
    
    args = parser.parse_args()
    
    # Determine database URL
    if args.db == "postgresql":
        if not args.url:
            print("❌ Error: --url is required for PostgreSQL")
            print("\nExample:")
            print('  python create_admin_production.py --db postgresql \\')
            print('    --url "postgresql://user:pass@host:5432/dbname"')
            sys.exit(1)
        database_url = args.url
    else:
        # SQLite
        database_url = "sqlite:///./indohomz.db"
    
    create_admin_production(
        database_url=database_url,
        email=args.email,
        password=args.password,
        name=args.name
    )
    
    print("\n✅ Done!")


if __name__ == "__main__":
    main()
