"""
Direct CSV to Database Upload (No Server Needed)
Uploads properties directly to SQLite database
"""

import csv
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from app.database.connection import engine
from app.database import models
from app.schemas.schemas import PropertyCreate
from sqlalchemy.orm import Session

def upload_csv_direct(csv_file: str):
    """Upload CSV directly to database"""
    
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    
    print(f"\n{'='*60}")
    print(f"🏠 Direct Database Upload")
    print(f"{'='*60}\n")
    
    with Session(engine) as db:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            success = 0
            for i, row in enumerate(reader, 1):
                try:
                    # Create property
                    prop = models.Property(
                        title=row['title'],
                        price=row['price'],
                        location=row['location'],
                        area=row['area'],
                        city=row['city'],
                        property_type=row['property_type'],
                        bedrooms=int(row['bedrooms']) if row['bedrooms'] else None,
                        bathrooms=int(row['bathrooms']) if row['bathrooms'] else None,
                        area_sqft=int(row['area_sqft']) if row['area_sqft'] else None,
                        furnishing=row['furnishing'],
                        image_url=row['image_url'],
                        images=row['images'],
                        amenities=row['amenities'],
                        highlights=row['highlights'],
                        description=row['description'],
                        is_available=row['is_available'].lower() == 'true',
                        slug=f"property-{i}"  # Auto-generate slug
                    )
                    
                    db.add(prop)
                    db.commit()
                    print(f"✅ [{i}] {row['title']}")
                    success += 1
                    
                except Exception as e:
                    print(f"❌ [{i}] {row['title']}: {e}")
                    db.rollback()
    
    print(f"\n{'='*60}")
    print(f"✅ Uploaded {success} properties!")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python upload_direct.py properties.csv")
    else:
        upload_csv_direct(sys.argv[1])
