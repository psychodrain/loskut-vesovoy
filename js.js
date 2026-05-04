// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
    WEIGHT: { MIN: 0.1, MAX: 50, STEP: 0.1, DEFAULT: 0.5 },
    QUICK_WEIGHTS: [0.5, 1, 2, 3, 5],
    TOAST_DURATION: 3000,
    STORAGE: {
        CART: 'lv_cart',
        FAVS: 'lv_favs',
        ORDERS: 'lv_orders',
        PRODUCTS: 'lv_products'
    },
    ADMIN: { LOGIN: 'admin', PASS: 'admin123' }
};

// ===== ХЕЛПЕРЫ =====
const Storage = {
    get(key, fallback = null) {
        try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
        catch { return fallback; }
    },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

const DOM = {
    cache: {},
    get(id) {
        if (!this.cache[id]) this.cache[id] = document.getElementById(id);
        return this.cache[id];
    }
};

const formatPrice = (price) => price.toLocaleString('ru-RU') + ' ₽';
const formatWeight = (w) => parseFloat(w.toFixed(1));

// ===== ДАННЫЕ =====
const products = [
    { id: 1, name: "Хлопок голубой", category: "cotton", categoryName: "Хлопок", price: 450, unit: "руб/кг",
      desc: "Мягкий натуральный хлопок, идеален для детской одежды",
      fullDesc: "Этот нежный голубой хлопок — отличный выбор для создания детской одежды, пелёнок и постельного белья.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/113179300-6f1d-481e-97a2-69c5d976b55f.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/113179300-6f1d-481e-97a2-69c5d976b55f.png"],
      specs: { "Состав": "100% хлопок", "Плотность": "130 г/м²", "Ширина": "150 см" },
      care: ["Стирка при 40°C", "Не отбеливать"]
    },
    { id: 2, name: "Лён натуральный", category: "linen", categoryName: "Лён", price: 680, unit: "руб/кг",
      desc: "Экологичный натуральный лён для летней одежды",
      fullDesc: "Натуральный лён высшего качества — дышащий, гипоаллергенный и невероятно прочный.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/192becfc4-eb89-4cb0-af92-988c3c1f3855.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/192becfc4-eb89-4cb0-af92-988c3c1f3855.png"],
      specs: { "Состав": "100% лён", "Плотность": "170 г/м²", "Ширина": "140 см" },
      care: ["Стирка при 60°C", "Гладить горячим утюгом"]
    },
    { id: 3, name: "Шёлк бордовый", category: "silk", categoryName: "Шёлк", price: 1200, unit: "руб/кг",
      desc: "Элегантный шёлк с мягким блеском",
      fullDesc: "Роскошный шёлк глубокого бордового цвета с благородным блеском.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/11058c96f-22a0-439d-9d36-4c94b66c6fcc.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/11058c96f-22a0-439d-9d36-4c94b66c6fcc.png"],
      specs: { "Состав": "100% шёлк", "Плотность": "80 г/м²", "Ширина": "140 см" },
      care: ["Ручная стирка", "Температура до 30°C"]
    },
    { id: 4, name: "Бархат изумрудный", category: "velvet", categoryName: "Бархат", price: 950, unit: "руб/кг",
      desc: "Роскошный бархат глубокого зелёного цвета",
      fullDesc: "Великолепный бархат насыщенного изумрудного оттенка.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/1b2f8ef85-13d9-4acf-ac6c-529961460d18.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/1b2f8ef85-13d9-4acf-ac6c-529961460d18.png"],
      specs: { "Состав": "Полиэстер/Вискоза", "Плотность": "280 г/м²", "Ширина": "150 см" },
      care: ["Химчистка", "Не гладить по ворсу"]
    },
    { id: 5, name: "Хлопок жёлтый", category: "cotton", categoryName: "Хлопок", price: 420, unit: "руб/кг",
      desc: "Яркий хлопковый текстиль для пэчворка",
      fullDesc: "Солнечный жёлтый хлопок — идеальная основа для пэчворка.",
      image: "https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/189633bff-286e-4432-a1c3-f9885fc41b17.png",
      gallery: ["https://image.qwenlm.ai/public_source/76bb5dd4-4f72-4671-b805-d03a52364dad/189633bff-286e-4432-a1c3-f9885fc41b17.png"],
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

// ===== СОСТОЯНИЕ =====
let cart = Storage.get(CONFIG.STORAGE.CART, []);
let favorites = Storage.get(CONFIG.STORAGE.FAVS, []);
let currentCategory = 'all';
let currentProduct = null;

// ИНИЦИАЛИЗАЦИЯ
function init() {
    if (!localStorage.getItem(CONFIG.STORAGE.PRODUCTS)) {
        Storage.set(CONFIG.STORAGE.PRODUCTS, products);
    }
    if (!localStorage.getItem(CONFIG.STORAGE.ORDERS)) {
        Storage.set(CONFIG.STORAGE.ORDERS, []);
    }
    
    if (DOM.get('productsGrid')) {
        renderCategories();
        renderProducts();
        setupEventDelegation();
    }
    updateCartUI();
    setupPhoneInput();
}

// ===== КАТЕГОРИИ =====
function renderCategories() {
    const container = DOM.get('categories');
    if (!container) return;
    container.innerHTML = categoryList.map(cat => 
        `<button class="category-btn ${cat.id === currentCategory ? 'active' : ''}" 
                 data-category="${cat.id}">${cat.name}</button>`
    ).join('');
}

function filterProducts(category) {
    currentCategory = category;
    renderCategories();
    renderProducts();
    const header = document.querySelector('.section-header');
    if (header) setTimeout(() => header.scrollIntoView({ behavior: 'smooth' }), 50);
}

// ===== РЕНДЕР ТОВАРОВ =====
function renderProductCard(product) {
    const badgeHtml = product.badge 
        ? `<span class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</span>` 
        : '';
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${badgeHtml}
            </div>
            <div class="product-info">
                <div class="product-category">${product.categoryName}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-footer">
                    <div class="product-price">${product.price} ₽ <small>/ кг</small></div>
                    <button class="add-to-cart" data-product-id="${product.id}">+ В корзину</button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts() {
    const container = DOM.get('productsGrid');
    if (!container) return;
    
    const filtered = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-light);">В этой категории пока нет товаров</div>';
        return;
    }
    container.innerHTML = filtered.map(renderProductCard).join('');
}

function getBadgeText(badge) { 
    return { 'new': 'Новинка', 'sale': 'Скидка', 'hit': 'Хит' }[badge] || ''; 
}

// ===== ДЕЛЕГИРОВАНИЕ СОБЫТИЙ  =====
function setupEventDelegation() {
    // Фильтрация по категориям
    DOM.get('categories')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-category]');
        if (btn) filterProducts(btn.dataset.category);
    });
    
    // Открытие модалки товара
    DOM.get('productsGrid')?.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card && !e.target.closest('.add-to-cart')) {
            openProductModal(+card.dataset.productId);
        }
    });
    
    // Быстрое добавление в корзину
    DOM.get('productsGrid')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart');
        if (btn) {
            e.stopPropagation();
            quickAddToCart(+btn.dataset.productId, btn);
        }
    });
}

// ===== КОРЗИНА =====
function addToCart(product, qty = CONFIG.WEIGHT.DEFAULT) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty = formatWeight(existing.qty + qty);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: formatWeight(qty)
        });
    }
    saveCart();
    updateCartUI();
}

function quickAddToCart(id, btn) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    addToCart(product, 0.5);
    showToast(`${product.name} добавлен`);
    
    // Анимация кнопки
    btn.classList.add('added');
    btn.textContent = '✓';
    setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = '+ В корзину';
    }, 1000);
}

// ===== МОДАЛКА ТОВАРА =====
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    renderModalContent();
    openModal('productModal');
    updateModalWeightTotal();
}

function renderModalContent() {
    const modal = DOM.get('productModal');
    if (!modal || !currentProduct) return;
    
    const isFav = favorites.includes(currentProduct.id);
    const quickWeights = CONFIG.QUICK_WEIGHTS.map(w => 
        `<button class="pd-quick-weight ${w === CONFIG.WEIGHT.DEFAULT ? 'active' : ''}" 
                 data-weight="${w}">${w} кг</button>`
    ).join('');
    
    const specsRows = Object.entries(currentProduct.specs)
        .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
    
    const careItems = currentProduct.care.map(item => `<li>${item}</li>`).join('');
    
    DOM.get('modalProductTitle').textContent = currentProduct.name;
    DOM.get('modalProductBody').innerHTML = `
        <div class="pd-grid">
            <div>
                <div class="pd-main-image">
                    <img src="${currentProduct.image}" alt="${currentProduct.name}" id="pdMainImage">
                </div>
                <div class="pd-thumbnails">
                    ${currentProduct.gallery.map((img, i) => 
                        `<div class="pd-thumb ${i === 0 ? 'active' : ''}" data-src="${img}">
                            <img src="${img}" alt="Превью">
                        </div>`
                    ).join('')}
                </div>
            </div>
            <div class="pd-info">
                <span class="pd-category">${currentProduct.categoryName}</span>
                ${currentProduct.badge ? 
                    `<span class="product-badge badge-${currentProduct.badge}" style="position:static;display:inline-block;margin-left:8px;">
                        ${getBadgeText(currentProduct.badge)}
                    </span>` : ''}
                <h2 class="pd-name">${currentProduct.name}</h2>
                <div class="pd-price-block">
                    <span class="pd-price">${currentProduct.price} ₽</span>
                    <span class="pd-price-unit">за 1 кг</span>
                </div>
                <p class="pd-desc">${currentProduct.fullDesc}</p>
                
                <div class="pd-section-title">Выберите вес:</div>
                <div class="pd-quick-weights" id="pdQuickWeights">${quickWeights}</div>
                
                <div class="pd-weight-selector">
                    <span class="pd-weight-label">Вес:</span>
                    <div class="pd-weight-controls">
                        <button class="pd-weight-btn" data-delta="-0.1">−</button>
                        <input type="number" class="pd-weight-value" id="pdWeight" 
                               value="${CONFIG.WEIGHT.DEFAULT}" 
                               min="${CONFIG.WEIGHT.MIN}" max="${CONFIG.WEIGHT.MAX}" step="${CONFIG.WEIGHT.STEP}">
                        <button class="pd-weight-btn" data-delta="0.1">+</button>
                    </div>
                    <span class="pd-weight-unit">кг</span>
                    <span class="pd-weight-total" id="pdWeightTotal">
                        ${formatPrice(currentProduct.price * CONFIG.WEIGHT.DEFAULT)}
                    </span>
                </div>
                
                <div class="pd-actions">
                    <button class="pd-add-btn">Добавить в корзину</button>
                    <button class="pd-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${currentProduct.id}">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                </div>
                
                <div class="pd-features">
                    ${Object.entries(currentProduct.specs).slice(0, 4)
                        .map(([k, v]) => `<div class="pd-feature"><strong>${k}</strong> ${v}</div>`).join('')}
                </div>
                
                <div class="pd-tabs">
                    <div class="pd-tab-headers">
                        <button class="pd-tab-header active" data-tab="specs">Характеристики</button>
                        <button class="pd-tab-header" data-tab="care">Уход</button>
                    </div>
                    <div class="pd-tab-content active" id="tab-specs">
                        <table class="pd-specs-table">${specsRows}</table>
                    </div>
                    <div class="pd-tab-content" id="tab-care">
                        <ul class="pd-care-list">${careItems}</ul>
                    </div>
                </div>
            </div>
        </div>`;
    
    // обработчики внутри модалки
    setupModalHandlers();
}

function setupModalHandlers() {
    const modal = DOM.get('productModal');
    if (!modal) return;
    
    // Переключение изображений
    modal.querySelectorAll('.pd-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            DOM.get('pdMainImage').src = thumb.dataset.src;
            modal.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
    
    // Быстрый выбор веса
    modal.querySelectorAll('.pd-quick-weight').forEach(btn => {
        btn.addEventListener('click', () => {
            const weight = +btn.dataset.weight;
            DOM.get('pdWeight').value = weight;
            modal.querySelectorAll('.pd-quick-weight').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateModalWeightTotal();
        });
    });
    
    // Кнопки +/- веса
    modal.querySelectorAll('.pd-weight-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = DOM.get('pdWeight');
            const delta = +btn.dataset.delta;
            let value = Math.max(
                CONFIG.WEIGHT.MIN, 
                Math.min(CONFIG.WEIGHT.MAX, parseFloat(input.value) + delta)
            );
            input.value = value.toFixed(1);
            modal.querySelectorAll('.pd-quick-weight').forEach(b => b.classList.remove('active'));
            updateModalWeightTotal();
        });
    });
    
    // Input веса
    DOM.get('pdWeight')?.addEventListener('input', updateModalWeightTotal);
    
    // Добавить в корзину
    modal.querySelector('.pd-add-btn')?.addEventListener('click', (e) => {
        if (!currentProduct) return;
        const weight = parseFloat(DOM.get('pdWeight').value) || CONFIG.WEIGHT.DEFAULT;
        addToCart(currentProduct, weight);
        showToast(`${currentProduct.name} (${weight} кг) добавлен`);
        
        const btn = e.target;
        btn.classList.add('added');
        btn.textContent = 'Добавлено!';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.textContent = 'Добавить в корзину';
        }, 1500);
    });
    
    // Избранное
    modal.querySelector('.pd-fav-btn')?.addEventListener('click', (e) => {
        const id = +e.target.dataset.favId;
        toggleFavorite(id, e.target);
    });
    
    // Переключение вкладок
    modal.querySelectorAll('.pd-tab-header').forEach(header => {
        header.addEventListener('click', () => {
            const tab = header.dataset.tab;
            modal.querySelectorAll('.pd-tab-content').forEach(t => t.classList.remove('active'));
            modal.querySelectorAll('.pd-tab-header').forEach(h => h.classList.remove('active'));
            DOM.get('tab-' + tab).classList.add('active');
            header.classList.add('active');
        });
    });
}

function updateModalWeightTotal() {
    if (!currentProduct) return;
    const weight = parseFloat(DOM.get('pdWeight')?.value) || CONFIG.WEIGHT.DEFAULT;
    const total = currentProduct.price * weight;
    if (DOM.get('pdWeightTotal')) {
        DOM.get('pdWeightTotal').textContent = formatPrice(total);
    }
}

// ===== МОДАЛКИ: общие функции =====
function openModal(modalId) {
    const modal = DOM.get(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = DOM.get(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (modalId === 'productModal') currentProduct = null;
    }
}

function closeProductModal() { closeModal('productModal'); }
function closeCheckout() { closeModal('checkoutModal'); }
function closeAuthModal() { closeModal('authModal'); }

// ===== ИЗБРАННОЕ =====
function toggleFavorite(id, btn) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
        btn?.classList.remove('active');
        if (btn) btn.innerHTML = '🤍';
        showToast('Удалено из избранного');
    } else {
        favorites.push(id);
        btn?.classList.add('active');
        if (btn) btn.innerHTML = '❤️';
        showToast('Добавлено в избранное');
    }
    Storage.set(CONFIG.STORAGE.FAVS, favorites);
}

// ===== КОРЗИНА: утилиты =====
function saveCart() { Storage.set(CONFIG.STORAGE.CART, cart); }
function getCartTotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
function getCartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function updateCartUI() {
    const badge = DOM.get('cartBadge');
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
    const overlay = DOM.get('cartOverlay');
    const sidebar = DOM.get('cartSidebar');
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
    const container = DOM.get('cartItems');
    const footer = DOM.get('cartFooter');
    const totalEl = DOM.get('cartTotal');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h3>Корзина пуста</h3>
                <p>Добавьте ткани из каталога</p>
            </div>`;
        if (footer) footer.style.display = 'none';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-image" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" data-qty-id="${item.id}" data-delta="-0.1">−</button>
                    <span class="qty-value">${item.qty.toFixed(1)} кг</span>
                    <button class="qty-btn" data-qty-id="${item.id}" data-delta="0.1">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-remove-id="${item.id}">✕</button>
        </div>
    `).join('');
    
    if (footer) footer.style.display = 'block';
    if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
    
    setupCartHandlers();
}

function setupCartHandlers() {
    // Удаление из корзины
    document.querySelectorAll('[data-remove-id]').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(+btn.dataset.removeId));
    });
    
    // Изменение количества
    document.querySelectorAll('[data-qty-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = +btn.dataset.qtyId;
            const delta = +btn.dataset.delta;
            updateQty(id, delta);
        });
    });
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = formatWeight(item.qty + delta);
        if (item.qty <= 0) {
            removeFromCart(id);
            return;
        }
    }
    saveCart();
    updateCartUI();
    renderCartItems();
}

// ===== ОФОРМЛЕНИЕ ЗАКАЗА =====
function openCheckout() {
    if (cart.length === 0) return;
    toggleCart();
    
    setTimeout(() => {
        const summary = DOM.get('orderSummary');
        if (summary) {
            summary.innerHTML = `
                <h4>Ваш заказ:</h4>
                ${cart.map(item => `
                    <div class="order-summary-item">
                        <span>${item.name} × ${item.qty.toFixed(1)} кг</span>
                        <span>${formatPrice(item.price * item.qty)}</span>
                    </div>
                `).join('')}
                <div class="order-summary-total">
                    <span>Итого:</span>
                    <span>${formatPrice(getCartTotal())}</span>
                </div>
            `;
        }
        openModal('checkoutModal');
    }, 200);
}

function submitOrder(e) {
    e.preventDefault();
    
    const order = {
        customer: {
            name: DOM.get('customerName')?.value,
            phone: DOM.get('customerPhone')?.value,
            email: DOM.get('customerEmail')?.value,
            city: DOM.get('customerCity')?.value,
            address: DOM.get('customerAddress')?.value,
            comment: DOM.get('customerComment')?.value
        },
        items: [...cart],
        total: getCartTotal(),
        id: Date.now(),
        date: new Date().toLocaleString('ru-RU'),
        status: 'new'
    };
    
    const orders = Storage.get(CONFIG.STORAGE.ORDERS, []);
    orders.unshift(order);
    Storage.set(CONFIG.STORAGE.ORDERS, orders);
    
    const body = DOM.get('checkoutBody');
    if (body) {
        body.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h3>Заказ оформлен!</h3>
                <p>Номер заказа: #${order.id.toString().slice(-6)}</p>
                <p style="margin-top:12px;">Мы свяжемся с вами в ближайшее время.</p>
                <button class="btn-primary" style="margin-top:20px;" 
                        onclick="closeCheckout(); location.reload();">Отлично!</button>
            </div>`;
    }
    
    cart = [];
    saveCart();
    updateCartUI();
    showToast('Заказ успешно оформлен!');
}

// ===== АВТОРИЗАЦИЯ АДМИНА =====
function openLoginModal() { openModal('authModal'); }

function handleAdminLogin(event) {
    event.preventDefault();
    const login = DOM.get('loginUsername')?.value;
    const pass = DOM.get('loginPassword')?.value;
    const error = DOM.get('loginError');
    
    if (login === CONFIG.ADMIN.LOGIN && pass === CONFIG.ADMIN.PASS) {
        closeAuthModal();
        window.location.href = 'admin.html';
    } else {
        if (error) {
            error.style.display = 'block';
            error.textContent = 'Неверный логин или пароль';
        } else {
            alert('Неверный логин или пароль');
        }
    }
}

function logoutAdmin() { window.location.href = 'index.html'; }

// ===== АДМИН-ПАНЕЛЬ =====
function renderAdminPanel() {
    const orders = Storage.get(CONFIG.STORAGE.ORDERS, []);
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const newOrders = orders.filter(o => o.status === 'new').length;

    const stats = DOM.get('adminStats');
    if (stats) {
        stats.innerHTML = `
            <div class="admin-stat-card">
                <div class="stat-label">Всего заказов</div>
                <div class="stat-number">${orders.length}</div>
            </div>
            <div class="admin-stat-card">
                <div class="stat-label">Новых</div>
                <div class="stat-number" style="color:var(--success)">${newOrders}</div>
            </div>
            <div class="admin-stat-card">
                <div class="stat-label">Сумма</div>
                <div class="stat-number" style="color:var(--primary)">${formatPrice(totalRevenue)}</div>
            </div>
        `;
    }

    const tbody = DOM.get('ordersBody');
    const noOrders = DOM.get('noOrders');
    const table = DOM.get('ordersTable');
    
    if (!tbody || !table || !noOrders) return;

    if (orders.length === 0) {
        table.style.display = 'none';
        noOrders.style.display = 'block';
    } else {
        table.style.display = '';
        noOrders.style.display = 'none';
        tbody.innerHTML = orders.map(order => {
            const itemsText = order.items.map(i => `${i.name} (${i.qty.toFixed(1)}кг)`).join(', ');
            return `
                <tr>
                    <td><strong>#${order.id.toString().slice(-6)}</strong></td>
                    <td>${order.date}</td>
                    <td>${order.customer.name}</td>
                    <td>${order.customer.phone}</td>
                    <td title="${itemsText}">
                        ${itemsText.length > 25 ? itemsText.slice(0, 25) + '...' : itemsText}
                    </td>
                    <td><strong>${formatPrice(order.total)}</strong></td>
                    <td>
                        <select class="form-input" style="padding:4px 8px;font-size:12px;width:auto;" 
                                onchange="updateOrderStatus(${order.id}, this.value)">
                            <option value="new" ${order.status === 'new' ? 'selected' : ''}>Новый</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>В работе</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Завершён</option>
                        </select>
                    </td>
                    <td>
                        <button class="delete-order-btn" onclick="if(confirm('Удалить заказ?')) deleteOrder(${order.id})">
                            Удалить
                        </button>
                    </td>
                </tr>`;
        }).join('');
    }
}

function updateOrderStatus(id, status) {
    const orders = Storage.get(CONFIG.STORAGE.ORDERS, []);
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        Storage.set(CONFIG.STORAGE.ORDERS, orders);
        showToast('Статус обновлен');
    }
}

function deleteOrder(id) {
    let orders = Storage.get(CONFIG.STORAGE.ORDERS, []);
    orders = orders.filter(o => o.id !== id);
    Storage.set(CONFIG.STORAGE.ORDERS, orders);
    renderAdminPanel();
    showToast('Заказ удалён');
}

function clearAllOrders() {
    if (confirm('Удалить ВСЕ заказы?')) {
        Storage.set(CONFIG.STORAGE.ORDERS, []);
        renderAdminPanel();
        showToast('Все заказы удалены');
    }
}

// ===== УТИЛИТЫ =====
function showToast(message) {
    const container = DOM.get('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), CONFIG.TOAST_DURATION);
}

function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    return digits.replace(/(\d{1,3})(\d{0,3})?(\d{0,2})?(\d{0,2})?/, 
        (match, p1, p2, p3, p4) => {
            let result = '+7';
            if (p1) result += ` (${p1}`;
            if (p2) result += `) ${p2}`;
            if (p3) result += `-${p3}`;
            if (p4) result += `-${p4}`;
            return result;
        });
}

function setupPhoneInput() {
    const phone = DOM.get('customerPhone');
    if (phone) {
        phone.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }
}

// ===== ГЛОБАЛЬНЫЕ ОБРАБОТЧИКИ =====
document.addEventListener('DOMContentLoaded', init);

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
        const sidebar = DOM.get('cartSidebar');
        if (sidebar?.classList.contains('open')) toggleCart();
    }
});
