/**
 * SUPERMUNDO — Admin v3
 * Panel lateral deslizante. Comparte _products con catalog.js (mismo contexto JS).
 * Acceso vía hash #admin + contraseña.
 */

const ADMIN_PASSWORD = 'supermundo2024';
let _adminAuthed = false;
let _drawerProductId = null;
let _currentTags = [];
let _adminSearch = '';
let _adminInited = false;

// ── Auth ───────────────────────────────────────────────────
function adminLogin(pw) {
  if (pw === ADMIN_PASSWORD) { _adminAuthed = true; return true; }
  return false;
}
function adminLogout() {
  _adminAuthed = false;
  showView('catalog');
}

// ── Inicialización (se llama la primera vez que se muestra la vista) ──
function initAdminView() {
  if (_adminInited) {
    // Ya inicializado: solo refrescar la lista
    if (_adminAuthed) { showAdminPanel(); } else { showAdminLogin(); }
    return;
  }
  _adminInited = true;

  // Login form
  el('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (adminLogin(el('login-password').value)) {
      showAdminPanel();
    } else {
      const err = el('login-error');
      if (err) { err.style.display = 'block'; err.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.'; }
      el('login-password').value = '';
      el('login-password').focus();
    }
  });

  // Product form
  el('product-form')?.addEventListener('submit', saveProduct);

  // Emoji preview
  el('field-emoji')?.addEventListener('input', e => updateEmojiPreview(e.target.value));

  // Image URL preview (debounced)
  let imgTimer;
  el('field-image')?.addEventListener('input', e => {
    clearTimeout(imgTimer);
    imgTimer = setTimeout(() => updateImagePreview(e.target.value.trim()), 600);
  });

  // Búsqueda admin
  el('admin-search')?.addEventListener('input', e => {
    _adminSearch = e.target.value.trim();
    renderProductList();
  });

  // Escape cierra drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const drawer = el('admin-drawer');
      if (drawer && !drawer.classList.contains('hidden')) closeDrawer();
    }
  });

  // Mostrar panel o login
  if (_adminAuthed) { showAdminPanel(); } else { showAdminLogin(); }
}

function showAdminLogin() {
  el('admin-login-screen').style.display = 'flex';
  el('admin-main-panel').style.display = 'none';
}

function showAdminPanel() {
  el('admin-login-screen').style.display = 'none';
  el('admin-main-panel').style.display = 'flex';
  renderProductList();
}

// ── Lista de productos ─────────────────────────────────────
function renderProductList() {
  const container = el('admin-product-list');
  const countEl = el('toolbar-count');
  if (!container) return;

  const q = _adminSearch.toLowerCase();
  const list = loadProducts().filter(p => {
    if (!q) return true;
    return p.name.toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
      (p.description || '').toLowerCase().includes(q);
  });

  if (countEl) countEl.textContent = `${list.length} producto${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    container.innerHTML = `<div class="list-empty">
      <div class="list-empty-icon">📦</div>
      <h3>Sin productos</h3>
      <p>Pulsa "Nuevo Producto" para añadir el primero.</p>
    </div>`;
    return;
  }

  container.innerHTML = list.map(p => {
    const isSelected = _drawerProductId === p.id;
    const badgeLabels = {popular:'Popular',nuevo:'Nuevo',premium:'Premium',fresco:'Fresco',oferta:'Oferta'};
    const badgeClass = p.badge === 'oferta' ? 'offer' : 'new';
    const priceHTML = p.price
      ? `<span class="product-row-price">${p.price}</span>`
      : `<span class="product-row-price no-price">Sin precio</span>`;

    let thumbHTML;
    if (p.image) {
      thumbHTML = `<div class="product-row-emoji"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>`;
    } else {
      thumbHTML = `<div class="product-row-emoji">${p.emoji || '🛒'}</div>`;
    }

    const tagsHTML = (p.tags || []).slice(0, 4).map(t =>
      `<span class="product-row-tag">${t}</span>`
    ).join('');

    return `<div class="product-row${isSelected ? ' selected' : ''}" onclick="openDrawer(${p.id})" data-id="${p.id}">
      ${thumbHTML}
      <div class="product-row-info">
        <div class="product-row-name">${p.name}</div>
        <div class="product-row-tags">${tagsHTML}${(p.tags||[]).length > 4 ? `<span class="product-row-tag">+${(p.tags||[]).length - 4}</span>` : ''}</div>
      </div>
      ${p.badge ? `<span class="product-row-badge ${badgeClass}">${badgeLabels[p.badge] || p.badge}</span>` : ''}
      ${priceHTML}
      <button class="product-row-delete" onclick="deleteProduct(event, ${p.id})" aria-label="Eliminar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </div>`;
  }).join('');
}

// ── Drawer ─────────────────────────────────────────────────
function openDrawer(productId) {
  _drawerProductId = productId;
  const drawer = el('admin-drawer');
  const backdrop = el('drawer-backdrop');

  drawer.classList.remove('hidden');
  if (backdrop) backdrop.classList.add('visible');

  if (productId === null) {
    el('drawer-title').textContent = 'Nuevo Producto';
    el('drawer-subtitle').textContent = 'Rellena los campos y guarda';
    el('product-id').value = '';
    el('field-name').value = '';
    el('field-description').value = '';
    el('field-price').value = '';
    el('field-badge').value = '';
    el('field-emoji').value = '';
    el('field-image').value = '';
    _currentTags = [];
    updateEmojiPreview('');
    updateImagePreview('');
  } else {
    const p = loadProducts().find(x => x.id === productId);
    if (!p) return;
    el('drawer-title').textContent = 'Editar Producto';
    el('drawer-subtitle').textContent = p.name;
    el('product-id').value = p.id;
    el('field-name').value = p.name;
    el('field-description').value = p.description || '';
    el('field-price').value = p.price || '';
    el('field-badge').value = p.badge || '';
    el('field-emoji').value = p.emoji || '';
    el('field-image').value = p.image || '';
    _currentTags = [...(p.tags || [])];
    updateEmojiPreview(p.emoji || '');
    updateImagePreview(p.image || '');
  }

  renderTagChips();
  renderProductList();
  const body = el('admin-drawer').querySelector('.drawer-body');
  if (body) body.scrollTop = 0;
  setTimeout(() => el('field-name')?.focus(), 100);
}

function closeDrawer() {
  _drawerProductId = null;
  el('admin-drawer').classList.add('hidden');
  const backdrop = el('drawer-backdrop');
  if (backdrop) backdrop.classList.remove('visible');
  renderProductList();
}

// ── Tag chips ──────────────────────────────────────────────
function renderTagChips() {
  const wrap = el('tag-input-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  _currentTags.forEach((tag, i) => {
    const chip = document.createElement('span');
    chip.className = 'tag-chip-editable';
    chip.innerHTML = `${tag}<button type="button" onclick="removeTag(${i})" aria-label="Quitar ${tag}">×</button>`;
    wrap.appendChild(chip);
  });
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'tag-real-input';
  input.className = 'tag-real-input field-input';
  input.placeholder = _currentTags.length === 0 ? 'Ej: conservas, colombiana, fresco...' : 'Añadir...';
  input.autocomplete = 'off';
  input.addEventListener('keydown', onTagKeydown);
  input.addEventListener('blur', onTagBlur);
  wrap.appendChild(input);
}

function focusTagInput() { el('tag-real-input')?.focus(); }

function onTagKeydown(e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTagFromInput(e.target);
  } else if (e.key === 'Backspace' && e.target.value === '' && _currentTags.length > 0) {
    _currentTags.pop();
    renderTagChips();
  }
}

function onTagBlur(e) {
  if (e.target.value.trim()) addTagFromInput(e.target);
}

function addTagFromInput(input) {
  const val = input.value.trim().toLowerCase().replace(/,/g, '');
  if (val && !_currentTags.includes(val)) _currentTags.push(val);
  input.value = '';
  renderTagChips();
  setTimeout(() => el('tag-real-input')?.focus(), 0);
}

function removeTag(index) {
  _currentTags.splice(index, 1);
  renderTagChips();
}

// ── Previsualización emoji e imagen ────────────────────────
function updateEmojiPreview(val) {
  const box = el('emoji-preview-box');
  if (!box) return;
  box.textContent = val || '🛒';
}

function updateImagePreview(url) {
  const wrap = el('image-preview');
  if (!wrap) return;
  if (url) {
    wrap.innerHTML = `<img src="${url}" alt="Vista previa" onerror="this.parentElement.innerHTML='<div class=\\'image-preview-placeholder\\'><svg width=\\'32\\' height=\\'32\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><polyline points=\\'21 15 16 10 5 21\\'/></svg><span>Error al cargar imagen</span></div>'">`;
  } else {
    wrap.innerHTML = `<div class="image-preview-placeholder">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <span>Sin imagen</span>
    </div>`;
  }
}

// ── Guardar producto ──────────────────────────────────────
function saveProduct(e) {
  e.preventDefault();
  const name = el('field-name').value.trim();
  if (!name) { el('field-name').focus(); return; }

  const tagInput = el('tag-real-input');
  if (tagInput && tagInput.value.trim()) {
    const val = tagInput.value.trim().toLowerCase().replace(/,/g, '');
    if (val && !_currentTags.includes(val)) _currentTags.push(val);
    tagInput.value = '';
  }

  const productData = {
    name,
    tags: [..._currentTags],
    description: el('field-description').value.trim(),
    price: el('field-price').value.trim(),
    badge: el('field-badge').value,
    emoji: el('field-emoji').value.trim() || '🛒',
    image: el('field-image').value.trim()
  };

  const products = loadProducts();
  const idVal = el('product-id').value;

  if (idVal) {
    const idx = products.findIndex(p => p.id === parseInt(idVal));
    if (idx !== -1) { products[idx] = { ...products[idx], ...productData }; showAdminToast('✓ Producto actualizado'); }
  } else {
    products.push({ id: getNextId(products), ...productData });
    showAdminToast('✓ Producto añadido');
  }

  saveProducts(products);
  closeDrawer();
  renderProductList();
}

// ── Diálogo propio (confirm() bloqueado en iframes) ──────
function showConfirm(msg, onConfirm) {
  document.getElementById('custom-confirm')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'custom-confirm';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;';
  overlay.innerHTML = `
    <div style="background:var(--color-surface);border-radius:var(--radius-xl);padding:2rem;max-width:360px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,0.4);">
      <p style="font-size:var(--text-base);color:var(--color-text);margin-bottom:1.5rem;line-height:1.5;">${msg}</p>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button id="confirm-cancel" style="padding:0.5rem 1.25rem;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:transparent;color:var(--color-text-muted);cursor:pointer;font-size:var(--text-sm);">Cancelar</button>
        <button id="confirm-ok" style="padding:0.5rem 1.25rem;border-radius:var(--radius-lg);border:none;background:#dc2626;color:#fff;cursor:pointer;font-size:var(--text-sm);font-weight:600;">Eliminar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.querySelector('#confirm-cancel').addEventListener('click', close);
  overlay.querySelector('#confirm-ok').addEventListener('click', () => { close(); onConfirm(); });
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
}

// ── Eliminar ───────────────────────────────────────────────
function deleteProduct(e, id) {
  e.stopPropagation();
  showConfirm('¿Eliminar este producto del catálogo?', () => {
    if (_drawerProductId === id) closeDrawer();
    saveProducts(loadProducts().filter(p => p.id !== id));
    renderProductList();
    showAdminToast('Producto eliminado');
  });
}

// ── Restaurar / Exportar / Importar ───────────────────────
function resetProducts() {
  showConfirm('¿Restaurar todos los productos al estado inicial? Se perderán los cambios de esta sesión.', () => {
    saveProducts(DEFAULT_PRODUCTS.map(p => ({...p})));
    closeDrawer();
    renderProductList();
    showAdminToast('Productos restaurados');
  });
}

function exportProducts() {
  // Exporta el JSON — mándaselo al desarrollador para publicarlo
  const data = JSON.stringify(loadProducts(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'latinmundo-productos.json'; a.click();
  URL.revokeObjectURL(url);
  showAdminToast('✓ Exportado — envía el archivo para publicar los cambios');
}

function importProducts(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const data = JSON.parse(evt.target.result);
      if (Array.isArray(data)) {
        saveProducts(data);
        closeDrawer();
        renderProductList();
        showAdminToast(`✓ ${data.length} productos importados`);
      } else { alert('Formato incorrecto.'); }
    } catch { alert('Error al leer el archivo JSON.'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ── Toast admin ────────────────────────────────────────────
function showAdminToast(msg) {
  const toast = el('admin-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Exportar catalog.js completo con productos actuales ────
function exportCatalogJS() {
  // Leer el archivo catalog.js actual y reemplazar solo DEFAULT_PRODUCTS
  const products = loadProducts();
  const productsJSON = JSON.stringify(products, null, 2)
    .replace(/^/gm, '  ')  // indentar
    .trim();

  // Generar el bloque de datos
  const blob = new Blob([
    '// LATINMUNDO — catalog.js generado desde admin el ' + new Date().toLocaleString('es-ES') + '\n' +
    '// Reemplaza el archivo js/catalog.js con este para guardar los cambios.\n' +
    '// ─────────────────────────────────────────────────\n\n' +
    '/** @preserve DEFAULT_PRODUCTS_START */\n' +
    'const _EXPORTED_PRODUCTS = ' + JSON.stringify(products, null, 2) + ';\n' +
    '/** @preserve DEFAULT_PRODUCTS_END */\n\n' +
    '// Instrucciones:\n' +
    '// 1. Envía este archivo al desarrollador\n' +
    '// 2. El desarrollador lo sube al servidor como js/products-data.json\n' +
    '// 3. Los cambios quedan permanentes\n'
  ], { type: 'application/javascript' });

  // También exportar como JSON simple para uso fácil
  const jsonBlob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'latinmundo-productos.json';
  a.click();
  URL.revokeObjectURL(url);
  showAdminToast('✓ Productos exportados — envía el archivo al soporte para hacerlos permanentes');
}
