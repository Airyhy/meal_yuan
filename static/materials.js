// Materials Management Page
const API_BASE = '/api';

let materials = [];
let currentStore = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadMaterials();
    renderStoreFilters();
    renderMaterials();
    setupEventListeners();
});

// Load materials from API
async function loadMaterials() {
    try {
        const response = await fetch(`${API_BASE}/materials`);
        materials = await response.json();
        console.log(`Loaded ${materials.length} materials`);
    } catch (error) {
        console.error('Failed to load materials:', error);
        showToast('Failed to load materials', 'error');
    }
}

// Render store filters
function renderStoreFilters() {
    const storeFilter = document.getElementById('store-filter');
    
    // Get unique stores
    const stores = [...new Set(materials.map(m => m.store))].sort();
    
    // Render All button + individual stores
    storeFilter.innerHTML = `
        <button class="store-link active" data-store="all">
            <span>All Stores</span>
            <span class="count">${materials.length}</span>
        </button>
        ${stores.map(store => {
            const count = materials.filter(m => m.store === store).length;
            return `
                <button class="store-link" data-store="${store}">
                    <span>${store}</span>
                    <span class="count">${count}</span>
                </button>
            `;
        }).join('')}
    `;
    
    // Add click handlers
    storeFilter.querySelectorAll('.store-link').forEach(btn => {
        btn.addEventListener('click', () => {
            currentStore = btn.dataset.store;
            
            // Update active state
            storeFilter.querySelectorAll('.store-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderMaterials();
        });
    });
}

// Render materials
function renderMaterials() {
    const grid = document.getElementById('materials-grid');
    
    // Filter materials
    const filtered = currentStore === 'all' 
        ? materials 
        : materials.filter(m => m.store === currentStore);
    
    // Group by store if showing all
    if (currentStore === 'all') {
        const byStore = {};
        filtered.forEach(m => {
            if (!byStore[m.store]) byStore[m.store] = [];
            byStore[m.store].push(m);
        });
        
        grid.innerHTML = Object.entries(byStore).map(([store, items]) => `
            <div class="store-section">
                <h3 class="store-title">${store}</h3>
                <div class="materials-list">
                    ${items.map(renderMaterialCard).join('')}
                </div>
            </div>
        `).join('');
    } else {
        grid.innerHTML = `
            <div class="materials-list">
                ${filtered.map(renderMaterialCard).join('')}
            </div>
        `;
    }
    
    // Update stats
    updateStats(filtered);
}

// Render single material card
function renderMaterialCard(material) {
    const imageUrl = material.image || 'https://via.placeholder.com/150x150/f0f0f0/999999?text=No+Image';
    const isLocalImage = material.image && material.image.startsWith('assets/');
    const finalImageUrl = isLocalImage ? `/static/${material.image}` : imageUrl;
    
    return `
        <div class="material-card" data-id="${material.id}">
            <div class="material-image">
                <img src="${finalImageUrl}" alt="${material.nameCn}" loading="lazy">
            </div>
            <div class="material-info">
                <div class="material-name">
                    <strong>${material.nameCn}</strong>
                    <span class="material-name-en">${material.nameEn}</span>
                </div>
                <div class="material-meta">
                    <span class="material-store">${material.store}</span>
                    <span class="material-price">$${material.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;
}

// Update stats
function updateStats(filtered) {
    const totalMaterials = document.getElementById('total-materials');
    const totalPrice = document.getElementById('total-price');
    const countAll = document.getElementById('count-all');
    
    const total = filtered.reduce((sum, m) => sum + m.price, 0);
    
    totalMaterials.textContent = `${filtered.length} items`;
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    if (countAll) countAll.textContent = materials.length;
}

// Setup event listeners
function setupEventListeners() {
    // Add any additional event listeners here
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
