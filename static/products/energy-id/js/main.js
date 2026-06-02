const API_BASE = 'http://api.green-coding.internal:9142';
const GMT_BASE = 'https://metrics.green-coding.io';

function escHtml(str) {
  const el = document.createElement('span');
  el.textContent = str || '';
  return el.innerHTML;
}

function show(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) el.style.display = 'block';
}

function hide(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) el.style.display = 'none';
}

function formatDate(isoStr) {
  if (!isoStr) return null;
  try {
    return new Date(isoStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return null; }
}

function parseTags(raw) {
  if (!raw) return [];
  return raw.split(',').map(c => c.trim()).filter(Boolean);
}

function humanise(value, unit, metricName) {
  if (unit === 'uJ') {
    return { v: (value / 3_600_000).toFixed(4), u: 'mWh' };
  }
  if (unit === 'Bytes' || (metricName && metricName.startsWith('network_'))) {
    if (value >= 1_000_000) return { v: (value / 1_000_000).toFixed(2), u: 'MB' };
    return { v: (value / 1_000).toFixed(2), u: 'KB' };
  }
  if (unit === 'us') {
    if (value >= 1_000_000) return { v: (value / 1_000_000).toFixed(2), u: 's' };
    if (value >= 1_000)     return { v: (value / 1_000).toFixed(2),     u: 'ms' };
    return { v: String(value), u: 'µs' };
  }
  return null;
}

function makeBadge(cssClass, label, valueStr, unit) {
  if (valueStr == null) return '';
  return `<div class="badge-row metric-${cssClass}">
    <span class="badge-label"><span class="badge-dot"></span>${label}</span>
    <span class="badge-value">${valueStr}<small> ${unit}</small></span>
  </div>`;
}

function isStandardMetric(name) {
  return name.includes('energy') || name.includes('power') ||
         name.includes('carbon') || name.includes('sci') ||
         name.startsWith('network_') || name === 'phase_time_syscall_system';
}

function renderCardMetrics(pm) {
  if (!pm || !Object.keys(pm).length) return '<span class="no-metrics-label">No metrics available</span>';

  const cpuEg = pm['cpu_energy_rapl_msr_component'];
  const cpuEnergyStr = cpuEg ? (cpuEg.value / 3_600_000).toFixed(4) : null;

  let machineTotal = 0, hasEnergy = false;
  for (const [k, v] of Object.entries(pm)) {
    if (k.includes('energy')) { machineTotal += v.value; hasEnergy = true; }
  }
  const machineStr = hasEnergy ? (machineTotal / 3_600_000).toFixed(4) : null;

  const custom = Object.entries(pm).filter(([k]) => !isStandardMetric(k));
  let customStr = null, customUnit = '';
  if (custom.length === 1) {
    const [, v] = custom[0];
    const abs = Math.abs(v.value);
    const dec = abs < 0.001 ? 6 : abs < 0.1 ? 4 : 3;
    customStr = v.value.toFixed(dec);
    customUnit = v.unit || '';
  } else if (custom.length > 1) {
    customStr = String(custom.length);
    customUnit = 'metrics';
  }

  const dur = pm['phase_time_syscall_system'];
  let durStr = null, durUnit = 's';
  if (dur) {
    const us = dur.value;
    if (us >= 1_000_000) { durStr = (us / 1_000_000).toFixed(2); durUnit = 's'; }
    else if (us >= 1_000) { durStr = (us / 1_000).toFixed(2);    durUnit = 'ms'; }
    else                  { durStr = String(us);                  durUnit = 'µs'; }
  }

  return makeBadge('energy',  'CPU Energy',     cpuEnergyStr, 'mWh')
       + makeBadge('machine', 'Machine Energy', machineStr,   'mWh')
       + makeBadge('time',    'Duration',       durStr,       durUnit)
       + makeBadge('generic', 'Custom',         customStr,    customUnit);
}
