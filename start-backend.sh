#!/bin/bash

# Startup script for Yuan & Yuan Dish Python Backend
# This script sets up and starts the Flask server

echo "🍽️  Yuan & Yuan Dish - Python Backend Startup"
echo "=============================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
    echo "✅ Virtual environment created"
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt
echo "✅ Dependencies installed"
echo ""

# Check if database exists
if [ ! -f "backend/recipes.db" ]; then
    echo "🗄️  Database not found. Initializing..."
    cd backend
    python init_db_simple.py
    cd ..
    echo "✅ Database initialized"
else
    echo "✅ Database found"
fi

echo ""
echo "🚀 Starting Flask server..."
echo "📍 Server will be available at: http://localhost:5000"
echo "🌐 Open: http://localhost:5000/index-backend.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=============================================="
echo ""

cd backend
python app.py
