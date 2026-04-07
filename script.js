// ===== ДАННЫЕ ТОВАРОВ =====
const products = [
    { id: 1, name: "Хлопок голубой", category: "cotton", categoryName: "Хлопок", price: 450, unit: "руб/кг",
      desc: "Мягкий натуральный хлопок, идеален для детской одежды",
      fullDesc: "Этот нежный голубой хлопок — отличный выбор для создания детской одежды, пелёнок и постельного белья.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/113179300-6f1d-481e-97a2-69c5d976b55f.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/113179300-6f1d-481e-97a2-69c5d976b55f.png"],
      badge: "hit", rating: 4.8, reviews: 124,
      specs: { "Состав": "100% хлопок", "Плотность": "130 г/м²", "Ширина": "150 см" },
      care: ["Стирка при 40°C", "Не отбеливать"]
    },
    { id: 2, name: "Лён натуральный", category: "linen", categoryName: "Лён", price: 680, unit: "руб/кг",
      desc: "Экологичный натуральный лён для летней одежды",
      fullDesc: "Натуральный лён высшего качества — дышащий, гипоаллергенный и невероятно прочный.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/192becfc4-eb89-4cb0-af92-988c3c1f3855.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/192becfc4-eb89-4cb0-af92-988c3c1f3855.png"],
      badge: "new", rating: 4.9, reviews: 87,
      specs: { "Состав": "100% лён", "Плотность": "170 г/м²", "Ширина": "140 см" },
      care: ["Стирка при 60°C", "Гладить горячим утюгом"]
    },
    { id: 3, name: "Шёлк бордовый", category: "silk", categoryName: "Шёлк", price: 1200, unit: "руб/кг",
      desc: "Элегантный шёлк с мягким блеском",
      fullDesc: "Роскошный шёлк глубокого бордового цвета с благородным блеском.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/11058c96f-22a0-439d-9d36-4c94b66c6fcc.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/11058c96f-22a0-439d-9d36-4c94b66c6fcc.png"],
      badge: null, rating: 4.7, reviews: 56,
      specs: { "Состав": "100% шёлк", "Плотность": "80 г/м²", "Ширина": "140 см" },
      care: ["Ручная стирка", "Температура до 30°C"]
    },
    { id: 4, name: "Бархат изумрудный", category: "velvet", categoryName: "Бархат", price: 950, unit: "руб/кг",
      desc: "Роскошный бархат глубокого зелёного цвета",
      fullDesc: "Великолепный бархат насыщенного изумрудного оттенка.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/1b2f8ef85-13d9-4acf-ac6c-529961460d18.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/1b2f8ef85-13d9-4acf-ac6c-529961460d18.png"],
      badge: "new", rating: 4.6, reviews: 43,
      specs: { "Состав": "Полиэстер/Вискоза", "Плотность": "280 г/м²", "Ширина": "150 см" },
      care: ["Химчистка", "Не гладить по ворсу"]
    },
    { id: 5, name: "Хлопок жёлтый", category: "cotton", categoryName: "Хлопок", price: 420, unit: "руб/кг",
      desc: "Яркий хлопковый текстиль для пэчворка",
      fullDesc: "Солнечный жёлтый хлопок — идеальная основа для пэчворка.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/189633bff-286e-4432-a1c3-f9885fc41b17.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/189633bff-286e-4432-a1c3-f9885fc41b17.png"],
      badge: "sale", rating: 4.5, reviews: 98,
      specs: { "Состав": "100% хлопок", "Плотность": "120 г/м²", "Ширина": "110 см" },
      care: ["Стирка при 40°C", "Не отбеливать"]
    }
];

const categoryList = [
    { id: 'all', name: 'Все ткани' },
    { id: 'cotton', name: 'Хлопок' },
    { id: 'linen', name: 'Лён' },
    { id: 'silk', name: 'Шёлк' },
    { id: 'velvet', name: 'Бархат' }
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('lv_cart') || '[]');
let currentCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('lv_favs') || '[]');
let currentProduct = null;

// ===== INIT =====
function init() {
    if (!localStorage.getItem('lv_products')) localStorage.setItem('lv_products', JSON.stringify(products));
    if (!localStorage.getItem('lv_orders')) localStorage.setItem('lv_orders', JSON.stringify([]));
    
    // Рендерим только если мы на главной странице и есть контейнер
    if (document.getElementById('productsGrid')) {
        renderCategories();
        renderProducts();
    }
    updateCartUI();
    setupPhoneInput();
}

// ===== NAVIGATION =====
function showPage(pageId) {
    if (pageId === 'catalog') window.location.href = 'index.html';
}

// ===== PRODUCTS LOGIC =====
function renderCategories() {
    const container = document.getElementById('categories');
    if (!container) return;
    container.innerHTML = categoryList.map(cat => 
        `<button class="category-btn ${cat.id === currentCategory ? 'active' : ''}" onclick="filterProducts('${cat.id}')">${cat.name}</button>`
    ).join('');
}

function filterProducts(category) {
    currentCategory = category;
    renderCategories();
    renderProducts();
    
    const header = document.querySelector('.section-header');
    if (header) {
        setTimeout(() => header.scrollIntoView({ behavior: 'smooth' }), 50);
    }
}

function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    const filtered = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);

    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-light);">В этой категории пока нет товаров</div>';
        return;
    }

    container.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.categoryName}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-footer">
                    <div class="product-price">${product.price} ₽ <small>/ кг</small></div>
                    <button class="add-to-cart" onclick="event.stopPropagation(); quickAddToCart(${product.id}, this)">+ В корзину</button>
                </div>
            </div>
        </div>
    `).join('');
}

function getBadgeText(badge) {
    return { 'new': 'Новинка', 'sale': 'Скидка', 'hit': 'Хит' }[badge] || '';
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    const modal = document.getElementById('productModal');
    if (!modal) return;

    const isFav = favorites.includes(currentProduct.id);
    
    document.getElementById('modalProductTitle').textContent = currentProduct.name;
    document.getElementById('modalProductBody').innerHTML = `
        <div class="pd-grid">
            <div>
                <div class="pd-main-image">
                    <img src="${currentProduct.image}" alt="${currentProduct.name}" id="pdMainImage">
                </div>
                <div class="pd-thumbnails">
                    ${currentProduct.gallery.map((img, i) => `
                        <div class="pd-thumb ${i === 0 ? 'active' : ''}" onclick="changeModalImage('${img}', this)">
                            <img src="${img}" alt="Превью">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="pd-info">
                <span class="pd-category">${currentProduct.categoryName}</span>
                ${currentProduct.badge ? `<span class="product-badge badge-${currentProduct.badge}" style="position:static;display:inline-block;margin-left:8px;">${getBadgeText(currentProduct.badge)}</span>` : ''}
                <h2 class="pd-name">${currentProduct.name}</h2>
                <div class="pd-rating">
                    <span class="pd-stars">${getStarsHtml(currentProduct.rating)}</span>
                    <span>${currentProduct.rating} (${currentProduct.reviews} отзывов)</span>
                </div>
                <div class="pd-price-block">
                    <span class="pd-price">${currentProduct.price} ₽</span>
                    <span class="pd-price-unit">за 1 кг</span>
                </div>
                <p class="pd-desc">${currentProduct.fullDesc}</p>
                
                <div class="pd-section-title">Выберите вес:</div>
                <div class="pd-quick-weights">
                    ${[0.5, 1, 2, 3, 5].map(w => `<button class="pd-quick-weight ${w===0.5?'active':''}" onclick="setModalWeight(${w}, this)">${w} кг</button>`).join('')}
                </div>
                <div class="pd-weight-selector">
                    <span class="pd-weight-label">Вес:</span>
                    <div class="pd-weight-controls">
                        <button class="pd-weight-btn" onclick="adjustModalWeight(-0.1)">−</button>
                        <input type="number" class="pd-weight-value" id="pdWeight" value="0.5" min="0.1" max="50" step="0.1">
                        <button class="pd-weight-btn" onclick="adjustModalWeight(0.1)">+</button>
                    </div>
                    <span class="pd-weight-unit">кг</span>
                    <span class="pd-weight-total" id="pdWeightTotal">${(currentProduct.price * 0.5).toLocaleString('ru-RU')} ₽</span>
                </div>

                <div class="pd-actions">
                    <button class="pd-add-btn" onclick="addFromModal(this)">Добавить в корзину</button>
                    <button class="pd-fav-btn ${isFav?'active':''}" onclick="toggleFavorite(${currentProduct.id}, this)">${isFav?'❤️':'🤍'}</button>
                </div>

                <div class="pd-features">
                    ${Object.entries(currentProduct.specs).slice(0,4).map(([k,v]) => 
                        `<div class="pd-feature"><strong>${k}</strong>${v}</div>`
                    ).join('')}
                </div>

                <div class="pd-tabs">
                    <div class="pd-tab-headers">
                        <button class="pd-tab-header active" onclick="switchModalTab('specs', this)">Характеристики</button>
                        <button class="pd-tab-header" onclick="switchModalTab('care', this)">Уход</button>
                    </div>
                    <div class="pd-tab-content active" id="tab-specs">
                        <table class="pd-specs-table">
                            ${Object.entries(currentProduct.specs).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
                        </table>
                    </div>
                    <div class="pd-tab-content" id="tab-care">
                        <ul class="pd-care-list">
                            ${currentProduct.care.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateModalWeightTotal();
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        currentProduct = null;
    }
}

function changeModalImage(src, thumb) {
    document.getElementById('pdMainImage').src = src;
    document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function setModalWeight(weight, btn) {
    document.getElementById('pdWeight').value = weight;
    document.querySelectorAll('.pd-quick-weight').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateModalWeightTotal();
}

function adjustModalWeight(delta) {
    const input = document.getElementById('pdWeight');
    let val = parseFloat(input.value) + delta;
    val = Math.max(0.1, Math.min(50, val));
    input.value = val.toFixed(1);
    document.querySelectorAll('.pd-quick-weight').forEach(b => b.classList.remove('active'));
    updateModalWeightTotal();
}

function updateModalWeightTotal() {
    if (!currentProduct) return;
    const weight = parseFloat(document.getElementById('pdWeight').value) || 0.1;
    const total = (currentProduct.price * weight).toLocaleString('ru-RU');
    document.getElementById('pdWeightTotal').textContent = total + ' ₽';
}

function addFromModal(btn) {
    if (!currentProduct) return;
    const weight = parseFloat(document.getElementById('pdWeight').value) || 0.5;
    
    const existingItem = cart.find(item => item.id === currentProduct.id);
    if (existingItem) {
        existingItem.qty += weight;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            qty: parseFloat(weight.toFixed(1))
        });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${currentProduct.name} (${weight} кг) добавлен в корзину`);
    
    btn.classList.add('added');
    btn.textContent = 'Добавлено!';
    setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = 'Добавить в корзину';
    }, 1500);
}

function switchModalTab(tabId, btn) {
    document.querySelectorAll('.pd-tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pd-tab-header').forEach(h => h.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    btn.classList.add('active');
}

function getStarsHtml(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

// ===== QUICK ADD =====
function quickAddToCart(productId, btn) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty += 0.5;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 0.5 });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${product.name} добавлен в корзину`);
    
    btn.classList.add('added');
    btn.textContent = '✓';
    setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = '+ В корзину';
    }, 1000);
}

// ===== FAVORITES =====
function toggleFavorite(productId, btn) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        btn.classList.remove('active');
        btn.innerHTML = '🤍';
        showToast('Удалено из избранного');
    } else {
        favorites.push(productId);
        btn.classList.add('active');
        btn.innerHTML = '❤️';
        showToast('Добавлено в избранное');
    }
    localStorage.setItem('lv_favs', JSON.stringify(favorites));
}

// ===== CART =====
function saveCart() { localStorage.setItem('lv_cart', JSON.stringify(cart)); }
function getCartTotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
function getCartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const count = Math.round(getCartCount() * 10) / 10;
    if (count > 0) {
        badge.style.display = 'flex';
        badge.textContent = count;
    } else {
        badge.style.display = 'none';
    }
}

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (!overlay || !sidebar) return;

    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
        overlay.classList.remove('open');
        sidebar.classList.remove('open');
        document.body.style.overflow = '';
    } else {
        renderCartItems();
        overlay.classList.add('open');
        sidebar.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><h3>Корзина пуста</h3><p>Добавьте ткани из каталога</p></div>';
        footer.style.display = 'none';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${(item.price * item.qty).toLocaleString('ru-RU')} ₽</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -0.1)">−</button>
                    <span class="qty-value">${item.qty.toFixed(1)} кг</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 0.1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    footer.style.display = 'block';
    totalEl.textContent = getCartTotal().toLocaleString('ru-RU') + ' ₽';
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty = Math.max(0.1, parseFloat((item.qty + delta).toFixed(1)));
        if (item.qty <= 0) { removeFromCart(productId); return; }
    }
    saveCart();
    updateCartUI();
    renderCartItems();
}

// ===== CHECKOUT =====
function openCheckout() {
    if (cart.length === 0) return;
    toggleCart();
    setTimeout(() => {
        const summary = document.getElementById('orderSummary');
        if (summary) {
            summary.innerHTML = `
                <h4>Ваш заказ:</h4>
                ${cart.map(item => `<div class="order-summary-item"><span>${item.name} × ${item.qty.toFixed(1)} кг</span><span>${(item.price * item.qty).toLocaleString('ru-RU')} ₽</span></div>`).join('')}
                <div class="order-summary-total"><span>Итого:</span><span>${getCartTotal().toLocaleString('ru-RU')} ₽</span></div>
            `;
        }
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }, 200);
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        const form = document.getElementById('orderForm');
        if (form) {
            form.style.display = '';
            form.reset();
        }
    }
}

function submitOrder(event) {
    event.preventDefault();
    const order = {
        customer: {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            city: document.getElementById('customerCity').value,
            address: document.getElementById('customerAddress').value,
            comment: document.getElementById('customerComment').value
        },
        items: [...cart],
        total: getCartTotal()
    };

    const orders = JSON.parse(localStorage.getItem('lv_orders') || '[]');
    order.id = Date.now();
    order.date = new Date().toLocaleString('ru-RU');
    order.status = 'new';
    orders.unshift(order);
    localStorage.setItem('lv_orders', JSON.stringify(orders));

    const body = document.getElementById('checkoutBody');
    if (body) {
        body.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h3>Заказ оформлен!</h3>
                <p>Номер заказа: #${order.id.toString().slice(-6)}</p>
                <p style="margin-top:12px;">Мы свяжемся с вами в ближайшее время.</p>
                <button class="btn-primary" style="margin-top:20px;" onclick="closeCheckout(); location.reload();">Отлично!</button>
            </div>
        `;
    }

    cart = [];
    saveCart();
    updateCartUI();
    showToast('Заказ успешно оформлен!');
}

// ===== ADMIN AUTH (ПРОСТОЙ ВХОД) =====

// Функция входа (вызывается из модального окна)
function handleAdminLogin(event) {
    event.preventDefault();
    
    const loginInput = document.getElementById('loginUsername');
    const passInput = document.getElementById('loginPassword');
    const errorMsg = document.getElementById('loginError');

    // НАСТРОЙКИ ДОСТУПА
    const ADMIN_LOGIN = 'admin';
    const ADMIN_PASS = 'admin123';

    if (loginInput.value === ADMIN_LOGIN && passInput.value === ADMIN_PASS) {
        // Сохраняем флаг входа в сессию
        sessionStorage.setItem('admin_logged_in', 'true');
        
        // Закрываем модалку
        closeAuthModal();
        
        // Перебрасываем на страницу админки
        window.location.href = 'admin.html';
    } else {
        if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Неверный логин или пароль';
        } else {
            alert('Неверный логин или пароль');
        }
    }
}

// Проверка авторизации (для страницы admin.html)
function checkAdminAuth() {
    if (sessionStorage.getItem('admin_logged_in') !== 'true') {
        // Если не вошел - выкидываем на главную или показываем вход
        // Для простоты - редирект на главную, где можно нажать "Админ"
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function logoutAdmin() {
    sessionStorage.removeItem('admin_logged_in');
    window.location.href = 'index.html';
}

// ===== ADMIN PANEL LOGIC =====
function renderAdminPanel() {
    // Сначала проверяем, авторизован ли пользователь
    if (!checkAdminAuth()) return;

    const orders = JSON.parse(localStorage.getItem('lv_orders') || '[]');
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const newOrders = orders.filter(o => o.status === 'new').length;

    const statsContainer = document.getElementById('adminStats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="admin-stat-card"><div class="stat-label">Всего заказов</div><div class="stat-number">${orders.length}</div></div>
            <div class="admin-stat-card"><div class="stat-label">Новых</div><div class="stat-number" style="color:var(--success)">${newOrders}</div></div>
            <div class="admin-stat-card"><div class="stat-label">Сумма</div><div class="stat-number" style="color:var(--primary)">${totalRevenue.toLocaleString('ru-RU')} ₽</div></div>
        `;
    }

    const tbody = document.getElementById('ordersBody');
    const noOrders = document.getElementById('noOrders');
    const table = document.getElementById('ordersTable');

    if (!tbody || !table || !noOrders) return;

    if (orders.length === 0) {
        table.style.display = 'none';
        noOrders.style.display = 'block';
    } else {
        table.style.display = '';
        noOrders.style.display = 'none';
        tbody.innerHTML = orders.map(order => {
            const itemsText = order.items.map(i => `${i.name} (${i.qty.toFixed(1)}кг)`).join(', ');
            return `<tr>
                <td><strong>#${order.id.toString().slice(-6)}</strong></td>
                <td>${order.date}</td>
                <td>${order.customer.name}</td>
                <td>${order.customer.phone}</td>
                <td title="${itemsText}">${itemsText.length > 25 ? itemsText.slice(0, 25) + '...' : itemsText}</td>
                <td><strong>${order.total.toLocaleString('ru-RU')} ₽</strong></td>
                <td>
                    <select class="form-input" style="padding:4px 8px;font-size:12px;width:auto;" onchange="updateOrderStatus(${order.id}, this.value)">
                        <option value="new" ${order.status==='new'?'selected':''}>Новый</option>
                        <option value="processing" ${order.status==='processing'?'selected':''}>В работе</option>
                        <option value="completed" ${order.status==='completed'?'selected':''}>Завершён</option>
                    </select>
                </td>
                <td><button class="delete-order-btn" onclick="if(confirm('Удалить заказ?')) deleteOrder(${order.id})">Удалить</button></td>
            </tr>`;
        }).join('');
    }
}

function updateOrderStatus(id, status) {
    const orders = JSON.parse(localStorage.getItem('lv_orders') || '[]');
    const order = orders.find(o => o.id === id);
    if (order) { 
        order.status = status; 
        localStorage.setItem('lv_orders', JSON.stringify(orders)); 
        showToast('Статус обновлен');
    }
}

function deleteOrder(id) {
    let orders = JSON.parse(localStorage.getItem('lv_orders') || '[]');
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem('lv_orders', JSON.stringify(orders));
    renderAdminPanel();
    showToast('Заказ удалён');
}

function exportOrders() {
    const orders = JSON.parse(localStorage.getItem('lv_orders') || '[]');
    if (orders.length === 0) { showToast('Нет заказов для экспорта'); return; }
    
    let csv = 'Номер,Дата,Имя,Телефон,Город,Товары,Сумма,Статус\n';
    orders.forEach(order => {
        const itemsText = order.items.map(i => `${i.name} (${i.qty.toFixed(1)}кг)`).join('; ');
        const statusText = { 'new': 'Новый', 'processing': 'В обработке', 'completed': 'Завершён' }[order.status];
        csv += `#${order.id.toString().slice(-6)},${order.date},"${order.customer.name}","${order.customer.phone}","${order.customer.city}","${itemsText}",${order.total},${statusText}\n`;
    });
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `orders_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    showToast('Заказы экспортированы');
}

function clearAllOrders() {
    if (confirm('Удалить ВСЕ заказы? Это действие нельзя отменить.')) {
        localStorage.setItem('lv_orders', JSON.stringify([]));
        renderAdminPanel();
        showToast('Все заказы удалены');
    }
}

// ===== UTILS =====
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function setupPhoneInput() {
    const phoneInput = document.getElementById('customerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') value = value.substring(1);
                let formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                e.target.value = formatted;
            }
        });
    }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);

// Закрытие модалок по клику вне
document.addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeProductModal();
    if (e.target.id === 'checkoutModal') closeCheckout();
    if (e.target.id === 'authModal') closeAuthModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCheckout();
        closeAuthModal();
        if (document.getElementById('cartSidebar')?.classList.contains('open')) toggleCart();
    }
});
