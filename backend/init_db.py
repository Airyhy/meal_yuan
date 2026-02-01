"""
Initialization script to migrate data from JavaScript files to SQLite database.
Reads existing recipe and material data and populates the database.
"""
import sys
import os
import json
import re

# Add parent directory to path to import models
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db, Material, Dish


def extract_js_data(js_file_path, var_name):
    """Extract JavaScript array/object data from a .js file"""
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the variable assignment
    pattern = rf'const {var_name}\s*=\s*(\[[\s\S]*?\]);'
    match = re.search(pattern, content, re.MULTILINE)
    
    if not match:
        print(f"⚠️  Could not find {var_name} in {js_file_path}")
        return None
    
    js_data = match.group(1)
    
    # Basic JS to JSON conversion
    # Replace single quotes with double quotes (simple approach)
    js_data = re.sub(r"'([^']*)':", r'"\1":', js_data)  # Keys
    js_data = re.sub(r":\s*'([^']*)'", r': "\1"', js_data)  # Values
    
    try:
        data = json.loads(js_data)
        return data
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing JSON from {js_file_path}: {e}")
        return None


def load_materials_from_js():
    """Load materials from all store JS files"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.join(script_dir, '..')
    
    store_files = [
        ('wholefoods-data.js', 'WHOLEFOODS_MATERIALS'),
        ('safeway-data.js', 'SAFEWAY_MATERIALS'),
        ('ranch99-data.js', 'RANCH99_MATERIALS'),
        ('traderjoes-data.js', 'TRADERJOES_MATERIALS')
    ]
    
    all_materials = []
    
    for filename, var_name in store_files:
        file_path = os.path.join(parent_dir, filename)
        if not os.path.exists(file_path):
            print(f"⚠️  File not found: {file_path}")
            continue
        
        print(f"📖 Loading {filename}...")
        materials = extract_js_data(file_path, var_name)
        
        if materials:
            all_materials.extend(materials)
            print(f"   ✅ Loaded {len(materials)} materials from {filename}")
    
    return all_materials


def load_dishes_from_js():
    """Load dishes from data.js"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.join(script_dir, '..')
    data_file = os.path.join(parent_dir, 'data.js')
    
    print(f"📖 Loading dishes from data.js...")
    dishes = extract_js_data(data_file, 'DISHES')
    
    if dishes:
        print(f"   ✅ Loaded {len(dishes)} dishes")
    
    return dishes or []


def populate_database():
    """Populate the database with materials and dishes"""
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✅ Database tables created")
        
        # Clear existing data (for fresh import)
        print("🗑️  Clearing existing data...")
        Material.query.delete()
        Dish.query.delete()
        db.session.commit()
        
        # Load and insert materials
        print("\n📦 Loading materials...")
        materials_data = load_materials_from_js()
        
        for mat_data in materials_data:
            material = Material(
                id=mat_data['id'],
                name_cn=mat_data['nameCn'],
                name_en=mat_data['nameEn'],
                brand=mat_data.get('brand', ''),
                store=mat_data['store'],
                price=mat_data['price'],
                unit=mat_data.get('unit', ''),
                image=mat_data.get('image', ''),
                is_manually_added=False
            )
            db.session.add(material)
        
        db.session.commit()
        print(f"✅ Inserted {len(materials_data)} materials into database")
        
        # Load and insert dishes
        print("\n🍽️  Loading dishes...")
        dishes_data = load_dishes_from_js()
        
        for dish_data in dishes_data:
            dish = Dish(
                name=dish_data['name'],
                image=dish_data.get('image', ''),
                tagline=dish_data.get('tagline', ''),
                steps_json=json.dumps(dish_data.get('steps', {}), ensure_ascii=False),
                material_ids_json=json.dumps(dish_data.get('materialIds', []), ensure_ascii=False)
            )
            db.session.add(dish)
        
        db.session.commit()
        print(f"✅ Inserted {len(dishes_data)} dishes into database")
        
        # Verify
        print("\n📊 Database Summary:")
        print(f"   Materials: {Material.query.count()}")
        print(f"   Dishes: {Dish.query.count()}")
        print(f"   Stores: {', '.join([s[0] for s in db.session.query(Material.store).distinct().all()])}")
        
        print("\n🎉 Database initialization complete!")


if __name__ == '__main__':
    populate_database()
