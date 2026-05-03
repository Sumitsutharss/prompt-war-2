# Plan A: Design System — Bharat Gaurav CSS Foundation

**Phase:** 1 — Foundation & Visual Shell
**Plan:** A of 3
**Goal:** Implement the complete Bharat Gaurav CSS design system: variables, fonts, keyframes, grain overlay, and scroll-reveal utility.

## Context

All CSS goes into `frontend/style.css`. This is the single stylesheet for the entire single-page app. No build step — raw CSS. Plan B and Plan C both depend on these tokens being defined first.

## Files

```
frontend/
├── index.html        # Created here (skeleton HTML shell only)
└── style.css         # ALL design system tokens + utilities
```

## Tasks

### Task 1 — Create `frontend/index.html` (skeleton shell)

Create the HTML file with:
- `<!DOCTYPE html>`, `lang="en"` attribute
- `<head>`: charset UTF-8, viewport, title "VoteIQ India — Bharat Gaurav | AI-Powered Election Education", meta description, meta theme-color `#04050A`
- Google Fonts `<link>` (preconnect + stylesheet):
  ```
  https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Tiro+Devanagari+Hindi&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Rajdhani:wght@400;500;600;700&family=Nunito:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap
  ```
- CDN `<script>` tags (defer):
  - D3.js: `https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js`
  - TopoJSON: `https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js`
  - Chart.js: `https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js`
- `<link rel="stylesheet" href="style.css">`
- `<body>` with `id="app"`, `class="lang-en"`:
  - `<!-- SECTION 0: Loading Screen -->` placeholder div `id="loading-screen"`
  - `<header id="navbar">` placeholder
  - `<main id="main-content">` with section placeholder comments (hero through footer)
  - `<script src="script.js" defer></script>`
- Semantic HTML: single `<h1>` inside hero section (`id="hero"`)

### Task 2 — Create `frontend/style.css` — CSS Variables block

Write the `:root {}` block with ALL variables exactly as specified:

```css
:root {
  /* Indian Tricolor Foundation */
  --saffron-deep: #FF6200;
  --saffron-mid: #FF8C00;
  --saffron-light: #FFB347;
  --saffron-glow: rgba(255, 98, 0, 0.20);
  --white-pure: #FFFFFF;
  --white-warm: #F8F6F0;
  --white-cream: #FFF8EE;
  --green-india: #046A38;
  --green-mid: #0A8A4A;
  --green-light: #12B05E;
  --green-glow: rgba(4, 106, 56, 0.20);
  --navy-chakra: #000080;

  /* UI Backgrounds */
  --bg-primary: #04050A;
  --bg-secondary: #0A0C14;
  --bg-card: #0F1120;
  --bg-elevated: #161828;
  --bg-glass: rgba(255, 255, 255, 0.04);

  /* Text */
  --text-primary: #F0EDE8;
  --text-secondary: #A09880;
  --text-muted: #504840;
  --text-saffron: #FF8C00;
  --text-green: #12B05E;

  /* Borders */
  --border-saffron: rgba(255, 140, 0, 0.30);
  --border-green: rgba(18, 176, 94, 0.30);
  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-glass: rgba(255, 255, 255, 0.10);

  /* Gradients */
  --gradient-tricolor: linear-gradient(135deg, #FF6200 0%, #FFFFFF 50%, #046A38 100%);
  --gradient-saffron: linear-gradient(135deg, #FF6200, #FFB347);
  --gradient-green: linear-gradient(135deg, #046A38, #12B05E);
  --gradient-hero: radial-gradient(ellipse at 20% 50%, rgba(255,98,0,0.15) 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 50%, rgba(4,106,56,0.15) 0%, transparent 60%),
                   #04050A;

  /* Shadows */
  --shadow-saffron: 0 0 40px rgba(255, 140, 0, 0.20);
  --shadow-green: 0 0 40px rgba(4, 106, 56, 0.20);
  --shadow-card: 0 8px 40px rgba(0, 0, 0, 0.60);
  --shadow-chakra: 0 0 80px rgba(0, 0, 128, 0.30);

  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
  --space-3xl: 96px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-mid: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Typography */
  --font-display: 'Cinzel Decorative', serif;
  --font-hindi: 'Tiro Devanagari Hindi', serif;
  --font-editorial: 'Playfair Display', serif;
  --font-ui: 'Rajdhani', sans-serif;
  --font-body: 'Nunito', sans-serif;
  --font-data: 'JetBrains Mono', monospace;
}
```

### Task 3 — CSS Base Reset + Body

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Screen reader only */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
```

### Task 4 — All Keyframe Animations

Add all 8 keyframes:

```css
@keyframes chakra-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes tricolor-shimmer {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes flag-wave {
  0%, 100% { transform: skewY(0deg) scaleX(1); }
  25%       { transform: skewY(1deg) scaleX(1.02); }
  75%       { transform: skewY(-1deg) scaleX(0.99); }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.5); opacity: 0.6; }
}

@keyframes curtain-open {
  0%   { clip-path: inset(0 50% 0 50%); }
  100% { clip-path: inset(0 0% 0 0%); }
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes ticker-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes count-up-flash {
  0%, 100% { color: var(--text-saffron); }
  50%       { color: var(--white-pure); }
}
```

### Task 5 — Film Grain Overlay

```css
/* Film grain — applied to body via ::after */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}
```

### Task 6 — Scroll-Reveal Utility Classes

```css
/* Scroll reveal — JS adds .visible via IntersectionObserver */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.reveal-children > * {
  opacity: 0;
  transform: translateY(24px);
}
.reveal-children.visible > *:nth-child(1)  { animation: reveal 0.5s 0.0s forwards ease; }
.reveal-children.visible > *:nth-child(2)  { animation: reveal 0.5s 0.1s forwards ease; }
.reveal-children.visible > *:nth-child(3)  { animation: reveal 0.5s 0.2s forwards ease; }
.reveal-children.visible > *:nth-child(4)  { animation: reveal 0.5s 0.3s forwards ease; }
.reveal-children.visible > *:nth-child(5)  { animation: reveal 0.5s 0.4s forwards ease; }
.reveal-children.visible > *:nth-child(6)  { animation: reveal 0.5s 0.5s forwards ease; }
.reveal-children.visible > *:nth-child(7)  { animation: reveal 0.5s 0.6s forwards ease; }
.reveal-children.visible > *:nth-child(8)  { animation: reveal 0.5s 0.7s forwards ease; }
.reveal-children.visible > *:nth-child(9)  { animation: reveal 0.5s 0.8s forwards ease; }
.reveal-children.visible > *:nth-child(10) { animation: reveal 0.5s 0.9s forwards ease; }
.reveal-children.visible > *:nth-child(11) { animation: reveal 0.5s 1.0s forwards ease; }
.reveal-children.visible > *:nth-child(12) { animation: reveal 0.5s 1.1s forwards ease; }
```

### Task 7 — Glassmorphism + Common Utility Classes

```css
/* Glass card base */
.glass {
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Tricolor gradient text */
.text-tricolor {
  background: var(--gradient-tricolor);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: tricolor-shimmer 4s ease infinite;
}

/* Section wrapper */
.section {
  padding: var(--space-3xl) var(--space-xl);
  position: relative;
}

/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

/* Section title pattern */
.section-title {
  font-family: var(--font-editorial);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: var(--space-sm);
}
.section-title .hindi {
  display: block;
  font-family: var(--font-hindi);
  font-size: 0.55em;
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

/* Pill badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.badge-saffron {
  background: var(--gradient-saffron);
  color: var(--bg-primary);
}
.badge-green {
  background: var(--gradient-green);
  color: var(--white-pure);
}
.badge-glass {
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
}

/* Button base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 12px 28px;
  border-radius: var(--radius-md);
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all var(--transition-mid);
  white-space: nowrap;
}
.btn-saffron {
  background: var(--gradient-saffron);
  color: var(--bg-primary);
}
.btn-saffron:hover {
  background: var(--gradient-green);
  color: var(--white-pure);
  transform: translateY(-2px);
  box-shadow: var(--shadow-green);
}
.btn-outline-saffron {
  background: transparent;
  border: 1.5px solid var(--saffron-mid);
  color: var(--text-saffron);
}
.btn-outline-saffron:hover {
  background: var(--saffron-glow);
  transform: translateY(-2px);
}
.btn-outline-green {
  background: transparent;
  border: 1.5px solid var(--green-light);
  color: var(--text-green);
}
.btn-outline-green:hover {
  background: var(--green-glow);
  transform: translateY(-2px);
}

/* Language toggle classes */
body.lang-hi .en-only { display: none; }
body.lang-en .hi-only { display: none; }
```

### Task 8 — Ashoka Chakra SVG Symbol (reusable)

In `index.html` inside `<body>`, add an SVG `<defs>` block as the very first child — a 24-spoke Ashoka Chakra using `<symbol id="chakra-svg">` so it can be referenced with `<use href="#chakra-svg">` anywhere. Draw 24 spokes radiating from center at 15° intervals using `<line>` elements, with the outer ring as a `<circle>`.

## Verification

- [ ] `frontend/style.css` contains `:root {}` with all 50+ CSS variables
- [ ] All 8 keyframes defined (`chakra-spin`, `tricolor-shimmer`, `flag-wave`, `pulse-dot`, `curtain-open`, `reveal`, `ticker-scroll`, `count-up-flash`)
- [ ] Film grain overlay is present (body::after with SVG data URI)
- [ ] `.reveal` and `.reveal-children` scroll utilities defined
- [ ] `.glass`, `.text-tricolor`, `.btn-*`, `.badge-*` utility classes all present
- [ ] `index.html` skeleton exists with correct `<head>` (fonts, CDNs, meta tags, single h1 in hero)
- [ ] `index.html` has Ashoka Chakra `<symbol>` in SVG defs
- [ ] `body.lang-hi` / `body.lang-en` toggle classes defined
- [ ] Open `index.html` in browser — body background is `#04050A` (near black), no console errors

---
*Plan A — Design System*
*Phase 1: Foundation & Visual Shell*
