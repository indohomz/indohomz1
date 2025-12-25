"""
Bulk Property Image Optimizer
Optimizes all property images in subfolders

Usage: python optimize_all_properties.py folder_path
"""

import os
import sys
from pathlib import Path
from PIL import Image

MAX_WIDTH = 1920
QUALITY = 85

def optimize_image(input_path: str, output_path: str):
    """Optimize single image: 10MB → 400KB"""
    with Image.open(input_path) as img:
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        width, height = img.size
        if width > MAX_WIDTH:
            ratio = MAX_WIDTH / width
            new_size = (int(width * ratio), int(height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        img.save(output_path, 'WEBP', quality=QUALITY, optimize=True)

def optimize_all(base_folder: str):
    """Optimize all images in property subfolders"""
    base_path = Path(base_folder)
    
    print(f"\n{'='*60}")
    print(f"🏠 IndoHomz Bulk Image Optimizer")
    print(f"{'='*60}\n")
    
    total_original = 0
    total_optimized = 0
    count = 0
    
    # Process each property folder
    for prop_folder in base_path.iterdir():
        if not prop_folder.is_dir() or prop_folder.name == 'optimized':
            continue
        
        print(f"📁 {prop_folder.name}")
        
        # Create output folder
        output_folder = base_path / 'optimized' / prop_folder.name
        output_folder.mkdir(parents=True, exist_ok=True)
        
        # Optimize all images
        for img_file in prop_folder.iterdir():
            if img_file.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']:
                try:
                    input_size = img_file.stat().st_size
                    output_path = output_folder / f"{img_file.stem}.webp"
                    
                    optimize_image(str(img_file), str(output_path))
                    
                    output_size = output_path.stat().st_size
                    total_original += input_size
                    total_optimized += output_size
                    count += 1
                    
                    print(f"   ✅ {img_file.name}: {input_size//1024//1024}MB → {output_size//1024}KB")
                    
                except Exception as e:
                    print(f"   ❌ {img_file.name}: {e}")
    
    print(f"\n{'='*60}")
    print(f"📊 SUMMARY")
    print(f"{'='*60}")
    print(f"   Images optimized: {count}")
    print(f"   Original size: {total_original//1024//1024} MB")
    print(f"   Optimized size: {total_optimized//1024//1024} MB")
    print(f"   Space saved: {(total_original-total_optimized)//1024//1024} MB ({100*(1-total_optimized/total_original):.1f}%)")
    print(f"\n   Output: {base_path / 'optimized'}")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python optimize_all_properties.py folder_path")
        print('Example: python optimize_all_properties.py C:\\Downloads\\Properties')
    else:
        optimize_all(sys.argv[1])
