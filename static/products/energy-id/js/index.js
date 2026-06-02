const PAGE_SIZE = 50;

/* ── URL helpers ───────────────────────────────── */

function getUrlParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    category: p.get('category'),
    page:     Math.max(1, parseInt(p.get('page') || '1', 10)),
  };
}

function pageLink(filters, page) {
  const p = new URLSearchParams();
  if (filters.category) p.set('category', filters.category);
  if (page > 1)         p.set('page', String(page));
  const qs = p.toString();
  return qs ? `?${qs}` : './';
}

function softwareApiUrl(filters, page) {
  const p = new URLSearchParams();
  if (filters.category) p.set('category', filters.category);
  if (page > 1)         p.set('page', String(page));
  return `${API_BASE}/v1/software?${p.toString()}`;
}

/* ── Utilities ─────────────────────────────────── */

function showError(detail) {
  hide('loader-wrapper');
  if (detail) document.getElementById('error-detail').textContent = detail;
  show('error-message');
}

/* ── Card building ─────────────────────────────── */

function buildCard(id, name, imageSrc, categories, created_at) {
  const tags = parseTags(categories);
  const catHtml = tags.length
    ? tags.map(c => `<span class="ui tiny olive label">${escHtml(c)}</span>`).join(' ')
    : '<span class="ui tiny grey label">—</span>';
  const dateStr  = formatDate(created_at);
  const dateHtml = dateStr ? `<div class="card-date"><i class="calendar alternate outline icon"></i>${dateStr}</div>` : '';
  const imgHtml  = imageSrc
    ? `<div class="image sw-card-image"><img src="${escHtml(imageSrc)}" alt="${escHtml(name)}"></div>`
    : '';
  const searchText = [name, categories].join(' ').toLowerCase();
  const detailUrl  = `detail/?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&categories=${encodeURIComponent(categories || '')}`;

  return `
    <div class="ui card" data-searchtext="${escHtml(searchText)}">
      ${imgHtml}
      <div class="content">
        <div class="header">${escHtml(name)}</div>
        ${dateHtml}
        <div class="card-meta">${catHtml}</div>
      </div>
      <div class="extra content">
        <a class="ui basic fluid small button" href="${detailUrl}">
          <i class="list ul icon"></i> View Tasks
        </a>
      </div>
    </div>`;
}

/* ── Pagination ────────────────────────────────── */

function renderPagination(page, totalCount, filters) {
  const el = document.getElementById('pagination-wrapper');
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  const win = 5;
  let lo = Math.max(1, page - Math.floor(win / 2));
  let hi = Math.min(totalPages, lo + win - 1);
  if (hi - lo < win - 1) lo = Math.max(1, hi - win + 1);

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  let html = '<div class="ui pagination menu">';
  html += prevDisabled
    ? `<span class="disabled item"><i class="left chevron icon"></i></span>`
    : `<a class="item" href="${pageLink(filters, page - 1)}"><i class="left chevron icon"></i></a>`;

  if (lo > 1) {
    html += `<a class="item" href="${pageLink(filters, 1)}">1</a>`;
    if (lo > 2) html += `<span class="disabled item">&hellip;</span>`;
  }
  for (let p = lo; p <= hi; p++) {
    html += p === page
      ? `<span class="active item">${p}</span>`
      : `<a class="item" href="${pageLink(filters, p)}">${p}</a>`;
  }
  if (hi < totalPages) {
    if (hi < totalPages - 1) html += `<span class="disabled item">&hellip;</span>`;
    html += `<a class="item" href="${pageLink(filters, totalPages)}">${totalPages}</a>`;
  }

  html += nextDisabled
    ? `<span class="disabled item"><i class="right chevron icon"></i></span>`
    : `<a class="item" href="${pageLink(filters, page + 1)}"><i class="right chevron icon"></i></a>`;
  html += '</div>';
  html += `<p class="pagination-info">${totalCount} total &mdash; page ${page} of ${totalPages}</p>`;
  el.innerHTML = html;
}

/* ── Sidebar ───────────────────────────────────── */

function renderCategorySidebar(categories, filters) {
  const list = document.getElementById('category-list');
  list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', `<a class="item sidebar-all-item${!filters.category ? ' active-cat' : ''}" href="${pageLink({}, 1)}">
    <i class="list icon sidebar-all-icon"></i> All Software
  </a>`);

  categories.forEach(({name, count}) => {
    const isActive = name === filters.category;
    const dimClass = count === 0 ? ' sidebar-item-dim' : '';
    list.insertAdjacentHTML('beforeend', `<a class="item${isActive ? ' active-cat' : ''}${dimClass}" href="${pageLink({category: name}, 1)}">
      ${escHtml(name)}<span class="count-badge">${count}</span>
    </a>`);
  });

  hide('sidebar-loader');
  show('category-sidebar');
}

/* ── Search ────────────────────────────────────── */

function applySearch() {
  const q = (document.getElementById('search-input').value || '').toLowerCase();
  let visible = 0;
  document.querySelectorAll('#cards-grid .card').forEach(card => {
    const matches = !q || (card.getAttribute('data-searchtext') || '').toLowerCase().includes(q);
    card.style.display = matches ? '' : 'none';
    if (matches) visible++;
  });
  document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
}

/* ── Bootstrap ─────────────────────────────────── */

const filters = getUrlParams();

if (filters.category) {
  document.getElementById('hero-category-name').textContent = filters.category;
  show('hero-filter');
}

fetch(softwareApiUrl(filters, filters.page))
  .then(res => {
    if (res.status === 204) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return res.json();
  })
  .then(json => {
    hide('loader-wrapper');
    show('main-grid');

    if (!json || !json.success || !(json.data || []).length) {
      show('empty-message');
      return;
    }

    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
    json.data.forEach(({id, name, image_src, categories, created_at}) => {
      grid.insertAdjacentHTML('beforeend', buildCard(id, name, image_src, categories, created_at));
    });

    if (json.pagination) {
      renderPagination(json.pagination.page, json.pagination.total_count, filters);
    }

    document.getElementById('search-input').addEventListener('input', applySearch);
  })
  .catch(err => showError(err.message || 'Network error — check that the API is reachable.'));

fetch(`${API_BASE}/v1/software/categories`)
  .then(res => (res.ok && res.status !== 204) ? res.json() : null)
  .then(json => {
    if (json?.success && json.data?.length) {
      renderCategorySidebar(json.data, filters);
    } else {
      hide('sidebar-loader');
    }
  })
  .catch(() => hide('sidebar-loader'));
