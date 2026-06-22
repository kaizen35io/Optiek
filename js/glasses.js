const products = [
  {
    id: 1,
    name: 'Eclipse Aviator',
    brand: 'Ray-Ban',
    category: 'sunglasses',
    gender: 'unisex',
    material: 'metal',
    style: 'full-rim',
    price: '$185',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop',
    badge: 'bestseller'
  },
  {
    id: 2,
    name: 'Nordic Round',
    brand: 'Moscot',
    category: 'glasses',
    gender: 'men',
    material: 'acetate',
    style: 'half-rim',
    price: '$220',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop',
    badge: 'new'
  },
  {
    id: 3,
    name: 'Vanguard Shield',
    brand: 'Oakley',
    category: 'sunglasses',
    gender: 'unisex',
    material: 'titanium',
    style: 'rimless',
    price: '$195',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=400&auto=format&fit=crop',
    badge: ''
  },
  {
    id: 4,
    name: 'Heritage Classic',
    brand: 'Warby Parker',
    category: 'glasses',
    gender: 'women',
    material: 'acetate',
    style: 'full-rim',
    price: '$145',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=400&auto=format&fit=crop',
    badge: ''
  },
  {
    id: 5,
    name: 'Apex Sport',
    brand: 'Nike',
    category: 'sunglasses',
    gender: 'men',
    material: 'plastic',
    style: 'full-rim',
    price: '$165',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop',
    badge: ''
  },
  {
    id: 6,
    name: 'Luna Thin',
    brand: 'SILHOUETTE',
    category: 'glasses',
    gender: 'women',
    material: 'titanium',
    style: 'rimless',
    price: '$275',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=400&auto=format&fit=crop',
    badge: 'new'
  },
  {
    id: 7,
    name: 'Juniper Kids',
    brand: 'Ray-Ban',
    category: 'glasses',
    gender: 'kids',
    material: 'plastic',
    style: 'full-rim',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop',
    badge: ''
  },
  {
    id: 8,
    name: 'Zen Unisex',
    brand: 'Moscot',
    category: 'glasses',
    gender: 'unisex',
    material: 'acetate',
    style: 'half-rim',
    price: '$210',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop',
    badge: ''
  },
  {
    id: 9,
    name: 'Storm Shield',
    brand: 'Oakley',
    category: 'sunglasses',
    gender: 'men',
    material: 'metal',
    style: 'full-rim',
    price: '$175',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=400&auto=format&fit=crop',
    badge: 'bestseller'
  },
  {
    id: 10,
    name: 'Petal Frame',
    brand: 'Warby Parker',
    category: 'glasses',
    gender: 'women',
    material: 'acetate',
    style: 'full-rim',
    price: '$155',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=400&auto=format&fit=crop',
    badge: ''
  },
  {
    id: 11,
    name: 'Mini Explorer',
    brand: 'Nike',
    category: 'sunglasses',
    gender: 'kids',
    material: 'plastic',
    style: 'full-rim',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=400&auto=format&fit=crop',
    badge: 'new'
  },
  {
    id: 12,
    name: 'Eclipse Unisex',
    brand: 'SILHOUETTE',
    category: 'glasses',
    gender: 'unisex',
    material: 'titanium',
    style: 'rimless',
    price: '$245',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop',
    badge: ''
  }
];

// ===== FILTER STATE =====
const filters = {
  category: 'all',
  gender: 'all',
  material: 'all',
  style: 'all'
};

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('resultCount');
  const noResults = document.getElementById('noResults');

  const filtered = products.filter(p => {
    return (
      (filters.category === 'all' || p.category === filters.category) &&
      (filters.gender === 'all' || p.gender === filters.gender) &&
      (filters.material === 'all' || p.material === filters.material) &&
      (filters.style === 'all' || p.style === filters.style)
    );
  });

  count.textContent = `Showing ${filtered.length} products`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  grid.innerHTML = filtered.map(p => `
    <div class="product-item fade">
      <div class="image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="badge ${p.badge}">${p.badge}</span>` : ''}
      </div>
      <div class="info">
        <div class="brand">${p.brand}</div>
        <h4>${p.name}</h4>
        <div class="meta">
          <span>${p.gender}</span>
          <span>${p.material}</span>
          <span>${p.style}</span>
        </div>
        <div class="price-row">
          <span class="price">${p.price}</span>
          <span class="shipping">✦ Free Shipping</span>
        </div>
      </div>
    </div>
  `).join('');

  // Re-apply fade animations
  document.querySelectorAll('.product-item.fade').forEach(el => {
    setTimeout(() => el.classList.add('active'), 50);
  });
}

// ===== SETUP FILTERS =====
document.querySelectorAll('.filter-group .options').forEach(group => {
  const filterKey = group.dataset.filter;
  const buttons = group.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filters[filterKey] = this.dataset.value;
      renderProducts();
    });
  });
});

// ===== VIEW TOGGLE =====
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const grid = document.getElementById('productGrid');
    if (this.dataset.view === 'list') {
      grid.style.gridTemplateColumns = '1fr';
    } else {
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(260px, 1fr))';
    }
  });
});

// ===== INIT =====
renderProducts();
console.log('👓 Optiek Marisa — Glasses page loaded');
