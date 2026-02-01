# Yuan & Yuan Dish - Python Backend

🍽️ **A recipe and meal planning web application with Python Flask backend**

Transform your cooking experience with this bilingual (Chinese/English) recipe app that helps you plan meals and generate smart grocery lists, now powered by a Python backend!

## 🌟 Features

### Frontend Features
- 📖 **Recipe Gallery** - Browse beautiful dish cards with images
- 🔍 **Detailed Recipe View** - Step-by-step cooking instructions with timing
- 🛒 **Smart Shopping List** - Auto-generates grocery lists grouped by store
- ✅ **Shopping Management** - Mark items as "already have" or remove from recipes
- 📱 **Mobile Responsive** - Fully optimized for mobile devices
- 🌐 **Bilingual UI** - Full support for Chinese and English

### Backend Features (NEW!)
- 🐍 **Python Flask** - RESTful API backend
- 💾 **SQLite Database** - Persistent data storage
- 🔄 **Real-time Sync** - User preferences saved to database
- 🔌 **REST API** - Clean API endpoints for all operations
- 🌍 **CORS Enabled** - Frontend can run separately

## 📁 Project Structure

```
meal_yuan/
├── backend/
│   ├── app.py              # Flask application with API routes
│   ├── models.py           # Database models (SQLAlchemy)
│   ├── init_db_simple.py   # Database initialization script
│   └── recipes.db          # SQLite database (created on init)
├── index.html              # Original frontend (localStorage mode)
├── index-backend.html      # Backend-enabled frontend
├── app.js                  # Main frontend logic
├── api-client.js           # API integration layer
├── styles.css              # Main styles
├── dish-detail.css         # Dish modal styles
├── requirements.txt        # Python dependencies
└── assets/                 # Images and static files
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Installation

1. **Clone or navigate to the project directory**

```bash
cd meal_yuan
```

2. **Install Python dependencies**

```bash
pip install -r requirements.txt
```

Or if you prefer using a virtual environment:

```bash
# Create virtual environment
python -m venv .venv

# Activate it (Mac/Linux)
source .venv/bin/activate

# Activate it (Windows)
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

3. **Initialize the database**

```bash
cd backend
python init_db_simple.py
```

You should see output like:
```
✅ Database tables created
🗑️  Clearing existing data...
📦 Inserting materials...
✅ Inserted 34 materials into database
🍽️  Inserting dishes...
✅ Inserted 5 dishes into database
🎉 Database initialization complete!
```

4. **Start the Flask server**

```bash
python app.py
```

The server will start on `http://localhost:5000`

5. **Open the application**

Open your browser and go to:
- **With Backend**: http://localhost:5000/index-backend.html
- **Without Backend** (localStorage mode): Open `index.html` directly

## 🎯 Usage

### Using the Python Backend Version

1. Start the Flask server (see step 4 above)
2. Open http://localhost:5000/index-backend.html
3. The green indicator "✅ Python Backend" confirms API connection

### Backend API Endpoints

#### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/{id}` - Get specific material
- `POST /api/materials` - Add new material

#### Dishes
- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/{id}` - Get specific dish
- `GET /api/dishes/by-name/{name}` - Get dish by name

#### User Preferences
- `GET /api/preferences/{user_id}/{type}` - Get user preference
- `POST /api/preferences/{user_id}/{type}` - Save user preference

#### Dinner Plan
- `GET /api/dinner-plan/{user_id}` - Get dinner plan
- `POST /api/dinner-plan/{user_id}` - Add dish to plan
- `DELETE /api/dinner-plan/{user_id}/{plan_id}` - Remove dish
- `DELETE /api/dinner-plan/{user_id}` - Clear all dishes

#### Health Check
- `GET /api/health` - Check API health

## 🗄️ Database Schema

### Materials Table
- `id` (Primary Key) - Material ID
- `name_cn` - Chinese name
- `name_en` - English name
- `brand` - Brand name
- `store` - Store name
- `price` - Price (float)
- `unit` - Unit/quantity
- `image` - Image URL
- `is_manually_added` - Boolean flag
- `created_at` - Timestamp

### Dishes Table
- `id` (Primary Key, Auto-increment)
- `name` - Dish name
- `image` - Image URL
- `tagline` - Description
- `steps_json` - JSON object with cooking steps
- `material_ids_json` - JSON array of material IDs
- `created_at` - Timestamp

### User Preferences Table
- `id` (Primary Key)
- `user_id` - User identifier
- `preference_type` - Type (owned_items, removed_ingredients, item_states)
- `data_json` - JSON data
- `updated_at` - Timestamp

### Dinner Plans Table
- `id` (Primary Key)
- `user_id` - User identifier
- `dish_name` - Selected dish name
- `added_at` - Timestamp

### Manual Grocery Items Table
- `id` (Primary Key)
- `user_id` - User identifier
- `name_cn` - Chinese name
- `name_en` - English name
- `dishes` - Associated dishes
- `store` - Store name
- `created_at` - Timestamp

## 🔧 Configuration

### Backend Configuration

Edit `backend/app.py` to customize:

```python
# Database location
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'

# Port number
app.run(debug=True, host='0.0.0.0', port=5000)
```

### Frontend API Configuration

Edit `api-client.js` to change API endpoint:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
const USER_ID = 'default';  // Change for multi-user support
```

## 📦 Data Sources

All material/product data is sourced from:
- **[Open Food Facts](https://world.openfoodfacts.org)** - Free and open database of food products
- Licensed under **[Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/1.0/)**

## 🛠️ Development

### Adding New Recipes

Edit `backend/init_db_simple.py` and add to `DISHES_DATA`:

```python
{
    "name": "Your Dish Name / 中文名",
    "image": "assets/your-image.jpg",
    "tagline": "Description / 描述",
    "steps": {
        "preparation": ["Step 1", "Step 2"],
        "main": ["Step 3"],
        "side": ["Step 4"],
        "seasoning": ["Step 5"]
    },
    "materialIds": ["material-id-1", "material-id-2"]
}
```

Then re-run: `python backend/init_db_simple.py`

### Adding New Materials

Add to `MATERIALS_DATA` in `backend/init_db_simple.py`:

```python
{
    "id": "material-id",
    "nameCn": "中文名",
    "nameEn": "English Name",
    "brand": "Brand",
    "store": "Store Name",
    "price": 4.99,
    "unit": "16 oz",
    "image": "https://image-url.com/image.jpg"
}
```

### Running Tests

```bash
# Check API health
curl http://localhost:5000/api/health

# Get all dishes
curl http://localhost:5000/api/dishes

# Get all materials
curl http://localhost:5000/api/materials
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Make sure database is initialized: `python backend/init_db_simple.py`

### Frontend shows "Backend Offline"
- Verify Flask server is running
- Check console for CORS errors
- Ensure API_BASE_URL in `api-client.js` is correct

### Database errors
- Delete `backend/recipes.db` and re-run `init_db_simple.py`
- Check write permissions in the backend folder

## 🎨 Frontend-Only Mode

The original frontend still works without the backend:

1. Open `index.html` directly in your browser
2. Data stored in browser localStorage
3. No server required

## 📝 License

- Application code: Custom (check with repository owner)
- Product data: [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/1.0/)

## 🙏 Acknowledgments

- **Open Food Facts** for product data
- **Flask** for the web framework
- **SQLAlchemy** for database ORM

---

**Enjoy cooking! 🍳👨‍🍳👩‍🍳**
