// Meal Yuan - Frontend JavaScript (API-powered)
// This version communicates directly with the Flask backend API

const API_BASE = '/api';
const USER_ID = 'default';

// State
let dishes = [];
let materials = [];
let dinnerSelection = [];
let activeDish = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadData();
        renderDishCards();
        setupEventListeners();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        showError('Failed to load data. Please refresh the page.');
    }
});

// Load data from API
async function loadData() {
    const [dishesData, materialsData] = await Promise.all([
        fetch(`${API_BASE}/dishes`).then(r => r.json()),
        fetch(`${API_BASE}/materials`).then(r => r.json())
    ]);
    
    dishes = dishesData;
    materials = materialsData;
    
    console.log(`Loaded ${dishes.length} dishes and ${materials.length} materials`);
}

// Render dish cards
function renderDishCards() {
    const gallery = document.getElementById('dish-gallery');
    
    if (!dishes.length) {
        gallery.innerHTML = '<p>No dishes available</p>';
        return;
    }
    
    gallery.innerHTML = dishes.map(dish => `
        <article class="dish-card" data-dish-id="${dish.id}">
            <img src="/static/${dish.image}" alt="${dish.name}" loading="lazy">
            <div class="dish-card-body">
                <h3>${dish.name}</h3>
                <p>${dish.tagline}</p>
            </div>
        </article>
    `).join('');
    
    // Add click handlers
    gallery.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('click', () => {
            const dishId = parseInt(card.dataset.dishId);
            const dish = dishes.find(d => d.id === dishId);
            if (dish) openDishDetail(dish);
        });
    });
}

// Open dish detail modal
function openDishDetail(dish) {
    activeDish = dish;
    const modal = document.getElementById('dish-detail-modal');
    const body = document.getElementById('dish-detail-body');
    
    // Get materials for this dish
    const dishMaterials = dish.materialIds
        .map(id => materials.find(m => m.id === id))
        .filter(m => m);
    
    // Group by store
    const byStore = {};
    dishMaterials.forEach(m => {
        if (!byStore[m.store]) byStore[m.store] = [];
        byStore[m.store].push(m);
    });
    
    body.innerHTML = `
        <div class="dish-detail-hero">
            <img src="/static/${dish.image}" alt="${dish.name}">
        </div>
        <div class="dish-detail-body">
            <h1>${dish.name}</h1>
            <p class="dish-detail-tagline">${dish.tagline}</p>
            
            <h2>Ingredients / 食材</h2>
            <div class="ingredients-grid">
                ${dishMaterials.map(m => `
                    <div class="ingredient-item">
                        <strong>${m.nameCn}</strong> / ${m.nameEn}
                        <span class="ingredient-price">$${m.price.toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <h2>Steps / 步骤</h2>
            ${Object.entries(dish.steps).map(([category, steps]) => `
                <div class="step-category">
                    <h3>${getCategoryTitle(category)}</h3>
                    <ol>
                        ${steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            `).join('')}
            
            <h2>Shopping by Store / 按店铺购买</h2>
            ${Object.entries(byStore).map(([store, items]) => `
                <div class="material-store-card">
                    <h4>${store}</h4>
                    <ul>
                        ${items.map(item => `
                            <li>${item.nameCn} / ${item.nameEn} - $${item.price.toFixed(2)}</li>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
            
            <div class="dish-detail-actions">
                <button class="btn-add-dinner" onclick="addToDinner(${dish.id})">
                    Add to Dinner / 加入晚餐
                </button>
                <button class="btn-close-detail" onclick="closeDishDetail()">
                    Close / 关闭
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDishDetail() {
    const modal = document.getElementById('dish-detail-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function getCategoryTitle(category) {
    const titles = {
        preparation: '0. Preparation / 准备',
        main: '1. Main / 主菜',
        side: '2. Side / 配菜',
        seasoning: '3. Seasoning / 调味'
    };
    return titles[category] || category;
}

// Add dish to dinner plan
async function addToDinner(dishId) {
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;
    
    // Check if already added
    if (dinnerSelection.some(d => d.id === dishId)) {
        showToast('Already in dinner plan / 已在计划中', 'warning');
        return;
    }
    
    dinnerSelection.push(dish);
    updateDinnerDisplay();
    closeDishDetail();
    showToast(`Added ${dish.name} / 已添加`, 'success');
}

// Remove from dinner
function removeFromDinner(index) {
    const dish = dinnerSelection[index];
    dinnerSelection.splice(index, 1);
    updateDinnerDisplay();
    showToast(`Removed ${dish.name} / 已移除`, 'warning');
}

// Clear dinner plan
function clearDinner() {
    if (dinnerSelection.length === 0) {
        showToast('Dinner plan is empty / 晚餐计划已空', 'warning');
        return;
    }
    dinnerSelection = [];
    updateDinnerDisplay();
    showToast('Cleared dinner plan / 已清空', 'success');
}

// Update dinner display
function updateDinnerDisplay() {
    const list = document.getElementById('selected-dishes');
    const materialsDiv = document.getElementById('combined-materials');
    
    // Update selected dishes
    list.innerHTML = dinnerSelection.map((dish, index) => `
        <li class="chip" onclick="removeFromDinner(${index})">
            <span class="chip-text">${dish.name}</span>
            <span class="chip-remove">×</span>
        </li>
    `).join('');
    
    // Update shopping list
    if (dinnerSelection.length === 0) {
        materialsDiv.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Add dishes to generate shopping list / 添加菜品生成购物清单</p>';
        return;
    }
    
    // Combine materials
    const materialMap = new Map();
    dinnerSelection.forEach(dish => {
        dish.materialIds.forEach(materialId => {
            const material = materials.find(m => m.id === materialId);
            if (!material) return;
            
            if (!materialMap.has(materialId)) {
                materialMap.set(materialId, {
                    ...material,
                    dishes: []
                });
            }
            materialMap.get(materialId).dishes.push(dish.name);
        });
    });
    
    // Group by store
    const byStore = {};
    materialMap.forEach(material => {
        if (!byStore[material.store]) byStore[material.store] = [];
        byStore[material.store].push(material);
    });
    
    // Render shopping list
    materialsDiv.innerHTML = `
        <h3>Shopping List / 购物清单</h3>
        ${Object.entries(byStore).map(([store, items]) => `
            <div class="grocery-section">
                <h4>${store}</h4>
                <table class="grocery-table">
                    <thead>
                        <tr>
                            <th>Item / 材料</th>
                            <th>Used in / 用于</th>
                            <th>Price / 价格</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td><strong>${item.nameCn}</strong><br><small>${item.nameEn}</small></td>
                                <td>${item.dishes.join(', ')}</td>
                                <td>$${item.price.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `).join('')}
        <div class="grocery-summary">
            <strong>Total Items / 总计:</strong> ${materialMap.size} items
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('clear-dinner').addEventListener('click', clearDinner);
    
    // Close modal on outside click
    document.getElementById('dish-detail-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('dish-detail-modal')) {
            closeDishDetail();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDishDetail();
    });
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-notification');
    const icon = toast.querySelector('.toast-icon');
    const text = toast.querySelector('.toast-message');
    
    icon.textContent = type === 'success' ? '✅' : '⚠️';
    text.textContent = message;
    
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function showError(message) {
    const gallery = document.getElementById('dish-gallery');
    gallery.innerHTML = `
        <div style="background: #ffe0e0; padding: 20px; border-radius: 8px; color: #c00;">
            <h3>❌ Error</h3>
            <p>${message}</p>
        </div>
    `;
}
