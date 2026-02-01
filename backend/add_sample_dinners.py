"""
Add sample completed dinner records to make the app look more realistic
"""
import sys
import os
from datetime import datetime, timedelta
import json

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db, CompletedDinner, Dish

# Sample completed dinners with realistic dates
SAMPLE_DINNERS = [
    {
        "dishNames": ["麻婆豆腐 (Mapo Tofu)", "番茄炒蛋 (Tomato Egg Stir-Fry)"],
        "notes": "Spicy and delicious! Perfect combo.",
        "days_ago": 1
    },
    {
        "dishNames": ["宫保鸡丁 (Kung Pao Chicken)"],
        "notes": "Great with rice",
        "days_ago": 3
    },
    {
        "dishNames": ["番茄炒蛋 (Tomato Egg Stir-Fry)", "Pan-Fried Chicken Breast"],
        "notes": "Light and healthy dinner",
        "days_ago": 5
    },
    {
        "dishNames": ["Meatballs"],
        "notes": "Classic comfort food",
        "days_ago": 7
    },
    {
        "dishNames": ["麻婆豆腐 (Mapo Tofu)", "宫保鸡丁 (Kung Pao Chicken)"],
        "notes": "Sichuan feast! Both dishes turned out amazing.",
        "days_ago": 10
    },
    {
        "dishNames": ["Pan-Fried Chicken Breast", "Meatballs"],
        "notes": "Western style dinner",
        "days_ago": 14
    },
    {
        "dishNames": ["番茄炒蛋 (Tomato Egg Stir-Fry)"],
        "notes": "Quick weeknight meal",
        "days_ago": 18
    },
]


def add_sample_dinners():
    """Add sample completed dinners to the database"""
    app = create_app()
    
    with app.app_context():
        print("🍽️  Adding sample completed dinners...")
        
        # Get all dishes from database to get their IDs
        dishes = {dish.name: dish.id for dish in Dish.query.all()}
        print(f"   Found {len(dishes)} dishes in database")
        
        # Clear existing sample data (optional)
        existing_count = CompletedDinner.query.count()
        if existing_count > 0:
            print(f"   ⚠️  Found {existing_count} existing dinners")
            response = input("   Clear existing dinners? (y/n): ")
            if response.lower() == 'y':
                CompletedDinner.query.delete()
                db.session.commit()
                print("   ✅ Cleared existing dinners")
        
        # Add sample dinners
        added = 0
        for dinner_data in SAMPLE_DINNERS:
            # Calculate date
            completed_at = datetime.utcnow() - timedelta(days=dinner_data['days_ago'])
            
            # Get dish IDs
            dish_ids = []
            for dish_name in dinner_data['dishNames']:
                if dish_name in dishes:
                    dish_ids.append(dishes[dish_name])
            
            # Create completed dinner
            dinner = CompletedDinner(
                user_id='default',
                dish_ids=json.dumps(dish_ids),
                dish_names=json.dumps(dinner_data['dishNames']),
                notes=dinner_data['notes'],
                completed_at=completed_at
            )
            
            db.session.add(dinner)
            added += 1
        
        db.session.commit()
        
        print(f"\n✅ Successfully added {added} sample completed dinners!")
        print(f"📅 Date range: {SAMPLE_DINNERS[-1]['days_ago']} to {SAMPLE_DINNERS[0]['days_ago']} days ago")
        print("\n🎉 Dinner history is now populated with realistic data!")


if __name__ == '__main__':
    add_sample_dinners()
