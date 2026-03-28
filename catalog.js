/**
 * LATINMUNDO — Catálogo
 *
 * CÓMO FUNCIONA LA PERSISTENCIA:
 * Los productos viven aquí, en DEFAULT_PRODUCTS.
 * Para añadir/editar productos permanentemente:
 *   1. Entra al admin (5 clics en el logo)
 *   2. Añade o edita los productos
 *   3. Pulsa "Exportar" → te descarga un JSON
 *   4. Manda el JSON por WhatsApp/email al desarrollador
 *   5. El desarrollador actualiza este archivo y lo publica
 *   → Todos los usuarios del mundo ven los cambios
 *
 * NOTA: Los cambios del admin duran mientras no recargues la página.
 * Para que sean permanentes, usa el flujo de arriba.
 */

// ─────────────────────────────────────────────────────────────
// PRODUCTOS — editar solo desde el admin, luego exportar
// ─────────────────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  {
  id: 1,
  name: "Platanitos con Sal El Dorado 100g",
  tags: ["snack", "plátano", "salado", "Colombia"],
  description: "Platanitos fritos con sal marca El Dorado, bolsa de 100g",
  price: "1.50€",
  badge: "",
  emoji: "🛒",
  image: "https://distribuidoralatinoandina.com/media/2020/05/El-Dorado-Platanitos-Sal-100g.jpg"
},
{
  id: 2,
  name: "Platanitos Sabor Limón El Dorado 100g",
  tags: ["snack", "plátano", "limón", "Colombia"],
  description: "Platanitos fritos sabor limón El Dorado, bolsa de 100g",
  price: "1.50€",
  badge: "",
  emoji: "🛒",
  image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQfUXfefaMjVohJB-6tlrZF3tTCjRdXrTKo04Ydwz5C3BOWXPR36rp3AYkiduKwc88HIZUKuLpf9pzt8gubicyqPkS9qjCQYIqBIj9pAOgtkytIuI5Gg4MSMA"
},
{
  id: 3,
  name: "Platanitos Dulces El Dorado 100g",
  tags: ["snack", "plátano", "dulce", "Colombia"],
  description: "Platanitos fritos dulces El Dorado, bolsa de 100g",
  price: "1.50€",
  badge: "",
  emoji: "🛒",
  image: "https://www.europaenvios.es/wp-content/uploads/2024/10/El-Dorado-Platanitos-Dulces-100g.png"
},
{
  id: 4,
  name: "Platanitos Picantes El Dorado 100g",
  tags: ["snack", "plátano", "picante", "Colombia"],
  description: "Platanitos fritos sabor picante El Dorado, bolsa de 100g",
  price: "1.50€",
  badge: "",
  emoji: "🛒",
  image: "https://distribuidoralatinoandina.com/media/2020/05/El-Dorado-Platanitos-Picantes-100g.jpg"
},
{
  id: 5,
  name: "Platanitos Sabor Chile y Limón El Dorado 100g",
  tags: ["snack", "plátano", "chile", "limón", "Colombia"],
  description: "Platanitos fritos sabor chile y limón El Dorado, bolsa de 100g",
  price: "1.50€",
  badge: "",
  emoji: "🛒",
  image: "https://distribuidoralatinoandina.com/media/2020/05/El-Dorado-Platanitos-Chile-Limon-100g.jpg"
},
{
  id: 6,
  name: "Platanitos con Sal El Dorado 250g",
  tags: ["snack", "plátano", "salado", "Colombia"],
  description: "Platanitos fritos con sal El Dorado, formato familiar 250g",
  price: "2.95€",
  badge: "",
  emoji: "🛒",
  image: "https://distribuidoralatinoandina.com/media/2020/04/PLAT_SAL_250G.png"
},
{
  id: 7,
  name: "Chifles Dulces Maduritos Tortolines 100g",
  tags: ["snack", "chifles", "dulce", "maduro", "Ecuador"],
  description: "Chifles de plátano maduro dulces Tortolines, bolsa de 100g",
  price: "1.65€",
  badge: "",
  emoji: "🛒",
  image: "https://static.carrefour.es/hd_510x_/img_pim_food/762002_00_1.jpg"
},
{
  id: 8,
  name: "Chifles con Ajo Tortolines 100g",
  tags: ["snack", "chifles", "ajo", "Ecuador"],
  description: "Chifles de plátano con sabor a ajo Tortolines, bolsa de 100g",
  price: "1.65€",
  badge: "",
  emoji: "🛒",
  image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQcevWeenDTSKNTDD269e5E5SNtpenSo0zR_WMlhfr56IjTdcSPhZcr9GMkzy9C"
},
{
  id: 9,
  name: "Chifles con Sal Tortolines 100g",
  tags: ["snack", "chifles", "salado", "Ecuador"],
  description: "Chifles de plátano con sal Tortolines, bolsa de 100g",
  price: "1.65€",
  badge: "",
  emoji: "🛒",
  image: "https://www.hiperasia.com/cdn/shop/products/7861006794149.jpg?v=1636187845&width=1200"
},
{
  id: 10,
  name: "Chifles con Sal Tortolines 250g",
  tags: ["snack", "chifles", "salado", "Ecuador"],
  description: "Chifles de plátano con sal Tortolines, formato 250g",
  price: "3.40€",
  badge: "",
  emoji: "🛒",
  image: "https://www.hiperasia.com/cdn/shop/products/7861006796945.jpg?v=1636187847&width=1200"
},
{
  id: 11,
  name: "Chifles Dulces Maduritos Tortolines 250g",
  tags: ["snack", "chifles", "dulce", "maduro", "Ecuador"],
  description: "Chifles de plátano maduro dulces Tortolines, bolsa de 250g",
  price: "3.40€",
  badge: "",
  emoji: "🛒",
  image: "https://latiendona.es/wp-content/uploads/2020/10/167-chifle-madurito-tortolines-250g-1.png"
},
{
  id: 12,
  name: "Chifles Artesanales Tortolines 200g",
  tags: ["snack", "chifles", "artesanal", "Ecuador"],
  description: "Chifles de plátano artesanales Tortolines, bolsa de 200g",
  price: "3.40€",
  badge: "",
  emoji: "🛒",
  image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTGblB-7CV80QMMED91Iws0TXUgomwQqLgF0Qa_fVX06Ph7xp_e6eJgYMsSikSiYeWglv9xBPfuGEY8esaHqDbh90wTdX9NMbbdRgqsAYZmyXho9Gr0BBReF1pR"
},
{
  id: 13,
  name: "Rizadas Sabor Mayonesa 105g",
  tags: ["snack", "patatas", "mayonesa", "Colombia"],
  description: "Papas rizadas sabor mayonesa, bolsa de 105g",
  price: "3.59€",
  badge: "",
  emoji: "🛒",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOPiVBwu3hFW1o6SmnIlNRk-Feed7UV2XPQ&s"
},
{
  id: 14,
  name: "Rizadas Sabor Pollo 105g",
  tags: ["snack", "patatas", "pollo", "Colombia"],
  description: "Papas rizadas sabor pollo, bolsa de 105g",
  price: "3.59€",
  badge: "",
  emoji: "🛒",
  image: "https://labodeguita-i04.mycdn.no/mysimgprod/labodeguita_mystore_no/images/AqelB_PAPAS_RIZADAS_POLLO_105g_1.png/w665h637.png"
},
{
  id: 15,
  name: "Rizadas Sabor Limón 105g",
  tags: ["snack", "patatas", "limón", "Colombia"],
  description: "Papas rizadas sabor limón, bolsa de 105g",
  price: "3.59€",
  badge: "",
  emoji: "🛒",
  image: "https://http2.mlstatic.com/D_Q_NP_2X_702753-MLA107184127343_022026-P.webp"
},
{
  id: 16,
  name: "Pony Malta 330ml lata",
  tags: ["bebida", "malta", "lata"],
  description: "Bebida malteada",
  price: "1.29€",
  badge: "oferta",
  emoji: "🛒",
  image: "https://americanmarket.es/wp-content/uploads/2023/07/BE026_l-500x500-1.jpg"
},
{
  id: 17,
  name: "Flor de Jamaica 100g",
  tags: ["flor","infusión"],
  description: "Flor para infusiones",
  price: "1.99€",
  badge: "",
  emoji: "🛒",
  image: "https://static8.depositphotos.com/1526816/999/v/450/depositphotos_9994393-stock-illustration-flower.jpg"
},
{
  id: 18,
  name: "ChocoRamo",
  tags: ["chocolate", "bizcocho",],
  description: "ChocoRamo, esponjoso bizcoho recubierto de chocolate",
  price: "1.49€",
  badge: "Agotado",
  emoji: "🛒",
  image: "https://lacasadejack.com/cdn/shop/files/chocoramo-20x65gsweets-5983325_1200x.jpg?v=1773702613"
},
{
  id: 19,
  name: "Pony Malta 330ml Cristal",
  tags: ["bebida", "malta", "cristal"],
  description: "Bebida malteada",
  price: "1.49€",
  badge: "",
  emoji: "🛒",
  image: "https://tiendaonlineintertropico.com/img/p/1/3/6/6/1366-large_default.jpg"
},  
{
    id: 20,
    name: "Choclitos Limón Intenso 210g",
    tags: ["snack", "maíz", "limón", "colombia"],
    description: "Snacks de maíz crujientes con sabor a limón intenso, bolsa de 210g.",
    price: "3.99€",
    badge: "",
    emoji: "🌽",
    image: "https://productimages.etrusted.com/products/prt-8ba930ad-86d1-5b25-e6e9-0ba1b9925841/24/original.jpeg"
  },
  {
    id: 21,
    name: "Choclitos Limón Intenso 27g",
    tags: ["snack", "maíz", "limón", "monodosis", "colombia"],
    description: "Snacks de maíz sabor limón intenso en formato individual de 27g.",
    price: "0.89€",
    badge: "",
    emoji: "🌽",
    image: "https://perustocks.es/images/articles/1136_perustocks.com_1.jpg"
  },
  {
    id: 22,
    name: "Choclitos Limón América 150g",
    tags: ["snack", "maíz", "limón", "colombia"],
    description: "Choclitos de maíz sabor limón América en bolsa de 150g.",
    price: "1.69€",
    badge: "",
    emoji: "🌽",
    image: "https://perustocks.es//images/articles/2420_perustocks.com_1.jpg"
  },
  {
    id: 23,
    name: "Popetas con Caramelo 165g",
    tags: ["snack", "palomitas", "caramelo", "colombia"],
    description: "Palomitas de maíz recubiertas de caramelo, dulces y crujientes.",
    price: "2.95€",
    badge: "",
    emoji: "🍿",
    image: "https://mandalomarket.com/wp-content/uploads/2023/11/popetas-caramelo-800x800.jpeg"
  },
  {
    id: 24,
    name: "Tilapia Roja Congelada",
    tags: ["congelado", "pescado", "tilapia", "colombia"],
    description: "Tilapia roja congelada vendida al kilo, ideal para horno o fritura.",
    price: "7.49€/kg",
    badge: "",
    emoji: "🐟",
    image: "https://distribuidoralatinoandina.com/media/2020/05/Red-Tilapia.jpg"
  },
  {
    id: 25,
    name: "De Todito Mix 165g",
    tags: ["snack", "mezcla", "salado", "colombia"],
    description: "Mezcla de snacks salados De Todito en bolsa de 165g.",
    price: "4.70€",
    badge: "",
    emoji: "🛒",
    image: "https://mandalomarket.com/wp-content/uploads/2025/11/Fotos-de-producto-GUIAS-29-800x800.jpg"
  },
  {
    id: 26,
    name: "De Todito Limón 165g",
    tags: ["snack", "mezcla", "limón", "colombia"],
    description: "Mezcla de snacks De Todito con sabor a limón en bolsa de 165g.",
    price: "4.70€",
    badge: "",
    emoji: "🍋",
    image: "https://mercacentro.vtexassets.com/arquivos/ids/169510-800-auto?v=638944211308270000&width=800&height=auto&aspect=true"
  },
  {
    id: 27,
    name: "De Todito Natural 45g",
    tags: ["snack", "mezcla", "salado", "monodosis", "colombia"],
    description: "Mezcla de snacks De Todito sabor natural en formato 45g.",
    price: "1.99€",
    badge: "",
    emoji: "🛒",
    image: "https://mercalatino.com/files/product_images/2024/08/29/IMG_0456.JPG"
  },
  {
    id: 28,
    name: "Cheese Tris Bolsaza 120g",
    tags: ["snack", "maíz", "queso", "colombia"],
    description: "Snacks de maíz sabor queso Cheese Tris en bolsa de 120g.",
    price: "2.79€",
    badge: "",
    emoji: "🧀",
    image: "https://caprichoslatinos.com/wp-content/uploads/2025/10/Cheese-tris-120g.webp"
  },
  {
    id: 29,
    name: "Margarita Ondulada Mayonesa 105g",
    tags: ["snack", "patatas-fritas", "mayonesa", "colombia"],
    description: "Patatas onduladas Margarita sabor mayonesa en bolsa de 105g.",
    price: "3.99€",
    badge: "",
    emoji: "🥔",
    image: "https://mercalatino.com/files/product_images/2025/07/22/IMG_1307.jpg"
  },
  {
    id: 30,
    name: "Margarita Pollo 105g",
    tags: ["snack", "patatas-fritas", "pollo", "colombia"],
    description: "Patatas fritas Margarita sabor pollo, muy crujientes.",
    price: "3.99€",
    badge: "",
    emoji: "🥔",
    image: "https://mandalomarket.com/wp-content/uploads/2021/01/Papas_Onduladas_Sabor_Pollo_105_gr_Margarita_7702189053770_Mandalo_Spain.jpg"
  },
  {
    id: 31,
    name: "Margarita Limón 105g",
    tags: ["snack", "patatas-fritas", "limón", "colombia"],
    description: "Patatas fritas Margarita con sabor a limón en bolsa de 105g.",
    price: "3.99€",
    badge: "",
    emoji: "🍋",
    image: "https://shop.sabormex.es/cdn/shop/files/2957747671_1024x1024@2x.jpg?v=1734607397"
  },
  {
    id: 32,
    name: "Snacky Caramelo Colombina 50g",
    tags: ["snack", "cereal", "caramelo", "colombia"],
    description: "Bocaditos dulces Snacky Colombina sabor caramelo en bolsa de 50g.",
    price: "1.30€",
    badge: "",
    emoji: "🍬",
    image: "https://mercalatino.com/files/product_images/2025/01/13/IMG_0930.jpg"
  }
];

// ── Estado (en memoria — permanente en código, temporal en sesión) ──
let _products = DEFAULT_PRODUCTS.map(p => ({...p}));
let _activeTag = null;
let _searchQuery = '';
let _sortBy = 'default';
let _themeDark = matchMedia('(prefers-color-scheme: dark)').matches;

function loadProducts() { return _products; }
function saveProducts(p) { _products = p; }
function getNextId(arr) { return arr.length > 0 ? Math.max(...arr.map(p => p.id)) + 1 : 1; }

// ── DOM helpers ────────────────────────────────────────────
function el(id) { return document.getElementById(id); }
function qs(sel, ctx = document) { return ctx.querySelector(sel); }

// ── Tags ───────────────────────────────────────────────────
function getAllTags() {
  const set = new Set();
  _products.forEach(p => (p.tags || []).forEach(t => set.add(t)));
  return [...set].sort();
}

function renderTagCloud() {
  const wrap = el('tag-cloud');
  if (!wrap) return;
  wrap.innerHTML = getAllTags().map(tag =>
    `<button class="tag-chip${_activeTag === tag ? ' active' : ''}" onclick="setActiveTag('${tag.replace(/'/g,"\\'")}')">
      ${tag}
    </button>`
  ).join('');
}

function setActiveTag(tag) {
  _activeTag = (_activeTag === tag) ? null : tag;
  const input = el('search-input');
  if (input) { input.value = _activeTag || ''; _searchQuery = _activeTag || ''; }
  renderTagCloud();
  renderProducts();
}

function clearSearch() {
  _activeTag = null; _searchQuery = '';
  const input = el('search-input');
  if (input) input.value = '';
  renderTagCloud();
  renderProducts();
}

// ── Renderizar catálogo ────────────────────────────────────
function renderProducts() {
  const grid = el('products-grid');
  const countEl = el('products-count');
  if (!grid) return;

  const q = _searchQuery.toLowerCase().trim();
  let filtered = _products.filter(p => {
    if (!q) return true;
    return p.name.toLowerCase().includes(q)
      || (p.description || '').toLowerCase().includes(q)
      || (p.tags || []).some(t => t.toLowerCase().includes(q));
  });

  if (_sortBy === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (_sortBy === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

  if (countEl) countEl.textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="products-empty">
      <div class="empty-icon">🔍</div>
      <h3>Sin resultados para "${q}"</h3>
      <p>Prueba con otro término o <button onclick="clearSearch()" class="link-btn">borra el filtro</button>.</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(productCardHTML).join('');
  animateCards();
}

// ── Card HTML ──────────────────────────────────────────────
function productCardHTML(p) {
  const priceHTML = p.price
    ? `<span class="product-price">${p.price}</span>`
    : `<span class="product-price no-price">Consultar precio</span>`;

  const imgHTML = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<div class="product-img-placeholder"><span class="card-emoji">${p.emoji || '🛒'}</span></div>`;

  const tagsHTML = (p.tags || []).slice(0, 3).map(t =>
    `<button class="tag-chip tag-chip-sm${_activeTag === t ? ' active' : ''}" onclick="setActiveTag('${t.replace(/'/g,"\\'")}')">
      ${t}
    </button>`
  ).join('');

  const badgeMap = {popular:'Popular',nuevo:'Nuevo',premium:'Premium',fresco:'Fresco',oferta:'Oferta'};
  const badgeHTML = p.badge
    ? `<span class="product-badge badge-${p.badge}">${badgeMap[p.badge] || p.badge}</span>`
    : '';

  const igDM = 'https://www.instagram.com/latinmundo_oficial/';

  return `<article class="product-card" data-id="${p.id}">
    <div class="product-img-wrap">
      ${imgHTML}
      ${badgeHTML}
      <div class="card-overlay">
        <a href="${igDM}" target="_blank" rel="noopener" class="overlay-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          +Info
        </a>
      </div>
    </div>
    <div class="product-body">
      <div class="product-tags">${tagsHTML}</div>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.description || 'Producto disponible en tienda.'}</p>
      <div class="product-footer">
        ${priceHTML}
        <a href="${igDM}" target="_blank" rel="noopener" class="btn-ask">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          +Info
        </a>
      </div>
    </div>
  </article>`;
}

// ── Animación de entrada ───────────────────────────────────
let _obs = null;
function animateCards() {
  if (_obs) _obs.disconnect();
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(c => { c.style.opacity='0'; c.style.transform='translateY(24px)'; c.style.transition='none'; });
  _obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const c = entry.target;
      const d = parseInt(c.dataset.animDelay || 0);
      setTimeout(() => {
        c.style.transition = 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)';
        c.style.opacity = '1'; c.style.transform = 'translateY(0)';
      }, d);
      _obs.unobserve(c);
    });
  }, { threshold: 0.08 });
  cards.forEach((c, i) => { c.dataset.animDelay = Math.min(i % 4, 3) * 60; _obs.observe(c); });
}

// ── Búsqueda ───────────────────────────────────────────────
function initSearch() {
  const input = el('search-input');
  if (!input) return;
  input.addEventListener('input', e => {
    _searchQuery = e.target.value.trim(); _activeTag = null;
    renderTagCloud(); renderProducts();
  });
  input.addEventListener('keydown', e => { if (e.key === 'Escape') { clearSearch(); input.blur(); } });
}

// ── Ordenar ────────────────────────────────────────────────
function initSort() {
  const select = el('sort-select');
  if (!select) return;
  select.addEventListener('change', e => { _sortBy = e.target.value; renderProducts(); });
}

// ── Tema oscuro ────────────────────────────────────────────
function initTheme() {
  const root = document.documentElement;
  root.setAttribute('data-theme', _themeDark ? 'dark' : 'light');
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    updateToggleIcon(btn, _themeDark);
    btn.addEventListener('click', () => {
      _themeDark = !_themeDark;
      root.setAttribute('data-theme', _themeDark ? 'dark' : 'light');
      document.querySelectorAll('[data-theme-toggle]').forEach(b => updateToggleIcon(b, _themeDark));
    });
  });
}
function updateToggleIcon(btn, dark) {
  if (!btn) return;
  btn.innerHTML = dark
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  btn.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

// ── Menú móvil ─────────────────────────────────────────────
function initMobileMenu() {
  const btn = el('mobile-menu-btn');
  const nav = el('main-nav');
  if (!btn || !nav) return;
  const iconBurger = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  const iconClose  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = nav.classList.toggle('open');
    btn.innerHTML = open ? iconClose : iconBurger;
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.innerHTML = iconBurger;
      btn.setAttribute('aria-expanded', false);
    }
  });
}

// ── Toast ──────────────────────────────────────────────────
function showToast(msg) {
  const t = el('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Routing ────────────────────────────────────────────────
function showView(view) {
  const catalog = el('view-catalog');
  const admin   = el('view-admin');
  if (!catalog || !admin) return;
  if (view === 'admin') {
    catalog.style.display = 'none';
    admin.style.display = 'block';
    if (typeof initAdminView === 'function') initAdminView();
  } else {
    admin.style.display = 'none';
    catalog.style.display = 'block';
    renderTagCloud(); renderProducts();
  }
}

// ── Acceso secreto admin (5 clics en el logo) ─────────────
function initSecretAdminAccess() {
  let n = 0, t = null;
  document.querySelectorAll('#view-catalog .logo').forEach(logo => {
    logo.addEventListener('click', () => {
      n++; clearTimeout(t);
      if (n >= 5) { n = 0; showView('admin'); return; }
      t = setTimeout(() => { n = 0; }, 1500);
    });
  });
}

// ── Hero parallax ──────────────────────────────────────────
function initHeroParallax() {
  const pattern = document.querySelector('.hero-pattern');
  if (!pattern) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { pattern.style.transform = `translateY(${window.scrollY * 0.3}px)`; ticking = false; });
      ticking = true;
    }
  }, { passive: true });
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  initSort();
  initMobileMenu();
  initHeroParallax();
  initSecretAdminAccess();
  renderTagCloud();
  renderProducts();
});
