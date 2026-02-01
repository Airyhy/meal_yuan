# Python Backend Migration - Quick Start Guide

## 🎯 What's Been Done

Your recipe app has been successfully migrated to a **Python Flask backend** with the following architecture:

### Original Setup (Frontend Only)
- Pure JavaScript frontend
- Data stored in localStorage
- No database, no server required

### New Setup (Full Stack)
- ✅ **Flask REST API Backend** (Python)
- ✅ **SQLite Database** for persistent storage
- ✅ **5 Database Models** (Materials, Dishes, UserPreference, DinnerPlan, ManualGroceryItem)
- ✅ **15+ API Endpoints** for all operations
- ✅ **CORS enabled** for frontend integration
- ✅ **API client layer** for seamless frontend integration
- ✅ **Both modes supported**: Can still use localStorage mode OR backend mode

## 📂 New Files Created

### Backend Files
```
backend/
├── app.py                  # Main Flask application (API routes)
├── models.py              # Database models (SQLAlchemy ORM)
├── init_db_simple.py      # Database initialization script
└── recipes.db             # SQLite database (auto-generated)
```

### Frontend Files
```
api-client.js              # API integration layer
index-backend.html         # Backend-enabled version
```

### Configuration Files
```
requirements.txt           # Python dependencies
README.md                  # Complete documentation
.gitignore                # Git ignore rules
start-backend.sh          # Startup script (Mac/Linux)
start-backend.bat         # Startup script (Windows)
```

## 🚀 How to Start the Backend

### Option 1: Using Startup Script (Easiest)

**Mac/Linux:**
```bash
./start-backend.sh
```

**Windows:**
```cmd
start-backend.bat
```

### Option 2: Manual Start

```bash
# 1. Install dependencies (if not done)
pip3 install -r requirements.txt

# 2. Initialize database (if not done)
cd backend
python3 init_db_simple.py

# 3. Start Flask server
python3 app.py
```

## 🌐 Accessing the Application

After starting the backend:

1. **Backend Mode** (recommended): http://localhost:5000/index-backend.html
   - Uses Python backend
   - Data saved to database
   - Green indicator shows "✅ Python Backend"

2. **Original Mode**: Open `index.html` directly in browser
   - No backend required
   - Data stored in localStorage
   - Original functionality preserved

## 📊 Database Structure

### Tables Created

1. **materials** - Ingredients/materials from stores
   - 36 items across 3 stores (Whole Foods, Ranch99, Safeway)
   
2. **dishes** - Recipe/dish information
   - 5 dishes with complete recipes
   
3. **user_preferences** - User settings and preferences
   - Permanently owned items
   - Removed ingredients
   - Shopping list states
   
4. **dinner_plans** - Selected dishes for meal planning
   
5. **manual_grocery_items** - User-added custom items

## 🔌 API Endpoints

All endpoints are available at `http://localhost:5000/api/`

### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/{id}` - Get specific material
- `POST /api/materials` - Add new material

### Dishes
- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/{id}` - Get specific dish
- `GET /api/dishes/by-name/{name}` - Get dish by name

### Stores
- `GET /api/stores` - Get all available stores

### User Preferences
- `GET /api/preferences/{user_id}/{type}` - Get preference
- `POST /api/preferences/{user_id}/{type}` - Save preference

### Dinner Plan
- `GET /api/dinner-plan/{user_id}` - Get dinner plan
- `POST /api/dinner-plan/{user_id}` - Add dish
- `DELETE /api/dinner-plan/{user_id}/{plan_id}` - Remove dish
- `DELETE /api/dinner-plan/{user_id}` - Clear all

### Manual Items
- `GET /api/manual-items/{user_id}` - Get items
- `POST /api/manual-items/{user_id}` - Add item
- `DELETE /api/manual-items/{user_id}/{item_id}` - Delete item

### Health Check
- `GET /api/health` - Check if API is running

## 🧪 Testing the Backend

### Test API Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status": "healthy", "database": "connected"}
```

### Test Get Dishes
```bash
curl http://localhost:5000/api/dishes
```

### Test Get Materials
```bash
curl http://localhost:5000/api/materials
```

## 📝 Next Steps

### To Add More Recipes

1. Edit `backend/init_db_simple.py`
2. Add to `DISHES_DATA` array
3. Run: `python3 backend/init_db_simple.py`

### To Add More Materials

1. Edit `backend/init_db_simple.py`
2. Add to `MATERIALS_DATA` array
3. Run: `python3 backend/init_db_simple.py`

### To Customize the Backend

- Change port: Edit `app.py` line with `app.run(port=5000)`
- Change database: Edit `SQLALCHEMY_DATABASE_URI` in `app.py`
- Add authentication: Implement user authentication system

## 🔧 Troubleshooting

### "Backend Offline" message
- Make sure Flask server is running
- Check terminal for errors
- Verify port 5000 is not in use

### Database errors
```bash
# Reset database
rm backend/recipes.db
python3 backend/init_db_simple.py
```

### CORS errors
- Already configured in `app.py`
- Check browser console for specific errors
- Ensure backend is running on localhost:5000

### Module not found errors
```bash
# Reinstall dependencies
pip3 install -r requirements.txt
```

## 📚 Documentation

Full documentation is available in `README.md`

## ✅ Summary

✅ All 9 tasks completed:
1. ✅ Database schema designed
2. ✅ Flask backend set up
3. ✅ Data migration scripts created
4. ✅ REST API endpoints implemented
5. ✅ User preferences API added
6. ✅ Frontend API integration done
7. ✅ CORS support enabled
8. ✅ Database initialization script ready
9. ✅ Complete documentation provided

**Your app now has both frontend-only and full-stack capabilities!** 🎉

---

**Questions? Check README.md for more details!**
