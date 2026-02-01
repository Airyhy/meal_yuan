# Meal Yuan - Python Web Service

🍽️ **A professional recipe and meal planning web service built with Python Flask**

Clean, authentic Python backend with RESTful API architecture.

---

## 🎯 Features

- **Python Flask Backend** - Professional REST API
- **SQLite Database** - Persistent data storage with SQLAlchemy ORM
- **RESTful API** - Clean API endpoints for all operations
- **Bilingual Support** - Chinese and English throughout
- **Responsive Frontend** - Modern, mobile-friendly interface
- **Easy Deployment** - Ready for Render, Heroku, Railway

---

## 📁 Project Structure

```
meal_yuan/
├── backend/
│   ├── app.py              # Flask application & API routes
│   ├── models.py           # Database models (SQLAlchemy)
│   ├── init_db_simple.py   # Database initialization
│   └── instance/
│       └── recipes.db      # SQLite database
├── templates/
│   └── index.html          # Main HTML template
├── static/
│   ├── app.js              # Frontend JavaScript
│   ├── styles.css          # Main styles
│   ├── dish-detail.css     # Modal styles
│   └── assets/             # Images
├── requirements.txt        # Python dependencies
├── Procfile               # Deployment config
└── render.yaml            # Render.com config
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- pip

### Installation

```bash
# Clone repository
git clone https://github.com/Airyhy/meal_yuan.git
cd meal_yuan

# Install dependencies
pip install -r requirements.txt

# Initialize database
cd backend
python init_db_simple.py

# Start server
python app.py
```

Visit: **http://localhost:5000**

---

## 🔌 API Endpoints

### Dishes
- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/<id>` - Get specific dish
- `GET /api/dishes/by-name/<name>` - Get dish by name

### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/<id>` - Get specific material
- `POST /api/materials` - Add new material

### Stores
- `GET /api/stores` - Get all available stores

### User Preferences
- `GET /api/preferences/<user_id>/<type>` - Get preferences
- `POST /api/preferences/<user_id>/<type>` - Save preferences

### Dinner Plan
- `GET /api/dinner-plan/<user_id>` - Get dinner plan
- `POST /api/dinner-plan/<user_id>` - Add to plan
- `DELETE /api/dinner-plan/<user_id>/<plan_id>` - Remove dish
- `DELETE /api/dinner-plan/<user_id>` - Clear all

### System
- `GET /api/health` - Health check

---

## 🗄️ Database

**Technology**: SQLite with SQLAlchemy ORM

**Tables**:
1. `materials` - 36 ingredients from 3 stores
2. `dishes` - 5 complete recipes
3. `user_preferences` - User settings
4. `dinner_plans` - Meal plans
5. `manual_grocery_items` - Custom items

**Current Data**:
- ✅ 36 materials
- ✅ 5 dishes (Mapo Tofu, Kung Pao Chicken, etc.)
- ✅ 3 stores (Whole Foods, Ranch99, Safeway)

---

## 🌐 Deployment

### Deploy to Render.com (Recommended - Free)

1. **Sign up**: https://render.com
2. **Create Web Service**
3. **Connect GitHub**: `Airyhy/meal_yuan`
4. **Configure**:
   ```
   Build: pip install -r requirements.txt && cd backend && python init_db_simple.py
   Start: cd backend && gunicorn --bind 0.0.0.0:$PORT "app:create_app()"
   ```
5. **Deploy!**

Full guide: See `DEPLOYMENT_GUIDE.md`

---

## 🛠️ Development

### Add New Recipes

Edit `backend/init_db_simple.py`:
```python
DISHES_DATA.append({
    "name": "Your Dish / 你的菜",
    "image": "assets/your-dish.jpg",
    "tagline": "Description / 描述",
    "steps": {...},
    "materialIds": [...]
})
```

Then re-initialize:
```bash
cd backend
python init_db_simple.py
```

### Add New Materials

Edit `backend/init_db_simple.py`:
```python
MATERIALS_DATA.append({
    "id": "material-id",
    "nameCn": "中文名",
    "nameEn": "English Name",
    "store": "Store Name",
    "price": 4.99,
    "unit": "unit"
})
```

---

## 🧪 Testing

### Test API Health
```bash
curl http://localhost:5000/api/health
```

### Test Endpoints
```bash
# Get all dishes
curl http://localhost:5000/api/dishes

# Get all materials  
curl http://localhost:5000/api/materials
```

---

## 📚 Technology Stack

**Backend**:
- Python 3.9+
- Flask 3.0.0
- SQLAlchemy (ORM)
- SQLite 3
- Gunicorn (production server)

**Frontend**:
- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- No framework dependencies

**Deployment**:
- Render.com / Heroku / Railway
- Docker-ready
- Environment variable configuration

---

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 5000)
- `FLASK_DEBUG` - Debug mode (default: False)
- `HOST` - Bind address (default: 0.0.0.0)

---

## 📖 Documentation

- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `QUICK_START.md` - Quick start guide
- `ARCHITECTURE.txt` - System architecture
- `DATABASE_STRUCTURE.md` - Database design

---

## 🎉 What's New

**v2.0 - Python Backend Migration**
- ✅ Complete Python Flask backend
- ✅ SQLite database with persistent storage
- ✅ RESTful API architecture
- ✅ Removed all frontend-only code
- ✅ Clean, professional structure
- ✅ Production-ready deployment

---

## 📝 License

- Application code: MIT License
- Recipe data: Creative Commons
- Product data: Open Database License (ODbL) via Open Food Facts

---

## 🙏 Acknowledgments

- **Open Food Facts** for product data
- **Flask** for the web framework
- **SQLAlchemy** for the ORM

---

## 🔗 Links

- **Repository**: https://github.com/Airyhy/meal_yuan
- **Live Demo**: Deploy to see your own!
- **Issues**: https://github.com/Airyhy/meal_yuan/issues

---

**Built with ❤️ using Python & Flask**

Ready to deploy! 🚀
