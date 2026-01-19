// Made Dinners Data - Past meals we've made
const MADE_DINNERS = [
  {
    id: 1,
    date: "2025-12-24",
    occasion: "圣诞前夜家庭聚餐 / Christmas Eve Family Dinner",
    description: "我们第一次做这么丰盛的晚餐！麻婆豆腐超级下饭，大家都吃撑了。完美的圣诞夜！/ Our first time making such a feast! The mapo tofu was absolutely incredible. Everyone was so full. Perfect Christmas eve!",
    dishes: ["麻婆豆腐 (Mapo Tofu)", "宫保鸡丁 (Kung Pao Chicken)", "番茄炒蛋 (Tomato Egg)"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    imageAlt: "Christmas dinner table with candles and festive dishes"
  },
  {
    id: 2,
    date: "2026-01-01",
    occasion: "新年第一餐 / New Year's First Meal",
    description: "新年新气象！香煎鸡胸做得特别嫩，肉丸也很成功。2026开门红！/ Starting the year right! The chicken breast was so tender and juicy. Best food to kick off 2026!",
    dishes: ["香煎鸡胸 (Pan-Fried Chicken Breast)", "肉丸 (Meatballs)"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    imageAlt: "New Year celebration dinner with multiple dishes"
  },
  {
    id: 3,
    date: "2026-01-10",
    occasion: "周末朋友聚会 / Weekend Gathering with Friends",
    description: "朋友们都说是他们吃过最好吃的中餐！宫保鸡丁太香了，做饭真有成就感。/ Friends said this was the best Chinese food they've ever had! So proud of our cooking skills!",
    dishes: ["宫保鸡丁 (Kung Pao Chicken)", "番茄炒蛋 (Tomato Egg)", "肉丸 (Meatballs)"],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    imageAlt: "Friends gathering dinner with multiple Chinese dishes"
  },
  {
    id: 4,
    date: "2026-01-14",
    occasion: "情人节晚餐 / Valentine's Day Dinner",
    description: "浪漫的二人世界！这顿饭充满爱意，比餐厅的还好吃。下次还要这样做！/ Romantic dinner for two! Made with love, tastes better than any restaurant. Will do this again!",
    dishes: ["香煎鸡胸 (Pan-Fried Chicken Breast)", "麻婆豆腐 (Mapo Tofu)"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    imageAlt: "Romantic Valentine's dinner for two"
  },
  {
    id: 5,
    date: "2025-12-31",
    occasion: "跨年夜庆祝 / New Year's Eve Celebration",
    description: "告别2025的完美方式！三道菜都做得很成功，我们真的越来越会做饭了！/ Perfect way to end 2025! All three dishes turned out amazing. We're getting so good at this!",
    dishes: ["宫保鸡丁 (Kung Pao Chicken)", "麻婆豆腐 (Mapo Tofu)", "香煎鸡胸 (Pan-Fried Chicken Breast)"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    imageAlt: "New Year's Eve celebration dinner spread"
  },
  {
    id: 6,
    date: "2025-12-20",
    occasion: "冬至家宴 / Winter Solstice Family Feast",
    description: "冬至要吃饺子但我们做了家常菜！全家都说好吃，妈妈还要了菜谱。太开心了！/ Traditional winter solstice meal! Everyone loved it, even mom asked for the recipes. Great success!",
    dishes: ["麻婆豆腐 (Mapo Tofu)", "番茄炒蛋 (Tomato Egg)", "肉丸 (Meatballs)"],
    image: "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?w=800&q=80",
    imageAlt: "Winter solstice family dinner"
  }
];

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const enDate = date.toLocaleDateString('en-US', options);
  const cnDate = date.toLocaleDateString('zh-CN', options);
  return `${cnDate} · ${enDate}`;
}

// Render dinner gallery
function renderDinnerGallery() {
  const gallery = document.getElementById('dinner-gallery');
  
  if (!MADE_DINNERS || MADE_DINNERS.length === 0) {
    gallery.innerHTML = `
      <div class="empty-gallery">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <h3>暂无晚餐记录 / No dinners yet</h3>
        <p>开始做菜并记录你的美食时刻吧！/ Start cooking and record your culinary moments!</p>
      </div>
    `;
    return;
  }
  
  // Sort dinners by date (newest first)
  const sortedDinners = [...MADE_DINNERS].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  gallery.innerHTML = sortedDinners.map(dinner => `
    <div class="dinner-card" data-dinner-id="${dinner.id}">
      <div class="dinner-image-wrapper">
        <img src="${dinner.image}" alt="${dinner.imageAlt}" loading="lazy" />
        <div class="dinner-date-badge">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
          </svg>
          ${formatDate(dinner.date)}
        </div>
      </div>
      <div class="dinner-info">
        <h3 class="dinner-occasion">${dinner.occasion}</h3>
        <p class="dinner-description">${dinner.description}</p>
        <div class="dinner-dishes">
          ${dinner.dishes.map(dish => `<span class="dinner-dish-tag">${dish}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click event listeners
  document.querySelectorAll('.dinner-card').forEach(card => {
    card.addEventListener('click', function() {
      const dinnerId = parseInt(this.getAttribute('data-dinner-id'));
      const dinner = MADE_DINNERS.find(d => d.id === dinnerId);
      if (dinner) {
        showDinnerDetail(dinner);
      }
    });
  });
}

// Show dinner detail (could open a modal in the future)
function showDinnerDetail(dinner) {
  // For now, just log - could enhance with a modal later
  console.log('Dinner detail:', dinner);
  alert(`${dinner.occasion}\n\n${dinner.description}\n\n菜品 / Dishes:\n${dinner.dishes.join('\n')}\n\n日期 / Date: ${formatDate(dinner.date)}`);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderDinnerGallery();
});
