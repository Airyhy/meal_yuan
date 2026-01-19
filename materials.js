const materialsGrid = document.getElementById("materials-grid");
const storeFilter = document.getElementById("store-filter");

const { MATERIALS } = window.DATA;

const STORE_LABELS = {
  "Whole Foods": "Whole Foods / 全食超市",
  Costco: "Costco / 好市多",
  Ranch99: "Ranch 99 / 大华超市"
};

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function renderMaterialsGrid(items) {
  materialsGrid.innerHTML = items
    .map(
      (item) => `
        <article class="material-card">
          <img src="${item.image}" alt="${item.nameEn}" />
          <div class="material-body">
            <h3>${item.nameCn} / ${item.nameEn}</h3>
            <p class="material-store">${STORE_LABELS[item.store] || item.store}</p>
            <p class="material-price">${formatPrice(item.price)}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function applyFilter() {
  const value = storeFilter.value;
  const filtered =
    value === "all"
      ? MATERIALS
      : MATERIALS.filter((item) => item.store === value);
  renderMaterialsGrid(filtered);
}

storeFilter.addEventListener("change", applyFilter);

renderMaterialsGrid(MATERIALS);
