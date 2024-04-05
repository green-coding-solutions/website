const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  safelist: ['activo', 'active', 'disabled', 'disabled-2', 'error', 'example', 'paraOn', 'orange', 'selected', 'top', 'aligned', 'remove', 'icon', 'text', 'ui', 'dimmer'],
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};

