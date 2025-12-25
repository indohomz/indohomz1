"""
BULK PROPERTY UPLOAD SCRIPT

How to use:
1. Create a CSV file with property details (template below)
2. Put all property images in backend/uploads/properties/ folder
3. Run: python bulk_upload_properties.py properties.csv

CSV Template (properties.csv):
title,location,area,city,price,bedrooms,bathrooms,area_sqft,property_type,furnishing,amenities,description,images
"Luxury 3BHK in Sushant Lok","Sushant Lok 2, Sector 57","Sector 57","Gurgaon","45000","3","2","1500","apartment","furnished","Rooftop Dining Area, High-Speed WiFi, Washing Machine","Beautiful 3BHK with modern amenities","property1_1.jpg,property1_2.jpg,property1_3.jpg"

"""

import csv
import json
import sys
from pathlib import Path
import requests

# Configuration
API_BASE_URL = "http://localhost:8000/api/v1"
UPLOAD_FOLDER = Path(__file__).parent / "uploads" / "properties"


def read_csv_properties(csv_file: str):
    """Read properties from CSV file"""
    properties = []
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Process images
            images = [img.strip() for img in row['images'].split(',')]
            
            property_data = {
                "title": row['title'],
                "location": row['location'],
                "area": row['area'],
                "city": row['city'],
                "price": row['price'],
                "bedrooms": int(row['bedrooms']) if row['bedrooms'] else None,
                "bathrooms": int(row['bathrooms']) if row['bathrooms'] else None,
                "area_sqft": int(row['area_sqft']) if row['area_sqft'] else None,
                "property_type": row['property_type'],
                "furnishing": row['furnishing'],
                "amenities": row['amenities'],
                "description": row['description'],
                "images": json.dumps(images),  # Store as JSON array
                "image_url": images[0] if images else "",  # First image as main
                "is_available": True
            }
            
            properties.append(property_data)
    
    return properties


def upload_property(property_data: dict):
    """Upload a single property via API"""
    try:
        response = requests.post(
            f"{API_BASE_URL}/properties/",
            json=property_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            property_id = response.json()['id']
            print(f"   ✅ Uploaded: {property_data['title']} (ID: {property_id})")
            return True
        else:
            print(f"   ❌ Failed: {property_data['title']}")
            print(f"      Error: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Error uploading {property_data['title']}: {e}")
        return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python bulk_upload_properties.py <csv_file>")
        print("\nExample:")
        print("  python bulk_upload_properties.py properties.csv")
        return
    
    csv_file = sys.argv[1]
    
    if not Path(csv_file).exists():
        print(f"❌ File not found: {csv_file}")
        return
    
    print("=" * 60)
    print("🏠 BULK PROPERTY UPLOAD")
    print("=" * 60)
    
    # Read properties
    print(f"\n📖 Reading properties from: {csv_file}")
    properties = read_csv_properties(csv_file)
    print(f"   Found {len(properties)} properties to upload")
    
    # Upload each property
    print(f"\n📤 Uploading properties...")
    success = 0
    failed = 0
    
    for i, prop in enumerate(properties, 1):
        print(f"\n{i}/{len(properties)}: {prop['title']}")
        if upload_property(prop):
            success += 1
        else:
            failed += 1
    
    # Summary
    print("\n" + "=" * 60)
    print("✅ UPLOAD COMPLETE")
    print("=" * 60)
    print(f"   Success: {success}")
    print(f"   Failed: {failed}")
    print(f"   Total: {len(properties)}")
    print()


if __name__ == "__main__":
    main()
