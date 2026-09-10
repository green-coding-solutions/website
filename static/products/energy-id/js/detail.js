const urlParams    = new URLSearchParams(window.location.search);
const softwareId   = urlParams.get('id');
const swName       = urlParams.get('name') || '';
const swCategories = urlParams.get('categories') || '';

/* ── Utilities ─────────────────────────────────── */

function showError(msg) {
  hide('loader-wrapper');
  if (msg) document.getElementById('error-detail').textContent = msg;
  show('error-message');
}

/* ── Metric badges ─────────────────────────────── */

// Single source of truth for which phase_metrics key feeds which badge
// (CPU Energy, Machine Energy, Duration, Custom) in renderCardMetrics() below,
// and which keys are exposed to the GMT compare table via badgeMetricKeys().
function classifyMetric(name) {
  if (name === 'cpu_energy_rapl_msr_component') return 'cpu';
  if (name.startsWith('psu_energy') && name.endsWith('_machine')) return 'machine';
  if (name === 'phase_time_syscall_system') return 'duration';
  if (name.startsWith('custom_')) return 'custom';
  return null;
}

function makeBadge(cssClass, label, valueStr, unit) {
  if (valueStr == null) return '';
  return `<div class="badge-row metric-${cssClass}">
    <span class="badge-label"><span class="badge-dot"></span>${label}</span>
    <span class="badge-value">${valueStr}<small> ${unit}</small></span>
  </div>`;
}

function renderCardMetrics(pm) {
  if (!pm || !Object.keys(pm).length) return '<span class="no-metrics-label">No metrics available</span>';

  let cpuEnergyStr = null;
  let machineTotal = 0, hasEnergy = false;
  let dur = null;
  const customEntries = [];

  for (const [k, v] of Object.entries(pm)) {
    switch (classifyMetric(k)) {
      case 'cpu':      cpuEnergyStr = (v.value / 3_600_000).toFixed(4); break;
      case 'machine':  machineTotal += v.value; hasEnergy = true;       break;
      case 'duration': dur = v;                                        break;
      case 'custom':   customEntries.push([k, v]);                     break;
    }
  }
  const machineStr = hasEnergy ? (machineTotal / 3_600_000).toFixed(4) : null;

  let durStr = null, durUnit = 's';
  if (dur) {
    const us = dur.value;
    if (us >= 1_000_000) { durStr = (us / 1_000_000).toFixed(2); durUnit = 's'; }
    else if (us >= 1_000) { durStr = (us / 1_000).toFixed(2);    durUnit = 'ms'; }
    else                  { durStr = String(us);                  durUnit = 'µs'; }
  }

  // Each custom metric gets its own badge, showing its own unit (e.g. "Frames
  // rendered") rather than a generic count — custom metrics have no shared unit.
  const customBadges = customEntries.map(([, v]) => {
    const abs = Math.abs(v.value);
    const dec = abs < 0.001 ? 6 : abs < 0.1 ? 4 : 3;
    return makeBadge('generic', 'Custom', v.value.toFixed(dec), v.unit || '');
  }).join('');

  return makeBadge('energy',  'CPU Energy',     cpuEnergyStr, 'mWh')
       + makeBadge('machine', 'Machine Energy', machineStr,   'mWh')
       + makeBadge('time',    'Duration',       durStr,       durUnit)
       + customBadges;
}

/* ── Task rendering ────────────────────────────── */

function buildTimelineUrl(uri, branch, filename, machine_id, phase) {
  const p = new URLSearchParams();
  p.set('uri', uri);
  p.set('branch', branch || '');
  p.set('filename', filename || '');
  p.set('machine_id', machine_id);
  p.set('phase', phase);
  return `${GMT_BASE}/timeline.html?${p.toString()}`;
}

function renderTask(task) {
  const { id, name, uri, branch, filename, phase, machine_id, machine_name, run_id, run_created_at, phase_metrics } = task;

  const dateStr  = formatDate(run_created_at);
  const dateHtml = dateStr ? `<span title="Latest run"><i class="calendar alternate outline icon"></i>${escHtml(dateStr)}</span>` : '';

  const runUrl      = run_id ? `${GMT_BASE}/stats.html?id=${encodeURIComponent(run_id)}` : null;
  const timelineUrl = buildTimelineUrl(uri, branch, filename, machine_id, phase);

  const runBtn = runUrl
    ? `<a href="${escHtml(runUrl)}" class="ui tiny teal basic button" target="_blank" rel="noopener"><i class="chart bar outline icon"></i> Latest Run</a>`
    : `<span class="ui tiny disabled button">No run found</span>`;

  return `
    <div class="ui segment task-card" data-task-id="${id}" data-phase="${escHtml(phase)}" data-machine-id="${machine_id}">
      <h3 class="task-heading">${escHtml(name)}</h3>
      <div class="task-meta">
        <span title="Machine"><i class="server icon"></i>${escHtml(machine_name || '')}</span>
        <span title="Branch"><i class="code branch icon"></i>${escHtml(branch)}</span>
        <span title="File"><i class="file code outline icon"></i>${escHtml(filename)}</span>
        <span title="Phase"><i class="tag icon"></i>${escHtml(phase)}</span>
        ${dateHtml}
      </div>
      <div class="task-metrics">
        ${renderCardMetrics(phase_metrics)}
      </div>
      <div class="task-links">
        ${runBtn}
        <a href="${escHtml(timelineUrl)}" class="ui tiny basic button" target="_blank" rel="noopener"><i class="clock outline icon"></i> Timeline</a>
      </div>
      <div class="comparable-section" id="comparable-${id}">
        <div class="comparable-loading">
          <div class="ui active mini inline loader"></div>
          <span>Loading comparable tasks&hellip;</span>
        </div>
      </div>
    </div>`;
}

/* ── Similar tasks ─────────────────────────────── */

function renderComparableItem(item, currentMachineId) {
  const machineWarning = item.machine_id !== currentMachineId
    ? ` <i class="yellow exclamation triangle icon" title="Different machine: ${escHtml(item.machine_name)}"></i>`
    : '';
  const detailUrl = `?id=${encodeURIComponent(item.software_id)}&name=${encodeURIComponent(item.software_name)}`;

  return `
    <div class="comparable-item">
      <div class="comparable-header">
        <span class="comparable-sw-name">${escHtml(item.software_name)}</span>
        <span class="comparable-sep">—</span>
        <span class="comparable-task-name">${escHtml(item.name)}</span>
        <span class="comparable-machine">
          <i class="server icon"></i>${escHtml(item.machine_name)}${machineWarning}
        </span>
        <a class="comparable-link" href="${detailUrl}" title="View all tasks for ${escHtml(item.software_name)}">
          <i class="external alternate icon"></i>
        </a>
      </div>
      <div class="comparable-metrics">
        ${renderCardMetrics(item.phase_metrics)}
      </div>
    </div>`;
}

function badgeMetricKeys(pm) {
  if (!pm) return [];
  return Object.keys(pm).filter(k => classifyMetric(k) !== null);
}

function buildCompareTableUrl(runIds, phase, metrics) {
  const p = new URLSearchParams();
  p.set('ids', runIds.join(','));
  if (phase) p.set('phase', phase);
  if (metrics.length) p.set('metrics', metrics.join(','));
  return `${GMT_BASE}/compare-simple.html?${p.toString()}`;
}

function fetchComparable(taskId, name, currentMachineId, phase, phaseMetrics) {
  const url = `${API_BASE}/v1/software/similar?name=${encodeURIComponent(name)}&exclude_software_id=${encodeURIComponent(softwareId)}&categories=${encodeURIComponent(swCategories)}&limit=20`;

  fetch(url)
    .then(res => (res.ok && res.status !== 204) ? res.json() : null)
    .then(json => {
      const sec = document.getElementById(`comparable-${taskId}`);
      if (!json?.data?.length) { sec?.remove(); return; }

      const runIds = [...new Set(json.data.map(item => item.run_id).filter(Boolean))];

      const metricKeys = new Set(badgeMetricKeys(phaseMetrics));
      json.data.forEach(item => badgeMetricKeys(item.phase_metrics).forEach(k => metricKeys.add(k)));

      const compareLink = runIds.length
        ? `<a class="comparable-compare-link" href="${escHtml(buildCompareTableUrl(runIds, phase, [...metricKeys]))}" target="_blank" rel="noopener">
             <i class="table icon"></i>Compare all similar software in table view
           </a>`
        : '';

      let itemsHtml = '';
      json.data.forEach(item => { itemsHtml += renderComparableItem(item, currentMachineId); });

      sec.innerHTML = `
        <div class="comparable-toggle" role="button" tabindex="0" aria-expanded="false">
          <span class="comparable-toggle-label"><i class="angle right icon comparable-toggle-icon"></i>Similar Softwares</span>
          ${compareLink}
        </div>
        <div class="comparable-body" hidden>${itemsHtml}</div>`;

      const toggle = sec.querySelector('.comparable-toggle');
      const body   = sec.querySelector('.comparable-body');
      const toggleOpen = () => {
        const willOpen = body.hidden;
        body.hidden = !willOpen;
        toggle.classList.toggle('open', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
      };
      toggle.addEventListener('click', (e) => {
        if (e.target.closest('.comparable-compare-link')) return;
        toggleOpen();
      });
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); }
      });
    })
    .catch(() => document.getElementById(`comparable-${taskId}`)?.remove());
}

/* ── Bootstrap ─────────────────────────────────── */

if (!softwareId) {
  showError('No software id provided in the URL.');
} else {
  fetch(`${API_BASE}/v1/software/${encodeURIComponent(softwareId)}/tasks`)
    .then(res => {
      if (res.status === 204) throw new Error('No tasks found for this software.');
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(json => {
      hide('loader-wrapper');

      const items = json.data;
      if (!items || items.length === 0) { showError('No tasks found for this software.'); return; }

      const container = document.getElementById('tasks-container');
      container.innerHTML = `<h1 class="sw-page-title">${escHtml(swName || '—')}</h1>`;
      items.forEach(task => {
        container.insertAdjacentHTML('beforeend', renderTask(task));
        fetchComparable(task.id, task.name, task.machine_id, task.phase, task.phase_metrics);
      });

      show('content');
    })
    .catch(err => showError(err.message || 'Network error — check that the API is reachable.'));
}
