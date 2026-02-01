// API client for frontend - replaces localStorage with backend API calls.
// Include this after app.js to enable backend integration.

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const USER_ID = 'default'; // Default user for now

// API Helper Functions
async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
    }
}

// Override loadData to fetch from API
window.loadDataFromAPI = async function() {
    try {
        console.log('🔄 Loading data from API...');
        
        // Fetch materials
        const materials = await apiRequest('/materials');
        console.log(`📦 Loaded ${materials.length} materials from API`);
        
        // Fetch dishes
        const dishes = await apiRequest('/dishes');
        console.log(`🍽️ Loaded ${dishes.length} dishes from API`);
        
        // CRITICAL: Update the global variables that app.js expects
        // These are declared in app.js as: let DISHES = []; let MATERIALS = [];
        window.DISHES = dishes;
        window.MATERIALS = materials;
        
        // Also update window.DATA for compatibility
        window.DATA = {
            MATERIALS: materials,
            DISHES: dishes,
            getMaterialById: (id) => materials.find(m => m.id === id),
            getMaterialsByStore: (store) => materials.filter(m => m.store === store),
            getAllStores: () => [...new Set(materials.map(m => m.store))]
        };
        
        console.log('✅ Data loaded from API successfully');
        console.log('📊 window.DISHES:', window.DISHES.length, 'items');
        console.log('📊 window.MATERIALS:', window.MATERIALS.length, 'items');
        console.log('📊 window.DATA:', window.DATA);
        return true;
    } catch (error) {
        console.error('❌ Failed to load data from API:', error);
        return false;
    }
};

// Preference API wrappers
window.apiPreferences = {
    async getPermanentItems() {
        try {
            const response = await apiRequest(`/preferences/${USER_ID}/owned_items`);
            return response.data || [];
        } catch (error) {
            return [];
        }
    },
    
    async savePermanentItems(items) {
        return await apiRequest(`/preferences/${USER_ID}/owned_items`, 'POST', items);
    },
    
    async getRemovedIngredients() {
        try {
            const response = await apiRequest(`/preferences/${USER_ID}/removed_ingredients`);
            return response.data || {};
        } catch (error) {
            return {};
        }
    },
    
    async saveRemovedIngredients(data) {
        return await apiRequest(`/preferences/${USER_ID}/removed_ingredients`, 'POST', data);
    },
    
    async getItemStates() {
        try {
            const response = await apiRequest(`/preferences/${USER_ID}/item_states`);
            return response.data || {};
        } catch (error) {
            return {};
        }
    },
    
    async saveItemStates(data) {
        return await apiRequest(`/preferences/${USER_ID}/item_states`, 'POST', data);
    }
};

// Dinner Plan API wrappers
window.apiDinnerPlan = {
    async getDinnerPlan() {
        try {
            return await apiRequest(`/dinner-plan/${USER_ID}`);
        } catch (error) {
            return [];
        }
    },
    
    async addDish(dishName) {
        return await apiRequest(`/dinner-plan/${USER_ID}`, 'POST', { dishName });
    },
    
    async removeDish(planId) {
        return await apiRequest(`/dinner-plan/${USER_ID}/${planId}`, 'DELETE');
    },
    
    async clearDinnerPlan() {
        return await apiRequest(`/dinner-plan/${USER_ID}`, 'DELETE');
    }
};

// Manual Items API wrappers  
window.apiManualItems = {
    async getManualItems() {
        try {
            return await apiRequest(`/manual-items/${USER_ID}`);
        } catch (error) {
            return [];
        }
    },
    
    async addManualItem(item) {
        return await apiRequest(`/manual-items/${USER_ID}`, 'POST', item);
    },
    
    async deleteManualItem(itemId) {
        return await apiRequest(`/manual-items/${USER_ID}/${itemId}`, 'DELETE');
    }
};

// Override localStorage functions with API calls
const originalLoadPermanentItems = window.loadPermanentItems;
window.loadPermanentItems = async function() {
    const items = await apiPreferences.getPermanentItems();
    permanentlyOwnedItems = new Set(items);
    console.log('📥 Loaded permanent items from API:', items.length);
};

const originalSavePermanentItems = window.savePermanentItems;
window.savePermanentItems = async function() {
    await apiPreferences.savePermanentItems([...permanentlyOwnedItems]);
    console.log('💾 Saved permanent items to API');
};

const originalLoadRemovedIngredients = window.loadRemovedIngredients;
window.loadRemovedIngredients = async function() {
    removedIngredientsFromDishes = await apiPreferences.getRemovedIngredients();
    console.log('📥 Loaded removed ingredients from API');
};

const originalSaveRemovedIngredients = window.saveRemovedIngredients;
window.saveRemovedIngredients = async function() {
    await apiPreferences.saveRemovedIngredients(removedIngredientsFromDishes);
    console.log('💾 Saved removed ingredients to API');
};

const originalLoadItemStates = window.loadItemStates;
window.loadItemStates = async function() {
    itemStates = await apiPreferences.getItemStates();
    console.log('📥 Loaded item states from API');
};

const originalSaveItemStates = window.saveItemStates;
window.saveItemStates = async function() {
    await apiPreferences.saveItemStates(itemStates);
    console.log('💾 Saved item states to API');
};

// Initialize with API data instead of localStorage
window.initWithAPI = async function() {
    console.log('🚀 Initializing with API backend...');
    
    // Load data from API
    const success = await window.loadDataFromAPI();
    if (!success) {
        console.error('❌ Failed to load data from API, falling back to local data');
        return;
    }
    
    // Now call the original loadData() function from app.js
    // This will read from window.DATA and populate the module-scoped DISHES and MATERIALS variables
    if (typeof loadData === 'function') {
        console.log('📥 Calling app.js loadData() to populate module variables...');
        loadData();
    }
    
    // Load preferences from API (optional, don't block on errors)
    try {
        if (typeof window.loadPermanentItems === 'function') {
            await window.loadPermanentItems();
        }
        if (typeof window.loadItemStates === 'function') {
            await window.loadItemStates();
        }
        if (typeof window.loadRemovedIngredients === 'function') {
            await window.loadRemovedIngredients();
        }
    } catch (error) {
        console.warn('⚠️ Could not load preferences:', error);
    }
    
    // Render UI - this will use the module-scoped DISHES variable
    console.log('🎨 Rendering dish cards...');
    if (typeof renderDishCards === 'function') {
        renderDishCards();
    }
    
    // Check if dishes loaded
    const dishes = window.DATA.DISHES || [];
    if (!dishes.length) {
        console.error('❌ No DISHES found after API load!');
        return;
    }
    
    // Set active dish and update UI
    if (dishes.length > 0 && typeof activeDish !== 'undefined') {
        window.activeDish = dishes[0];
    }
    
    if (typeof updateSelectedDishes === 'function') {
        updateSelectedDishes();
    }
    
    // Attach clear button handler if not already done
    const clearButton = document.getElementById('clear-dinner');
    if (clearButton && typeof handleClearDinner === 'function') {
        clearButton.addEventListener('click', handleClearDinner);
    }
    
    console.log('✅ Initialization with API complete');
    console.log(`📊 Loaded ${dishes.length} dishes and ${(window.DATA.MATERIALS || []).length} materials`);
};

// Health check
async function checkAPIHealth() {
    try {
        const health = await apiRequest('/health');
        console.log('✅ API Health:', health);
        return true;
    } catch (error) {
        console.error('❌ API is not available:', error);
        return false;
    }
}

// Check API on load
checkAPIHealth().then(isHealthy => {
    if (isHealthy) {
        console.log('🌐 Backend API is available - using API mode');
        // You can choose to auto-switch to API mode or require user action
        window.USE_API_BACKEND = true;
    } else {
        console.log('📦 Backend API unavailable - using localStorage mode');
        window.USE_API_BACKEND = false;
    }
});

console.log('📡 API client loaded. Backend URL:', API_BASE_URL);
console.log('To use API backend, call: initWithAPI()');
