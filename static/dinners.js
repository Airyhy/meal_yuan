// Made Dinners Page
const API_BASE = '/api';
const USER_ID = 'default';

let dinners = [];
let dishes = [];

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([loadDinners(), loadDishes()]);
    renderDinners();
});

// Load dinners from API
async function loadDinners() {
    try {
        const response = await fetch(`${API_BASE}/completed-dinners/${USER_ID}`);
        dinners = await response.json();
        console.log(`Loaded ${dinners.length} completed dinners`);
    } catch (error) {
        console.error('Failed to load dinners:', error);
        showToast('Failed to load dinner history', 'error');
    }
}

// Load dishes to get images
async function loadDishes() {
    try {
        const response = await fetch(`${API_BASE}/dishes`);
        dishes = await response.json();
        console.log(`Loaded ${dishes.length} dishes`);
    } catch (error) {
        console.error('Failed to load dishes:', error);
    }
}

// Get dish by name
function getDishByName(name) {
    return dishes.find(d => d.name === name);
}

// Render dinners
function renderDinners() {
    const gallery = document.getElementById('dinner-gallery');
    
    if (!dinners.length) {
        gallery.innerHTML = `
            <p style="text-align: center; color: #999; padding: 40px;">
                No dinners recorded yet / 还没有记录晚餐<br>
                <small>Complete dinner plans from the main page / 从主页完成晚餐计划</small>
            </p>
        `;
        return;
    }
    
    // Group by date
    const byDate = {};
    dinners.forEach(dinner => {
        const date = new Date(dinner.completedAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (!byDate[date]) byDate[date] = [];
        byDate[date].push(dinner);
    });
    
    gallery.innerHTML = Object.entries(byDate).map(([date, items]) => `
        <div class="dinner-date-section">
            <h3 class="dinner-date">📅 ${date}</h3>
            <div class="dinner-cards">
                ${items.map(dinner => renderDinnerCard(dinner)).join('')}
            </div>
        </div>
    `).join('');
}

// Render single dinner card
function renderDinnerCard(dinner) {
    const dishNames = dinner.dishNames || [];
    const time = new Date(dinner.completedAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Get images for dishes
    const dishImages = dishNames.map(name => {
        const dish = getDishByName(name);
        return dish ? `/static/${dish.image}` : '';
    }).filter(img => img);
    
    // Use first dish image or placeholder
    const mainImage = dishImages[0] || 'https://via.placeholder.com/400x300/f0f0f0/999999?text=Dinner';
    
    return `
        <div class="dinner-card">
            <div class="dinner-image">
                <img src="${mainImage}" alt="Dinner" loading="lazy">
                ${dishImages.length > 1 ? `<span class="dish-count">+${dishImages.length - 1}</span>` : ''}
            </div>
            <div class="dinner-content">
                <h4 class="dinner-dishes">${dishNames.join(' + ')}</h4>
                <p class="dinner-time">⏰ ${time}</p>
                ${dinner.notes ? `<p class="dinner-notes">${dinner.notes}</p>` : ''}
            </div>
        </div>
    `;
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
