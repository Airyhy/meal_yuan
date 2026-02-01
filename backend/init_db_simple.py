"""
Simple data initialization using manual Python dictionaries.
This approach is more reliable than parsing JavaScript files.
"""
import sys
import os
import json

# Add parent directory to path to import models
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db, Material, Dish


# Sample materials data from each store
MATERIALS_DATA = [
    # Whole Foods
    {"id": "tofu-soft", "nameCn": "嫩豆腐", "nameEn": "Soft Tofu", "brand": "Morinaga", "store": "Whole Foods", "price": 3.49, "unit": "14 oz", "image": "https://images.openfoodfacts.org/images/products/008/569/660/8037/front_en.38.400.jpg"},
    {"id": "ground-pork", "nameCn": "猪肉末", "nameEn": "Ground Pork", "brand": "Picard", "store": "Whole Foods", "price": 6.99, "unit": "1 lb", "image": "https://images.openfoodfacts.org/images/products/327/016/060/2148/front_fr.31.400.jpg"},
    {"id": "scallion", "nameCn": "青葱", "nameEn": "Green Onions", "brand": "Organic Produce", "store": "Whole Foods", "price": 1.49, "unit": "1 bunch", "image": "https://images.unsplash.com/photo-1629798787078-0c59e88aeb73?w=800&h=600&fit=crop"},
    {"id": "garlic", "nameCn": "蒜头", "nameEn": "Garlic", "brand": "Fresh Produce", "store": "Whole Foods", "price": 0.99, "unit": "1 bulb", "image": "assets/materials/garlic.jpg"},
    {"id": "ginger", "nameCn": "生姜", "nameEn": "Fresh Ginger", "brand": "Organic Produce", "store": "Whole Foods", "price": 1.29, "unit": "per lb", "image": "assets/materials/ginger.jpg"},
    {"id": "cornstarch", "nameCn": "玉米淀粉", "nameEn": "Cornstarch", "brand": "365", "store": "Whole Foods", "price": 2.99, "unit": "16 oz", "image": ""},
    {"id": "chicken-broth", "nameCn": "鸡汤", "nameEn": "Chicken Broth", "brand": "Pacific Foods", "store": "Whole Foods", "price": 3.49, "unit": "32 oz", "image": ""},
    {"id": "canola-oil", "nameCn": "菜籽油", "nameEn": "Canola Oil", "brand": "365", "store": "Whole Foods", "price": 4.99, "unit": "48 oz", "image": ""},
    {"id": "chicken-thighs", "nameCn": "鸡腿肉", "nameEn": "Chicken Thighs", "brand": "Organic", "store": "Whole Foods", "price": 8.99, "unit": "1 lb", "image": ""},
    {"id": "roasted-peanuts", "nameCn": "花生", "nameEn": "Roasted Peanuts", "brand": "365", "store": "Whole Foods", "price": 3.99, "unit": "16 oz", "image": ""},
    {"id": "soy-sauce", "nameCn": "酱油", "nameEn": "Soy Sauce", "brand": "Kikkoman", "store": "Whole Foods", "price": 4.49, "unit": "15 oz", "image": ""},
    {"id": "eggs", "nameCn": "鸡蛋", "nameEn": "Eggs", "brand": "Organic", "store": "Whole Foods", "price": 5.99, "unit": "1 dozen", "image": ""},
    {"id": "roma-tomato", "nameCn": "罗马番茄", "nameEn": "Roma Tomato", "brand": "Fresh", "store": "Whole Foods", "price": 2.99, "unit": "per lb", "image": "assets/materials/tomatoes.jpg"},
    {"id": "sugar", "nameCn": "白糖", "nameEn": "Sugar", "brand": "365", "store": "Whole Foods", "price": 2.49, "unit": "2 lb", "image": ""},
    {"id": "white-pepper", "nameCn": "白胡椒", "nameEn": "White Pepper", "brand": "McCormick", "store": "Whole Foods", "price": 3.99, "unit": "1.5 oz", "image": ""},
    {"id": "ground-beef", "nameCn": "牛肉末", "nameEn": "Ground Beef", "brand": "Grass-fed", "store": "Whole Foods", "price": 7.99, "unit": "1 lb", "image": "assets/materials/ground-beef.jpg"},
    {"id": "parsley", "nameCn": "欧芹", "nameEn": "Parsley", "brand": "Fresh", "store": "Whole Foods", "price": 1.99, "unit": "1 bunch", "image": "assets/materials/parsley.jpg"},
    {"id": "tomato-paste", "nameCn": "番茄膏", "nameEn": "Tomato Paste", "brand": "Cento", "store": "Whole Foods", "price": 2.49, "unit": "6 oz", "image": ""},
    {"id": "breadcrumbs", "nameCn": "面包糠", "nameEn": "Breadcrumbs", "brand": "Panko", "store": "Whole Foods", "price": 3.49, "unit": "8 oz", "image": ""},
    {"id": "olive-oil", "nameCn": "橄榄油", "nameEn": "Olive Oil", "brand": "365", "store": "Whole Foods", "price": 9.99, "unit": "33.8 oz", "image": ""},
    {"id": "chicken-breast", "nameCn": "鸡胸肉", "nameEn": "Chicken Breast", "brand": "Organic", "store": "Whole Foods", "price": 9.99, "unit": "1 lb", "image": ""},
    {"id": "butter", "nameCn": "黄油", "nameEn": "Butter", "brand": "Kerrygold", "store": "Whole Foods", "price": 4.99, "unit": "8 oz", "image": "assets/materials/butter.jpg"},
    {"id": "lemon", "nameCn": "柠檬", "nameEn": "Lemon", "brand": "Fresh", "store": "Whole Foods", "price": 0.99, "unit": "each", "image": ""},
    
    # Ranch 99 (Chinese supermarket)
    {"id": "doubanjiang", "nameCn": "豆瓣酱", "nameEn": "Doubanjiang", "brand": "Pixian", "store": "Ranch99", "price": 3.99, "unit": "9 oz", "image": ""},
    {"id": "sichuan-pepper", "nameCn": "花椒", "nameEn": "Sichuan Pepper", "brand": "Mala", "store": "Ranch99", "price": 4.99, "unit": "4 oz", "image": ""},
    {"id": "chili-oil", "nameCn": "辣椒油", "nameEn": "Chili Oil", "brand": "Laoganma", "store": "Ranch99", "price": 3.49, "unit": "7.4 oz", "image": ""},
    {"id": "dried-chilies", "nameCn": "干辣椒", "nameEn": "Dried Chilies", "brand": "Sichuan", "store": "Ranch99", "price": 2.99, "unit": "4 oz", "image": ""},
    {"id": "black-vinegar", "nameCn": "黑醋", "nameEn": "Black Vinegar", "brand": "Chinkiang", "store": "Ranch99", "price": 3.99, "unit": "18.6 oz", "image": ""},
    {"id": "shaoxing", "nameCn": "绍兴酒", "nameEn": "Shaoxing Wine", "brand": "Pagoda", "store": "Ranch99", "price": 5.99, "unit": "25 oz", "image": ""},
    {"id": "light-soy", "nameCn": "生抽", "nameEn": "Light Soy Sauce", "brand": "Lee Kum Kee", "store": "Ranch99", "price": 3.99, "unit": "16.9 oz", "image": ""},
    
    # Safeway
    {"id": "paprika", "nameCn": "红椒粉", "nameEn": "Paprika", "brand": "McCormick", "store": "Safeway", "price": 3.99, "unit": "2 oz", "image": ""},
    {"id": "black-pepper", "nameCn": "黑胡椒", "nameEn": "Black Pepper", "brand": "McCormick", "store": "Safeway", "price": 4.49, "unit": "2.5 oz", "image": ""},
    {"id": "sea-salt", "nameCn": "海盐", "nameEn": "Sea Salt", "brand": "Morton", "store": "Safeway", "price": 2.99, "unit": "26 oz", "image": ""},
    {"id": "thyme", "nameCn": "百里香", "nameEn": "Thyme", "brand": "McCormick", "store": "Safeway", "price": 3.99, "unit": "0.75 oz", "image": ""},
    {"id": "oregano", "nameCn": "牛至", "nameEn": "Oregano", "brand": "McCormick", "store": "Safeway", "price": 3.99, "unit": "0.75 oz", "image": ""},
    {"id": "chili-flakes", "nameCn": "辣椒片", "nameEn": "Chili Flakes", "brand": "McCormick", "store": "Safeway", "price": 3.49, "unit": "1.5 oz", "image": ""},
]


DISHES_DATA = [
    {
        "name": "麻婆豆腐 (Mapo Tofu)",
        "image": "assets/mapo-tofu.jpg",
        "tagline": "麻辣豆腐配猪肉末与花椒 / Spicy tofu with pork and Sichuan pepper.",
        "steps": {
            "preparation": [
                "切1英寸豆腐块，入加盐沸水焯1分钟沥干 / Dice tofu into 1-inch cubes; blanch in salted water for 1 minute, then drain.",
                "蒜、姜、葱切末备好 / Mince garlic, ginger, and scallion."
            ],
            "main": [
                "热油下蒜、姜、葱炒香，加入豆瓣酱炒出红油 / Sauté aromatics; stir in doubanjiang until the oil turns red.",
                "加入猪肉末炒散至变色 / Add ground pork and cook until browned."
            ],
            "side": [
                "倒入高汤，下豆腐小火烧5分钟入味 / Pour in broth, add tofu, and simmer gently for 5 minutes."
            ],
            "seasoning": [
                "用水淀粉勾芡，撒花椒粉并淋红油 / Thicken with cornstarch slurry; finish with Sichuan pepper and chili oil."
            ]
        },
        "materialIds": ["tofu-soft", "ground-pork", "scallion", "garlic", "ginger", "cornstarch", "chicken-broth", "canola-oil", "doubanjiang", "sichuan-pepper", "chili-oil"]
    },
    {
        "name": "宫保鸡丁 (Kung Pao Chicken)",
        "image": "assets/kung-pao-chicken.jpg",
        "tagline": "花生辣椒香炒鸡丁 / Kung pao chicken with peanuts and chilies.",
        "steps": {
            "preparation": [
                "鸡丁用生抽、绍兴酒、淀粉腌制15分钟 / Marinate chicken with soy sauce, Shaoxing wine, and cornstarch for 15 minutes.",
                "花生、干辣椒备用 / Prepare peanuts and dried chilies."
            ],
            "main": [
                "大火滑炒鸡丁至变色微焦，盛出 / Stir-fry chicken on high heat until browned; remove from pan."
            ],
            "side": [
                "干锅略炒花生与干辣椒，盛出备用 / Toast peanuts and dried chilies briefly; set aside."
            ],
            "seasoning": [
                "炒香蒜、姜、葱，加入调味汁收至发亮 / Cook garlic, ginger, and scallion; add sauce and reduce until glossy.",
                "回锅鸡丁与花生快速翻匀 / Return chicken and peanuts; toss quickly to coat."
            ]
        },
        "materialIds": ["chicken-thighs", "garlic", "scallion", "roasted-peanuts", "soy-sauce", "cornstarch", "dried-chilies", "black-vinegar", "shaoxing"]
    },
    {
        "name": "番茄炒蛋 (Tomato Egg Stir-Fry)",
        "image": "assets/tomato-egg.jpg",
        "tagline": "家常番茄炒蛋 / Classic tomato egg stir-fry.",
        "steps": {
            "preparation": [
                "鸡蛋加少许盐与清水打散 / Beat eggs with a pinch of salt and a splash of water.",
                "番茄切块，葱切末 / Chop tomatoes and scallions."
            ],
            "main": [
                "中火炒鸡蛋至刚凝固，盛出 / Scramble eggs over medium heat until just set; remove."
            ],
            "side": [
                "番茄加少许盐和糖炒至出汁 / Cook tomatoes with a pinch of salt and sugar until saucy."
            ],
            "seasoning": [
                "回锅鸡蛋轻轻翻拌 / Return eggs and gently fold to combine.",
                "撒葱花，滴少许香油 / Finish with scallions and a drizzle of sesame oil."
            ]
        },
        "materialIds": ["eggs", "roma-tomato", "scallion", "canola-oil", "sugar", "white-pepper", "light-soy"]
    },
    {
        "name": "肉丸酱 (Meatball Paste)",
        "image": "assets/meatballs.jpg",
        "tagline": "番茄酱汁慢炖肉丸 / Savory meatballs simmered in tomato paste.",
        "steps": {
            "preparation": [
                "肉馅与面包糠、鸡蛋、洋葱、蒜末、盐胡椒拌匀 / Combine ground meat with breadcrumbs, egg, onion, garlic, salt, and pepper.",
                "搓成约1英寸肉丸，冷藏10分钟定型 / Form 1-inch meatballs; chill 10 minutes to set."
            ],
            "main": [
                "热油煎至表面金黄 / Sear in hot oil until browned on all sides."
            ],
            "side": [
                "番茄膏用高汤稀释备用 / Dilute tomato paste with broth for a simmering sauce."
            ],
            "seasoning": [
                "加入番茄汁小火焖12-15分钟 / Simmer in tomato sauce for 12-15 minutes.",
                "撒香草并调味收尾 / Finish with herbs and adjust seasoning."
            ]
        },
        "materialIds": ["ground-beef", "eggs", "parsley", "garlic", "tomato-paste", "breadcrumbs", "olive-oil", "oregano", "chili-flakes"]
    },
    {
        "name": "香煎鸡胸 (Pan-Fried Chicken Breast)",
        "image": "assets/pan-fried-chicken-breast.jpg",
        "tagline": "金黄外皮多汁鸡胸 / Juicy chicken with a golden crust.",
        "steps": {
            "preparation": [
                "擦干水分，敲至约1/2英寸厚 / Pat chicken dry and pound to about 1/2-inch thickness.",
                "两面撒盐、黑胡椒和红椒粉 / Season both sides with salt, pepper, and paprika."
            ],
            "main": [
                "热油每面煎3-4分钟至金黄 / Sear in hot oil 3-4 minutes per side until golden."
            ],
            "side": [
                "黄油与蒜片备用 / Prepare butter and sliced garlic for basting."
            ],
            "seasoning": [
                "转小火加黄油蒜片，煎至中心165°F / Lower heat, add butter and garlic; cook to 165°F internal temp.",
                "静置5分钟再切片 / Rest 5 minutes before slicing."
            ]
        },
        "materialIds": ["chicken-breast", "butter", "garlic", "lemon", "canola-oil", "paprika", "black-pepper", "sea-salt", "thyme"]
    }
]


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
        
        # Insert materials
        print("\n📦 Inserting materials...")
        for mat_data in MATERIALS_DATA:
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
        print(f"✅ Inserted {len(MATERIALS_DATA)} materials into database")
        
        # Insert dishes
        print("\n🍽️  Inserting dishes...")
        for dish_data in DISHES_DATA:
            dish = Dish(
                name=dish_data['name'],
                image=dish_data.get('image', ''),
                tagline=dish_data.get('tagline', ''),
                steps_json=json.dumps(dish_data.get('steps', {}), ensure_ascii=False),
                material_ids_json=json.dumps(dish_data.get('materialIds', []), ensure_ascii=False)
            )
            db.session.add(dish)
        
        db.session.commit()
        print(f"✅ Inserted {len(DISHES_DATA)} dishes into database")
        
        # Verify
        print("\n📊 Database Summary:")
        print(f"   Materials: {Material.query.count()}")
        print(f"   Dishes: {Dish.query.count()}")
        print(f"   Stores: {', '.join([s[0] for s in db.session.query(Material.store).distinct().all()])}")
        
        print("\n🎉 Database initialization complete!")
        print("📍 Database location: backend/recipes.db")


if __name__ == '__main__':
    populate_database()
