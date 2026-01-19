const dishGallery = document.getElementById("dish-gallery");
const selectedDishesList = document.getElementById("selected-dishes");
const combinedMaterialsGrid = document.getElementById("combined-materials");
const clearDinnerButton = document.getElementById("clear-dinner");

const dinnerSelection = [];
let activeDish = null;

// Get DISHES and MATERIALS from window.DATA (loaded by data.js)
let DISHES = [];
let MATERIALS = [];

function createFallbackImage(label) {
  const safeLabel = label.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f6b365" />
          <stop offset="100%" stop-color="#fda085" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg)" />
      <rect x="40" y="40" width="720" height="420" rx="30" fill="rgba(255,255,255,0.2)" />
      <text x="400" y="260" font-size="48" text-anchor="middle" fill="#1f2430" font-family="Arial, sans-serif">
        ${safeLabel}
      </text>
      <text x="400" y="320" font-size="22" text-anchor="middle" fill="#1f2430" font-family="Arial, sans-serif">
        Photo unavailable
      </text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function renderDishCards() {
  console.log('=== renderDishCards() ===');
  console.log('DISHES:', DISHES);
  console.log('DISHES.length:', DISHES ? DISHES.length : 'DISHES is undefined');
  
  // Add visible debug info to page
  if (!dishGallery) {
    alert('ERROR: dishGallery element not found!');
    return;
  }
  
  if (!DISHES || DISHES.length === 0) {
    dishGallery.innerHTML = `
      <div style="background: #ffe0e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: red;">⚠️ Debug Info:</h3>
        <p><strong>DISHES:</strong> ${DISHES ? DISHES.length + ' items' : 'undefined'}</p>
        <p><strong>window.DATA:</strong> ${window.DATA ? 'exists' : 'undefined'}</p>
        <p><strong>window.DATA.DISHES:</strong> ${window.DATA && window.DATA.DISHES ? window.DATA.DISHES.length + ' items' : 'undefined'}</p>
        <p style="color: red; font-weight: bold;">未加载到菜品数据 / No dish data loaded</p>
      </div>
    `;
    return;
  }

  console.log('Rendering', DISHES.length, 'dishes...');
  
  dishGallery.innerHTML = DISHES.map(
    (dish) => `
      <article class="dish-card" data-dish="${dish.name}">
        <img src="${dish.image}" alt="${dish.name}" loading="lazy" />
        <div class="dish-card-body">
          <h3>${dish.name}</h3>
          <p>${dish.tagline}</p>
        </div>
      </article>
    `
  ).join("");
  
  console.log('Rendered HTML length:', dishGallery.innerHTML.length);

  dishGallery.querySelectorAll(".dish-card img").forEach((img) => {
    img.addEventListener("error", () => {
      const card = img.closest(".dish-card");
      if (!card) return;
      const dishName = card.dataset.dish || "Dish";
      img.src = createFallbackImage(dishName);
    });
  });

  dishGallery.querySelectorAll(".dish-card").forEach((card) => {
    card.addEventListener("click", () => {
      const dishName = card.dataset.dish;
      const selectedDish = findDishByName(dishName);
      if (!selectedDish) return;
      
      // Open detailed view
      openDishDetail(selectedDish);
      
      // Update active dish
      activeDish = selectedDish;
    });
  });
}

const STEP_TITLES = {
  preparation: "0. Preparation beforehand / 事前准备",
  main: "1. Main part / 主菜制作",
  side: "2. Side part / 配菜处理",
  seasoning: "3. Seasoning and sauce / 调味与酱汁"
};

const STORE_LABELS = {
  "Whole Foods": "Whole Foods / 全食超市",
  Safeway: "Safeway / 西夫韦",
  Ranch99: "Ranch 99 / 大华超市",
  "Trader Joe's": "Trader Joe's / 乔氏超市"
};

const STORE_COLORS = {
  "Whole Foods": "#00674f",
  Safeway: "#e31837",
  Ranch99: "#ff9500"
};

function renderSteps(steps) {
  const sections = Object.entries(STEP_TITLES)
    .map(([key, title]) => {
      const items = steps[key] || [];
      if (items.length === 0) return "";
      const list = items.map((step) => `<li>${step}</li>`).join("");
      return `
        <section class="steps-section">
          <h3>${title}</h3>
          <ol>${list}</ol>
        </section>
      `;
    })
    .join("");

  stepsList.innerHTML = sections;
}

function getMaterialById(id) {
  return MATERIALS.find((item) => item.id === id);
}

function getMaterialsByStore(materialIds) {
  const grouped = {};
  const missingIds = [];
  
  materialIds.forEach((id) => {
    const item = getMaterialById(id);
    if (!item) {
      missingIds.push(id);
      console.warn(`⚠️ Material not found: ${id}`);
      return;
    }
    if (!grouped[item.store]) {
      grouped[item.store] = [];
    }
    grouped[item.store].push(item);
  });
  
  if (missingIds.length > 0) {
    console.error(`❌ Missing ${missingIds.length} materials for this dish:`, missingIds);
  }
  
  return grouped;
}

function formatMaterialLabel(item, showPrice = false) {
  const base = `${item.nameCn} ${item.nameEn}`;
  if (!showPrice) return base;
  return `${base} ($${item.price.toFixed(2)})`;
}

function renderMaterials(targetElement, materialsByStore, showPrice = false) {
  targetElement.innerHTML = Object.entries(materialsByStore)
    .map(([store, items]) => {
      const storeLabel = STORE_LABELS[store] || store;
      const list = items
        .map((item) => `<li>${formatMaterialLabel(item, showPrice)}</li>`)
        .join("");
      return `
        <div class="store-card">
          <h4>${storeLabel}</h4>
          <ul>${list}</ul>
        </div>
      `;
    })
    .join("");
}

function findDishByName(name) {
  return DISHES.find((dish) => dish.name === name);
}

function updateActiveCard() {
  dishGallery.querySelectorAll(".dish-card").forEach((card) => {
    const isActive = card.dataset.dish === activeDish?.name;
    card.classList.toggle("selected", isActive);
  });
}

function updateSelectedDishes() {
  selectedDishesList.innerHTML = dinnerSelection
    .map((dish, index) => `
      <li class="chip" data-index="${index}" title="点击移除 / Tap to remove">
        <span class="chip-text">${dish.name}</span>
        <span class="chip-remove" aria-label="Remove">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </span>
      </li>
    `)
    .join("");
  
  // Add event listeners for chips (better than onclick for mobile)
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function(e) {
      e.preventDefault();
      const index = parseInt(this.getAttribute('data-index'));
      removeDishFromDinner(index);
    });
    
    // Add touch feedback
    chip.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    chip.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
  
  // Auto-generate grocery list whenever dishes change
  if (dinnerSelection.length > 0) {
    combineMaterials();
  } else {
    combinedMaterialsGrid.innerHTML = "<p style='text-align: center; color: #999; padding: 40px;'>添加菜品后自动生成购物清单 / Add dishes to auto-generate shopping list</p>";
  }
}

function removeDishFromDinner(index) {
  const dish = dinnerSelection[index];
  dinnerSelection.splice(index, 1);
  updateSelectedDishes();
  showToast(`已移除：${dish.name} / Removed from dinner plan`, "warning");
}

function combineMaterials() {
  // Collect all materials with their dishes
  const materialDishMap = new Map(); // materialId -> Set of dish names
  
  dinnerSelection.forEach((dish) => {
    dish.materialIds.forEach((id) => {
      if (!materialDishMap.has(id)) {
        materialDishMap.set(id, new Set());
      }
      materialDishMap.get(id).add(dish.name);
    });
  });

  // Build table HTML
  let tableHTML = `
    <div style="overflow-x: auto;">
      <table class="grocery-table">
        <thead>
          <tr>
            <th>材料 / Item</th>
            <th>用于菜品 / Used in Dishes</th>
            <th>商店 / Store</th>
            <th>价格 / Price</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Sort materials by store for better organization
  const materialEntries = Array.from(materialDishMap.entries());
  const sortedMaterials = materialEntries.sort((a, b) => {
    const matA = getMaterialById(a[0]);
    const matB = getMaterialById(b[0]);
    if (!matA || !matB) return 0;
    return matA.store.localeCompare(matB.store);
  });

  sortedMaterials.forEach(([materialId, dishNames]) => {
    const material = getMaterialById(materialId);
    if (!material) return;

    const storeClass = `store-${material.store.replace(/\s/g, '')}`;
    const dishes = Array.from(dishNames).join(', ');

    tableHTML += `
      <tr class="${storeClass}">
        <td class="item-name">
          <strong>${material.nameCn}</strong><br>
          <small>${material.nameEn}</small>
        </td>
        <td class="dish-list">${dishes}</td>
        <td class="store-name">${STORE_LABELS[material.store] || material.store}</td>
        <td class="item-price">$${material.price.toFixed(2)}</td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
    <div class="grocery-summary">
      <strong>总计 / Total:</strong> ${materialEntries.length} 种材料 / items from ${dinnerSelection.length} 道菜 / dishes
    </div>
  `;

  combinedMaterialsGrid.innerHTML = tableHTML;
}

function handleAddDish() {
  const selectedDish = activeDish;
  if (!selectedDish) {
    showToast("请先选择一道菜 / Please select a dish first", "warning");
    return;
  }
  
  if (dinnerSelection.some((dish) => dish.name === selectedDish.name)) {
    showToast("⚠️ 已添加过此菜 / Already in your dinner plan", "warning");
    return;
  }
  
  dinnerSelection.push(selectedDish);
  updateSelectedDishes();
  showToast(`已成功添加：${selectedDish.name} / Successfully added!`, "success");
}

function handleClearDinner() {
  if (dinnerSelection.length === 0) {
    showToast("晚餐计划已经是空的 / Dinner plan is already empty", "warning");
    return;
  }
  
  dinnerSelection.length = 0;
  updateSelectedDishes();
  showToast("已清空晚餐计划 / Dinner plan cleared", "success");
}

function loadData() {
  const data = window.DATA || { DISHES: [], MATERIALS: [] };
  DISHES = Array.isArray(data.DISHES) ? data.DISHES : [];
  MATERIALS = Array.isArray(data.MATERIALS) ? data.MATERIALS : [];
  console.log('Loaded DISHES:', DISHES.length, 'MATERIALS:', MATERIALS.length);
}

function initPage() {
  console.log('=== initPage() called ===');
  loadData();
  console.log('After loadData - DISHES:', DISHES);
  console.log('After loadData - MATERIALS:', MATERIALS.length);
  console.log('dishGallery element:', dishGallery);
  
  renderDishCards();

  if (!DISHES.length) {
    console.error('No DISHES found after loadData!');
    stepsList.innerHTML = "";
    materialsGrid.innerHTML = "";
    dishGallery.innerHTML = '<p style="color: red; padding: 20px;">❌ 数据加载失败：未找到菜品数据 / No dishes found. Please check console.</p>';
    return;
  }
  
  console.log('DISHES loaded successfully:', DISHES.length);

  activeDish = DISHES[0];

  // Attach event listeners
  if (clearDinnerButton) {
    clearDinnerButton.addEventListener("click", handleClearDinner);
  }
  
  // Initialize empty state message
  updateSelectedDishes();
}

// Extract time and visual cues from step text
function parseStepDetails(stepText) {
  // Extract time (matches: "15分钟", "3-4 minutes", "5 min", "10分", etc.)
  const timePatterns = [
    /(\d+[-~]\d+)\s*(分钟|分|minutes?|min)/gi,
    /(\d+)\s*(分钟|分|minutes?|min)/gi
  ];
  
  let time = null;
  for (const pattern of timePatterns) {
    const match = stepText.match(pattern);
    if (match) {
      time = match[0];
      break;
    }
  }
  
  // Extract visual cues (matches: "until golden", "when tender", "至金黄", etc.)
  const cuePatterns = [
    /until\s+[\w\s]+/gi,
    /when\s+[\w\s]+/gi,
    /至[\u4e00-\u9fa5]+/g,
    /变[\u4e00-\u9fa5]+/g,
    /about\s+\d+[-~]\d+\s+minutes/gi
  ];
  
  let cue = null;
  for (const pattern of cuePatterns) {
    const match = stepText.match(pattern);
    if (match) {
      // Get the first match and limit length
      cue = match[0].slice(0, 30);
      break;
    }
  }
  
  return { time, cue };
}

function formatStepWithDetails(stepText) {
  const { time, cue } = parseStepDetails(stepText);
  
  let html = '';
  
  if (time) {
    html += `<span class="step-time">⏱️ ${time}</span>`;
  }
  
  html += `<span class="step-text">${stepText}</span>`;
  
  if (cue) {
    html += `<span class="step-cue">👁️ ${cue}</span>`;
  }
  
  return html;
}

// Dish Detail Modal Functions
function openDishDetail(dish) {
  const modal = document.getElementById("dish-detail-modal");
  const body = document.getElementById("dish-detail-body");
  
  // Build ingredients list
  const ingredientsHTML = dish.materialIds.map(id => {
    const material = getMaterialById(id);
    if (!material) return '';
    return `
      <div class="ingredient-item">
        <span class="ingredient-name">${material.nameCn} / ${material.nameEn}</span>
        <span class="ingredient-amount">${material.unit || 'as needed'}</span>
      </div>
    `;
  }).filter(html => html).join('');
  
  // Build steps by category with time and visual cues
  const stepCategories = [
    { key: 'preparation', title: '0. 事前准备 / Preparation beforehand', icon: '0', time: '10-15 min' },
    { key: 'main', title: '1. 主要制作 / Main part', icon: '1', time: '15-20 min' },
    { key: 'side', title: '2. 配菜制作 / Side part', icon: '2', time: '5-10 min' },
    { key: 'seasoning', title: '3. 调味收尾 / Seasoning and sauce', icon: '3', time: '3-5 min' }
  ];
  
  const stepsHTML = stepCategories.map(category => {
    const steps = dish.steps[category.key];
    if (!steps || steps.length === 0) return '';
    
    return `
      <div class="step-category">
        <h3 class="step-category-title">
          <span class="step-category-number">${category.icon}</span>
          ${category.title}
          <span class="step-time" style="margin-left: 12px;">${category.time}</span>
        </h3>
        <ol class="step-list">
          ${steps.map(step => `<li>${formatStepWithDetails(step)}</li>`).join('')}
        </ol>
      </div>
    `;
  }).join('');
  
  // Build materials by store
  const materialsByStore = getMaterialsByStore(dish.materialIds);
  const materialsHTML = Object.entries(materialsByStore).map(([store, items]) => {
    const storeLabel = STORE_LABELS[store] || store;
    return `
      <div class="material-store-card">
        <h4>${storeLabel}</h4>
        <ul>
          ${items.map(item => `
            <li>${item.nameCn} / ${item.nameEn} - $${item.price.toFixed(2)}</li>
          `).join('')}
        </ul>
      </div>
    `;
  }).join('');
  
  body.innerHTML = `
    <div class="dish-detail-hero">
      <img src="${dish.image}" alt="${dish.name}" onerror="this.src='${createFallbackImage(dish.name)}'">
    </div>
    <div class="dish-detail-body">
      <h1 class="dish-detail-title">${dish.name}</h1>
      <p class="dish-detail-tagline">${dish.tagline}</p>
      
      <div class="dish-detail-meta">
        <div class="dish-meta-item">
          <span class="dish-meta-icon">⏱️</span>
          <span>30-45 min</span>
        </div>
        <div class="dish-meta-item">
          <span class="dish-meta-icon">👥</span>
          <span>4 servings / 4人份</span>
        </div>
      </div>
      
      <div class="dish-ingredients">
        <h2 class="dish-section-title">Ingredients / 食材</h2>
        <div class="ingredients-grid">
          ${ingredientsHTML}
        </div>
      </div>
      
      <div class="dish-steps">
        <h2 class="dish-section-title">Key Steps / 关键步骤</h2>
        ${stepsHTML}
      </div>
      
      <div class="dish-materials-section">
        <h2 class="dish-section-title">Materials by Store / 按超市分类的材料</h2>
        <div class="materials-store-grid">
          ${materialsHTML}
        </div>
      </div>
      
      <div class="dish-detail-actions">
        <button class="btn-add-dinner" onclick="addDishFromDetail('${dish.name.replace(/'/g, "\\'")}')">
          加入晚餐 / Add to Dinner
        </button>
        <button class="btn-close-detail" onclick="closeDishDetail()">
          关闭 / Close
        </button>
      </div>
    </div>
  `;
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeDishDetail() {
  const modal = document.getElementById("dish-detail-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function addDishFromDetail(dishName) {
  const dish = findDishByName(dishName);
  if (!dish) return;
  
  if (dinnerSelection.some(d => d.name === dish.name)) {
    showToast("⚠️ 已添加过此菜 / Already in your dinner plan", "warning");
    return;
  }
  
  dinnerSelection.push(dish);
  updateSelectedDishes();
  
  // Close modal first
  closeDishDetail();
  
  // Show success notification after a short delay
  setTimeout(() => {
    showToast(`已成功添加：${dish.name} / Successfully added!`, "success");
  }, 300);
}

// Toast notification function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  const toastMessage = toast.querySelector(".toast-message");
  const toastIcon = toast.querySelector(".toast-icon");
  
  // Set icon based on type
  if (type === "success") {
    toastIcon.textContent = "✅";
    toast.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  } else if (type === "warning") {
    toastIcon.textContent = "⚠️";
    toast.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
  }
  
  toastMessage.textContent = message;
  
  // Show toast
  toast.classList.add("show");
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById("dish-detail-modal");
  if (e.target === modal) {
    closeDishDetail();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDishDetail();
  }
});

window.addEventListener("DOMContentLoaded", initPage);
