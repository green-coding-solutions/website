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

function fetchComparable(taskId, name, currentMachineId) {
  const url = `${API_BASE}/v1/software/similar?name=${encodeURIComponent(name)}&exclude_software_id=${encodeURIComponent(softwareId)}&categories=${encodeURIComponent(swCategories)}`;

  fetch(url)
    .then(res => (res.ok && res.status !== 204) ? res.json() : null)
    .then(json => {
      const sec = document.getElementById(`comparable-${taskId}`);
      if (!json?.data?.length) { sec?.remove(); return; }

      let html = '<div class="comparable-heading"><i class="exchange alternate icon"></i> Similar Tasks</div>';
      json.data.forEach(item => { html += renderComparableItem(item, currentMachineId); });
      sec.innerHTML = html;
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
        fetchComparable(task.id, task.name, task.machine_id);
      });

      show('content');
    })
    .catch(err => showError(err.message || 'Network error — check that the API is reachable.'));
}
