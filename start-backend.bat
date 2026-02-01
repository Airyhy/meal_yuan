@echo off
REM Startup script for Yuan & Yuan Dish Python Backend (Windows)
REM This script sets up and starts the Flask server

echo 🍽️  Yuan ^& Yuan Dish - Python Backend Startup
echo ==============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python 3 is not installed. Please install Python 3.9 or higher.
    exit /b 1
)

echo ✅ Python found
echo.

REM Check if virtual environment exists
if not exist ".venv" (
    echo 📦 Creating virtual environment...
    python -m venv .venv
    echo ✅ Virtual environment created
)

REM Activate virtual environment
echo 🔄 Activating virtual environment...
call .venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -q -r requirements.txt
echo ✅ Dependencies installed
echo.

REM Check if database exists
if not exist "backend\recipes.db" (
    echo 🗄️  Database not found. Initializing...
    cd backend
    python init_db_simple.py
    cd ..
    echo ✅ Database initialized
) else (
    echo ✅ Database found
)

echo.
echo 🚀 Starting Flask server...
echo 📍 Server will be available at: http://localhost:5000
echo 🌐 Open: http://localhost:5000/index-backend.html
echo.
echo Press Ctrl+C to stop the server
echo ==============================================
echo.

cd backend
python app.py
