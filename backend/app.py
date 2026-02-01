"""
Flask application for Recipe and Meal Planning Web Service
"""
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from models import db, Material, Dish, UserPreference, DinnerPlan, ManualGroceryItem
import json
import os

def create_app():
    app = Flask(__name__, static_folder='..', static_url_path='')
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_AS_ASCII'] = False  # Support Chinese characters
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)  # Enable CORS for frontend requests
    
    # API Routes
    
    @app.route('/')
    def serve_index():
        """Serve the main index.html"""
        return send_from_directory('..', 'index.html')
    
    @app.route('/api/materials', methods=['GET'])
    def get_materials():
        """Get all materials, optionally filtered by store"""
        store = request.args.get('store')
        
        if store:
            materials = Material.query.filter_by(store=store).all()
        else:
            materials = Material.query.all()
        
        return jsonify([m.to_dict() for m in materials])
    
    @app.route('/api/materials/<material_id>', methods=['GET'])
    def get_material(material_id):
        """Get a specific material by ID"""
        material = Material.query.get_or_404(material_id)
        return jsonify(material.to_dict())
    
    @app.route('/api/materials', methods=['POST'])
    def add_material():
        """Add a new material (for manually added items)"""
        data = request.json
        
        material = Material(
            id=data['id'],
            name_cn=data['nameCn'],
            name_en=data.get('nameEn', data['nameCn']),
            brand=data.get('brand', 'Manual'),
            store=data['store'],
            price=data.get('price', 0.0),
            unit=data.get('unit', 'N/A'),
            image=data.get('image', ''),
            is_manually_added=True
        )
        
        db.session.add(material)
        db.session.commit()
        
        return jsonify(material.to_dict()), 201
    
    @app.route('/api/dishes', methods=['GET'])
    def get_dishes():
        """Get all dishes"""
        dishes = Dish.query.all()
        return jsonify([d.to_dict() for d in dishes])
    
    @app.route('/api/dishes/<int:dish_id>', methods=['GET'])
    def get_dish(dish_id):
        """Get a specific dish by ID"""
        dish = Dish.query.get_or_404(dish_id)
        return jsonify(dish.to_dict())
    
    @app.route('/api/dishes/by-name/<dish_name>', methods=['GET'])
    def get_dish_by_name(dish_name):
        """Get a specific dish by name"""
        dish = Dish.query.filter_by(name=dish_name).first_or_404()
        return jsonify(dish.to_dict())
    
    @app.route('/api/stores', methods=['GET'])
    def get_stores():
        """Get all unique stores"""
        stores = db.session.query(Material.store).distinct().all()
        return jsonify([store[0] for store in stores])
    
    @app.route('/api/preferences/<user_id>/<preference_type>', methods=['GET'])
    def get_preference(user_id, preference_type):
        """Get user preference by type"""
        pref = UserPreference.query.filter_by(
            user_id=user_id,
            preference_type=preference_type
        ).first()
        
        if pref:
            return jsonify(pref.to_dict())
        else:
            return jsonify({'data': {}})
    
    @app.route('/api/preferences/<user_id>/<preference_type>', methods=['POST', 'PUT'])
    def save_preference(user_id, preference_type):
        """Save or update user preference"""
        data = request.json
        
        pref = UserPreference.query.filter_by(
            user_id=user_id,
            preference_type=preference_type
        ).first()
        
        if pref:
            pref.data_json = json.dumps(data, ensure_ascii=False)
        else:
            pref = UserPreference(
                user_id=user_id,
                preference_type=preference_type,
                data_json=json.dumps(data, ensure_ascii=False)
            )
            db.session.add(pref)
        
        db.session.commit()
        return jsonify(pref.to_dict())
    
    @app.route('/api/dinner-plan/<user_id>', methods=['GET'])
    def get_dinner_plan(user_id):
        """Get dinner plan for a user"""
        plans = DinnerPlan.query.filter_by(user_id=user_id).all()
        
        # Get full dish details
        dishes = []
        for plan in plans:
            dish = Dish.query.filter_by(name=plan.dish_name).first()
            if dish:
                dishes.append(dish.to_dict())
        
        return jsonify(dishes)
    
    @app.route('/api/dinner-plan/<user_id>', methods=['POST'])
    def add_to_dinner_plan(user_id):
        """Add a dish to dinner plan"""
        data = request.json
        dish_name = data.get('dishName')
        
        # Check if already exists
        existing = DinnerPlan.query.filter_by(
            user_id=user_id,
            dish_name=dish_name
        ).first()
        
        if existing:
            return jsonify({'error': 'Dish already in dinner plan'}), 400
        
        plan = DinnerPlan(user_id=user_id, dish_name=dish_name)
        db.session.add(plan)
        db.session.commit()
        
        return jsonify(plan.to_dict()), 201
    
    @app.route('/api/dinner-plan/<user_id>/<int:plan_id>', methods=['DELETE'])
    def remove_from_dinner_plan(user_id, plan_id):
        """Remove a dish from dinner plan"""
        plan = DinnerPlan.query.filter_by(id=plan_id, user_id=user_id).first_or_404()
        db.session.delete(plan)
        db.session.commit()
        
        return jsonify({'success': True})
    
    @app.route('/api/dinner-plan/<user_id>', methods=['DELETE'])
    def clear_dinner_plan(user_id):
        """Clear all dishes from dinner plan"""
        DinnerPlan.query.filter_by(user_id=user_id).delete()
        db.session.commit()
        
        return jsonify({'success': True})
    
    @app.route('/api/manual-items/<user_id>', methods=['GET'])
    def get_manual_items(user_id):
        """Get manually added grocery items"""
        items = ManualGroceryItem.query.filter_by(user_id=user_id).all()
        return jsonify([item.to_dict() for item in items])
    
    @app.route('/api/manual-items/<user_id>', methods=['POST'])
    def add_manual_item(user_id):
        """Add a manual grocery item"""
        data = request.json
        
        item = ManualGroceryItem(
            user_id=user_id,
            name_cn=data['nameCn'],
            name_en=data.get('nameEn', ''),
            dishes=data.get('dishes', ''),
            store=data.get('store', '')
        )
        
        db.session.add(item)
        db.session.commit()
        
        return jsonify(item.to_dict()), 201
    
    @app.route('/api/manual-items/<user_id>/<int:item_id>', methods=['DELETE'])
    def delete_manual_item(user_id, item_id):
        """Delete a manual grocery item"""
        item = ManualGroceryItem.query.filter_by(id=item_id, user_id=user_id).first_or_404()
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({'success': True})
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({'status': 'healthy', 'database': 'connected'})
    
    return app


if __name__ == '__main__':
    app = create_app()
    
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()
        print("✅ Database tables created")
    
    print("🚀 Starting Flask server on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
