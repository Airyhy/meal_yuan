# Cleanup Plan: Remove Frontend-Only Code

## Files to REMOVE (No longer needed with Python backend)

### Old Data Files (Data now in database)
- wholefoods-data.js
- safeway-data.js
- ranch99-data.js
- traderjoes-data.js
- data.js
- verify-materials.js

### Old Frontend-Only Pages
- index.html (old version, use index-backend.html)
- materials.html
- materials.js
- materials-new.js
- materials-new.css
- made-dinner.html
- made-dinner.js
- made-dinner.css

### Debug/Test Files
- debug.html
- index-debug.html
- test-data-load.html
- test-minimal.html
- test-simple.html
- clear-locks.html

### Old Frontend Logic (Replaced by API)
- app.js (old frontend logic)
- api-client.js (not needed if serving from Flask)

## Files to KEEP

### Backend (Python)
- backend/app.py ✅
- backend/models.py ✅
- backend/init_db_simple.py ✅
- backend/instance/recipes.db ✅

### Frontend (Simplified, served by Flask)
- static/index.html (rename from index-backend.html)
- static/styles.css
- static/dish-detail.css
- static/app-api.js (new simplified version)

### Configuration
- requirements.txt ✅
- Procfile ✅
- render.yaml ✅
- .gitignore ✅

### Documentation
- README.md ✅
- DEPLOYMENT_GUIDE.md ✅
- Other .md files ✅
