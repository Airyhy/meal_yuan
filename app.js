const dishGallery = document.getElementById("dish-gallery");
const addDishButton = document.getElementById("add-dish");
const stepsList = document.getElementById("dish-steps");
const materialsGrid = document.getElementById("dish-materials");
const selectedDishesList = document.getElementById("selected-dishes");
const combinedMaterialsGrid = document.getElementById("combined-materials");
const generateListButton = document.getElementById("generate-list");
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
      activeDish = selectedDish;
      updateActiveCard();
      renderSteps(selectedDish.steps);
      renderMaterials(
        materialsGrid,
        getMaterialsByStore(selectedDish.materialIds),
        false
      );
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
    .map((dish) => `<li class="chip">${dish.name}</li>`)
    .join("");
}

function combineMaterials() {
  const materialIds = new Set();
  dinnerSelection.forEach((dish) => {
    dish.materialIds.forEach((id) => materialIds.add(id));
  });

  const grouped = getMaterialsByStore(Array.from(materialIds));
  renderMaterials(combinedMaterialsGrid, grouped, true);
}

function handleAddDish() {
  const selectedDish = activeDish;
  if (!selectedDish) return;
  if (!dinnerSelection.some((dish) => dish.name === selectedDish.name)) {
    dinnerSelection.push(selectedDish);
    updateSelectedDishes();
  }
}

function handleGenerateList() {
  if (dinnerSelection.length === 0) {
    combinedMaterialsGrid.innerHTML =
      "<p>请先添加至少一道菜 / Please add at least one dish first.</p>";
    return;
  }
  combineMaterials();
}

function handleClearDinner() {
  dinnerSelection.length = 0;
  updateSelectedDishes();
  combinedMaterialsGrid.innerHTML = "";
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
  updateActiveCard();
  renderSteps(activeDish.steps);
  renderMaterials(
    materialsGrid,
    getMaterialsByStore(activeDish.materialIds),
    false
  );

  addDishButton.addEventListener("click", handleAddDish);
  generateListButton.addEventListener("click", handleGenerateList);
  clearDinnerButton.addEventListener("click", handleClearDinner);
}

window.addEventListener("DOMContentLoaded", initPage);
