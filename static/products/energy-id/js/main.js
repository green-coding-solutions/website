const API_BASE = 'https://api.green-coding.io';
const GMT_BASE = 'https://metrics.green-coding.io';

function escHtml(str) {
   return String(str ?? '')
     .replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;')
     .replace(/'/g, '&`#39`;');
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
