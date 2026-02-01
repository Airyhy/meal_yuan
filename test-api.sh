#!/bin/bash

# Quick API Demo Script
# Demonstrates all API endpoints

API_URL="http://localhost:5000/api"
USER_ID="default"

echo "🧪 Yuan & Yuan Dish - API Demo Script"
echo "======================================"
echo ""

# Check if server is running
echo "1. Health Check..."
response=$(curl -s "$API_URL/health")
if [ $? -eq 0 ]; then
    echo "   ✅ Server is running"
    echo "   Response: $response"
else
    echo "   ❌ Server is not running. Please start it first:"
    echo "   cd backend && python3 app.py"
    exit 1
fi
echo ""

# Get stores
echo "2. Get All Stores..."
curl -s "$API_URL/stores" | python3 -m json.tool
echo ""

# Get materials count
echo "3. Get Materials (first 3)..."
curl -s "$API_URL/materials" | python3 -m json.tool | head -n 30
echo "   ..."
echo ""

# Get dishes
echo "4. Get All Dishes..."
curl -s "$API_URL/dishes" | python3 -m json.tool | head -n 50
echo "   ..."
echo ""

# Get specific dish
echo "5. Get Specific Dish by Name..."
dish_name="麻婆豆腐 (Mapo Tofu)"
encoded_name=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$dish_name'))")
curl -s "$API_URL/dishes/by-name/$encoded_name" | python3 -m json.tool | head -n 20
echo ""

# Test user preferences
echo "6. Save User Preference..."
curl -s -X POST "$API_URL/preferences/$USER_ID/test_pref" \
  -H "Content-Type: application/json" \
  -d '{"test": "demo_value"}' | python3 -m json.tool
echo ""

echo "7. Get User Preference..."
curl -s "$API_URL/preferences/$USER_ID/test_pref" | python3 -m json.tool
echo ""

# Test dinner plan
echo "8. Add to Dinner Plan..."
curl -s -X POST "$API_URL/dinner-plan/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{"dishName": "麻婆豆腐 (Mapo Tofu)"}' | python3 -m json.tool
echo ""

echo "9. Get Dinner Plan..."
curl -s "$API_URL/dinner-plan/$USER_ID" | python3 -m json.tool | head -n 20
echo ""

echo "10. Clear Dinner Plan..."
curl -s -X DELETE "$API_URL/dinner-plan/$USER_ID" | python3 -m json.tool
echo ""

echo "======================================"
echo "✅ All API tests completed!"
echo ""
echo "Try it yourself:"
echo "  curl $API_URL/health"
echo "  curl $API_URL/dishes"
echo "  curl $API_URL/materials"
echo ""
