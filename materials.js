function initPage() {
  const materialsGrid = document.getElementById("materials-grid");
  const storeFilter = document.getElementById("store-filter");
  const storeButtons = storeFilter.querySelectorAll(".store-link");
  
  // Add status filter to status links
  document.querySelectorAll('.status-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active state
      document.querySelectorAll('.status-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Set status filter from data attribute
      currentStatus = link.dataset.status || 'available';
      
      // Apply filters
      applyFilters();
    });
  });

  // Check if data is loaded
  if (!window.DATA || !window.DATA.MATERIALS) {
    console.error('Materials.js: DATA not loaded yet!');
    materialsGrid.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: #d32f2f;">
        <div style="font-size: 3rem; margin-bottom: 16px;">⚠️</div>
        <h3 style="font-size: 1.2rem; margin: 0 0 8px 0;">数据未加载 / Data Not Loaded</h3>
        <p style="font-size: 0.9rem; color: #9e9186;">请刷新页面 / Please refresh the page</p>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg, #4a3f35 0%, #2c2416 100%); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">
          🔄 刷新页面 / Refresh Page
        </button>
      </div>
    `;
    return;
  }

  const DATA = window.DATA;
  
  // Load manual materials from localStorage
  const savedManualMaterials = localStorage.getItem('manualMaterials');
  if (savedManualMaterials && DATA.MATERIALS) {
    try {
      const manualMaterials = JSON.parse(savedManualMaterials);
      manualMaterials.forEach(material => {
        if (!DATA.MATERIALS.find(m => m.id === material.id)) {
          DATA.MATERIALS.push(material);
        }
      });
    } catch (e) {
      console.error('Error loading manual materials:', e);
    }
  }
  
  const { MATERIALS } = DATA;

  console.log('Materials.js initializing, found materials:', MATERIALS ? MATERIALS.length : 0);
  
  // Validate MATERIALS array
  if (!MATERIALS || MATERIALS.length === 0) {
    console.warn('Materials.js: MATERIALS array is empty');
  }

  const STORE_LABELS = {
    "Whole Foods": "Whole Foods / 全食超市",
    Safeway: "Safeway / 西夫韦",
    Ranch99: "Ranch 99 / 大华超市",
    "Trader Joe's": "Trader Joe's / 乔氏超市"
  };

  // Load removed ingredients from localStorage
  let removedIngredientsFromDishes = {};
  const saved = localStorage.getItem('removedIngredientsFromDishes');
  if (saved) {
    removedIngredientsFromDishes = JSON.parse(saved);
  }

  // Get all removed material IDs
  const allRemovedIds = new Set();
  Object.values(removedIngredientsFromDishes).forEach(ids => {
    ids.forEach(id => allRemovedIds.add(id));
  });

  // Load "already have" items from localStorage
  let permanentlyOwnedItems = new Set();
  const savedPermanent = localStorage.getItem('permanentlyOwnedItems');
  if (savedPermanent) {
    try {
      permanentlyOwnedItems = new Set(JSON.parse(savedPermanent));
    } catch (e) {
      console.error('Failed to parse permanentlyOwnedItems:', e);
    }
  }

  let itemStates = {};
  const savedItemStates = localStorage.getItem('itemStates');
  if (savedItemStates) {
    try {
      itemStates = JSON.parse(savedItemStates);
    } catch (e) {
      console.error('Failed to parse itemStates:', e);
    }
  }

  // Function to check if a material is marked as "already have"
  function isAlreadyHave(materialId) {
    const itemKey = `material-${materialId}`;
    const isPermanent = permanentlyOwnedItems.has(itemKey);
    const state = itemStates[itemKey];
    return isPermanent || state === 'have';
  }

  // Function to check if permanently owned
  function isPermanentlyOwned(materialId) {
    const itemKey = `material-${materialId}`;
    return permanentlyOwnedItems.has(itemKey);
  }

  let currentStore = "all";
  let currentStatus = "available"; // Track current status filter (default to available)
  let searchQuery = ""; // Track search query

  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }

  function updateSidebarCounts() {
    // Filter by current store selection
    const materialsInStore = currentStore === "all" 
      ? MATERIALS 
      : MATERIALS.filter(item => item.store === currentStore);
    
    // Update counts based on current store filter
    const availableCount = materialsInStore.filter(item => 
      !allRemovedIds.has(item.id) && !isAlreadyHave(item.id)
    ).length;
    
    const haveCount = materialsInStore.filter(item => 
      !allRemovedIds.has(item.id) && isAlreadyHave(item.id)
    ).length;
    
    const removedCount = materialsInStore.filter(item => 
      allRemovedIds.has(item.id)
    ).length;

    const countAvailable = document.getElementById('count-available');
    const countHave = document.getElementById('count-have');
    const countRemoved = document.getElementById('count-removed');

    if (countAvailable) countAvailable.textContent = availableCount;
    if (countHave) countHave.textContent = haveCount;
    if (countRemoved) countRemoved.textContent = removedCount;
  }

  function renderMaterialsGrid(items) {
    // Update sidebar counts
    updateSidebarCounts();

    // Check if data is completely missing (error state)
    if (!items) {
      materialsGrid.innerHTML = `
        <div class="empty-state-new">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <h3>数据加载失败 / Data Failed to Load</h3>
          <p>请刷新页面 / Please refresh the page</p>
        </div>
      `;
      return;
    }
    
    // Check if filter resulted in no items (normal state)
    if (items.length === 0) {
      const statusMessages = {
        'available': { title: 'No Items to Buy', subtitle: '🎉 You have everything you need!' },
        'have': { title: 'No Owned Items', subtitle: 'Mark items as owned to see them here' },
        'removed': { title: 'No Removed Items', subtitle: 'Remove items from recipes to see them here' }
      };
      
      const message = statusMessages[currentStatus] || { title: 'No Items Found', subtitle: 'Try a different filter combination' };
      
      materialsGrid.innerHTML = `
        <div class="empty-state-new">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <h3>${message.title}</h3>
          <p>${message.subtitle}</p>
        </div>
      `;
      return;
    }

    // Render cards directly without section header
    materialsGrid.innerHTML = items.map(item => renderMaterialCard(item, currentStatus)).join('');
  }

  function renderMaterialCard(item, status) {
    const isPermanent = isPermanentlyOwned(item.id);
    const dishesUsingMaterial = status === 'removed' ? getDishesUsingMaterial(item.id) : [];
    
    const statusBadges = {
      'available': { class: 'available', text: 'Available' },
      'have': { class: 'owned', text: isPermanent ? '🔒 Owned' : 'Owned' },
      'removed': { class: 'removed', text: 'Removed' }
    };
    
    const badge = statusBadges[status] || statusBadges['available'];
    
    return `
      <article class="material-card-new" data-store="${item.store}">
        <img class="material-card-image" src="${item.image}" alt="${item.nameEn}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\'%3E%3Crect fill=\\'%23f0f0f0\\' width=\\'200\\' height=\\'200\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'14\\' fill=\\'%23999\\'%3ENo Image%3C/text%3E%3C/svg%3E'">
        <div class="material-card-body">
          <h3 class="material-card-title">${item.nameCn} / ${item.nameEn}</h3>
          <p class="material-card-brand">${item.brand || "Generic"} ${item.unit ? `· ${item.unit}` : ""}</p>
          <span class="material-card-store">${STORE_LABELS[item.store] || item.store}</span>
          <div class="material-card-price">${formatPrice(item.price)}</div>
          <div class="material-card-footer">
            <span class="material-status-badge ${badge.class}">${badge.text}</span>
            ${status === 'removed' ? `
              <button class="material-card-btn primary" onclick="restoreMaterial('${item.id}')">
                Restore
              </button>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  function getDishesUsingMaterial(materialId) {
    const dishes = [];
    Object.entries(removedIngredientsFromDishes).forEach(([dishName, ids]) => {
      if (ids.includes(materialId)) {
        dishes.push(dishName);
      }
    });
    return dishes;
  }

  window.restoreMaterial = function(materialId) {
    if (!confirm('确定要恢复此材料到所有菜谱吗？\nRestore this ingredient to all recipes?')) {
      return;
    }

    // Remove from all dishes
    Object.keys(removedIngredientsFromDishes).forEach(dishName => {
      removedIngredientsFromDishes[dishName] = removedIngredientsFromDishes[dishName].filter(id => id !== materialId);
      if (removedIngredientsFromDishes[dishName].length === 0) {
        delete removedIngredientsFromDishes[dishName];
      }
    });

    // Save to localStorage
    localStorage.setItem('removedIngredientsFromDishes', JSON.stringify(removedIngredientsFromDishes));

    // Update the removed IDs set
    allRemovedIds.delete(materialId);

    // Re-render
    applyFilter(currentStore);

    // Show confirmation
    alert('✅ 材料已恢复 / Material restored to all recipes');
  };

  function applyFilters() {
    // Filter by store first
    let filtered = currentStore === "all" 
      ? MATERIALS 
      : MATERIALS.filter((item) => item.store === currentStore);
    
    // Then filter by status
    filtered = filtered.filter(item => {
      const isRemoved = allRemovedIds.has(item.id);
      const hasItem = isAlreadyHave(item.id);
      
      if (currentStatus === 'available') {
        return !isRemoved && !hasItem;
      } else if (currentStatus === 'have') {
        return !isRemoved && hasItem;
      } else if (currentStatus === 'removed') {
        return isRemoved;
      }
      return true;
    });
    
    // Then filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => {
        const searchStr = `${item.nameCn} ${item.nameEn} ${item.brand}`.toLowerCase();
        return searchStr.includes(searchQuery);
      });
    }
    
    renderMaterialsGrid(filtered);

    // Update active store button
    storeButtons.forEach(btn => {
      if (btn.dataset.store === currentStore) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
  
  // Legacy function for backwards compatibility
  function applyFilter(store) {
    currentStore = store;
    applyFilters();
  }

  // Add click handlers to store filters
  storeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const store = button.dataset.store;
      applyFilter(store);
    });
  });

  // Add search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Initialize with default view
  applyFilters();
}

// Add Material Modal Functions
window.openAddMaterialModal = function() {
  const modal = document.getElementById('add-material-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAddMaterialModal = function() {
  const modal = document.getElementById('add-material-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('add-material-form').reset();
  }
};

window.submitAddMaterial = function(event) {
  event.preventDefault();
  
  const nameCn = document.getElementById('material-name-cn').value.trim();
  const nameEn = document.getElementById('material-name-en').value.trim();
  const brand = document.getElementById('material-brand').value.trim() || 'Generic';
  const unit = document.getElementById('material-unit').value.trim() || '1 unit';
  const store = document.getElementById('material-store').value;
  const price = parseFloat(document.getElementById('material-price').value);
  const image = document.getElementById('material-image').value.trim() || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23f0f0f0\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'14\' fill=\'%23999\'%3ENo Image%3C/text%3E%3C/svg%3E';
  
  // Create new material object
  const newMaterial = {
    id: `manual-${Date.now()}`,
    nameCn: nameCn,
    nameEn: nameEn,
    brand: brand,
    unit: unit,
    store: store,
    price: price,
    image: image
  };
  
  // Add to window.DATA.MATERIALS
  if (window.DATA && window.DATA.MATERIALS) {
    window.DATA.MATERIALS.push(newMaterial);
    
    // Save to localStorage
    const savedManualMaterials = localStorage.getItem('manualMaterials');
    const manualMaterials = savedManualMaterials ? JSON.parse(savedManualMaterials) : [];
    manualMaterials.push(newMaterial);
    localStorage.setItem('manualMaterials', JSON.stringify(manualMaterials));
    
    // Show success message
    alert(`✅ 材料已添加 / Material added: ${nameCn}`);
    
    // Close modal and refresh
    closeAddMaterialModal();
    location.reload();
  }
};

// Wait for both DOM and data to be ready
function tryInitPage() {
  console.log('Attempting to initialize materials page...');
  console.log('window.DATA exists:', !!window.DATA);
  console.log('window.DATA.MATERIALS exists:', !!(window.DATA && window.DATA.MATERIALS));
  console.log('MATERIALS count:', window.DATA && window.DATA.MATERIALS ? window.DATA.MATERIALS.length : 0);
  
  if (window.DATA && window.DATA.MATERIALS) {
    initPage();
  } else {
    console.warn('Data not ready yet, retrying in 100ms...');
    setTimeout(tryInitPage, 100);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", tryInitPage);
} else {
  tryInitPage();
}
