"""
Database models for the recipe and meal planning application.
Uses SQLite for simplicity and portability.
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()


class Material(db.Model):
    """Material/Ingredient model"""
    __tablename__ = 'materials'
    
    id = db.Column(db.String(100), primary_key=True)
    name_cn = db.Column(db.String(200), nullable=False)
    name_en = db.Column(db.String(200), nullable=False)
    brand = db.Column(db.String(200))
    store = db.Column(db.String(100), nullable=False, index=True)
    price = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(50))
    image = db.Column(db.Text)
    is_manually_added = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nameCn': self.name_cn,
            'nameEn': self.name_en,
            'brand': self.brand,
            'store': self.store,
            'price': self.price,
            'unit': self.unit,
            'image': self.image,
            'isManuallyAdded': self.is_manually_added
        }


class Dish(db.Model):
    """Dish/Recipe model"""
    __tablename__ = 'dishes'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True, index=True)
    image = db.Column(db.Text)
    tagline = db.Column(db.Text)
    steps_json = db.Column(db.Text, nullable=False)  # JSON string of steps
    material_ids_json = db.Column(db.Text, nullable=False)  # JSON array of material IDs
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.image,
            'tagline': self.tagline,
            'steps': json.loads(self.steps_json) if self.steps_json else {},
            'materialIds': json.loads(self.material_ids_json) if self.material_ids_json else []
        }


class UserPreference(db.Model):
    """User preferences and settings"""
    __tablename__ = 'user_preferences'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False, index=True, default='default')
    preference_type = db.Column(db.String(50), nullable=False)  # 'owned_items', 'removed_ingredients', 'item_states'
    data_json = db.Column(db.Text, nullable=False)  # JSON data
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'preference_type', name='_user_pref_type_uc'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'preferenceType': self.preference_type,
            'data': json.loads(self.data_json) if self.data_json else {},
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }


class DinnerPlan(db.Model):
    """Dinner plan - selected dishes for a meal"""
    __tablename__ = 'dinner_plans'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False, index=True, default='default')
    dish_name = db.Column(db.String(200), nullable=False)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'dishName': self.dish_name,
            'addedAt': self.added_at.isoformat() if self.added_at else None
        }


class ManualGroceryItem(db.Model):
    """Manually added grocery items"""
    __tablename__ = 'manual_grocery_items'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False, index=True, default='default')
    name_cn = db.Column(db.String(200), nullable=False)
    name_en = db.Column(db.String(200))
    dishes = db.Column(db.String(500))  # Comma-separated dish names
    store = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'nameCn': self.name_cn,
            'nameEn': self.name_en,
            'dishes': self.dishes,
            'store': self.store,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }
