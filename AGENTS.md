# AGENTS.md

## Project
Hugo static site for [green-coding.io](https://www.green-coding.io/). Deployed to GitHub Pages via `.github/workflows/hugo.yml` on push to `main`.

## Stack
- **Hugo** (extended, v0.148.1) — static site generator
- **PostCSS + PurgCSS** — CSS bundling (`postcss.config.js`)
- **i18n** — English (default) and German; filename-extension approach (e.g. `about.de.md`)

## Key directories
| Path | Purpose |
|------|---------|
| `content/` | Markdown pages and sections (blog, case-studies, talks-and-events, …) |
| `layouts/` | HTML templates and partials |
| `assets/` | JS/CSS source files bundled via Hugo pipes (not served directly) |
| `static/` | Files served as-is (images, slides, fonts) |
| `i18n/` | Translation strings (`en.yaml`, `de.yaml`) |
| `data/` | Structured data consumed by templates |

## Content rules
- Posts with a **future `date`** will not render unless `buildFuture = true` is set (it is in `config.toml`).
- German translations live next to the English file with a `.de.md` suffix.
- Raw HTML inside `.md` is allowed (`markup.goldmark.renderer.unsafe = true`).

## CSS / JS
- Add new CSS/JS files to `layouts/partials/site-style.html` or `site-scripts.html` so they are included in the bundle.
- Do **not** put bundled source files in `static/`; use `assets/` instead.

## Local dev / Testing
```bash
hugo --minify --gc # Test if everything builds correctly
```

## Multi-language notes
- New `.de.md` layout files require a **server restart** (no hot reload for layout locale variants).
- String translations go in `i18n/de.yaml` / `i18n/en.yaml`.
