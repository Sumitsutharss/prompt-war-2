# Plan B: Loading Screen + Navbar

**Phase:** 1 — Foundation & Visual Shell
**Plan:** B of 3
**Depends on:** Plan A (CSS variables, keyframes, utilities must exist)

## Files Modified

```
frontend/index.html   # Add loading screen + navbar HTML
frontend/style.css    # Add loading + navbar CSS sections
frontend/script.js    # Created here — loading dismiss + navbar scroll + mobile menu + language toggle
```

## Tasks

### Task 1 — Loading Screen HTML (in `index.html`)

Replace `<!-- SECTION 0: Loading Screen -->` placeholder with:

```html
<div id="loading-screen" role="status" aria-label="Loading VoteIQ India" aria-live="polite">
  <div class="loading-chakra-wrap">
    <svg id="loading-chakra" viewBox="0 0 100 100" aria-hidden="true">
      <!-- 24 spokes at 15° intervals -->
      <!-- Outer circle -->
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--navy-chakra)" stroke-width="3"/>
      <circle cx="50" cy="50" r="4" fill="var(--navy-chakra)"/>
      <!-- Spokes: generate 24 lines from center to edge at 15° each -->
      <!-- (JS-generated or hardcoded; hardcode all 24 for reliability) -->
    </svg>
  </div>
  <div class="loading-bar-wrap" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
    <div class="loading-bar" id="loading-bar"></div>
  </div>
  <p class="loading-title" aria-hidden="true">VoteIQ India</p>
  <p class="loading-subtitle hi-only" lang="hi">लोकतंत्र की आवाज़</p>
  <p class="loading-subtitle en-only">Voice of Democracy</p>
</div>
```

The 24 SVG spokes: Generate `<line>` elements from (50,50) outward at 0°, 15°, 30° … 345°. Each line endpoint: `x2 = 50 + 44*sin(angle)`, `y2 = 50 - 44*cos(angle)`. Stroke: `var(--navy-chakra)`, stroke-width 1.5.

### Task 2 — Loading Screen CSS

```css
/* ─── Loading Screen ─────────────────────────────── */
#loading-screen {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  z-index: 10000;
  animation: curtain-open 0.6s ease forwards;
  animation-play-state: paused; /* JS starts it */
}
#loading-screen.dismissing {
  animation-play-state: running;
}
#loading-screen.hidden { display: none; }

.loading-chakra-wrap {
  width: 120px;
  height: 120px;
}
#loading-chakra {
  width: 100%;
  height: 100%;
  animation: chakra-spin 3s linear infinite;
  filter: drop-shadow(var(--shadow-chakra));
}

.loading-bar-wrap {
  width: 240px;
  height: 4px;
  background: var(--border-subtle);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.loading-bar {
  height: 100%;
  width: 0%;
  background: var(--gradient-tricolor);
  border-radius: var(--radius-full);
  transition: width 2.2s ease;
}

.loading-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  background: var(--gradient-tricolor);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: tricolor-shimmer 3s ease infinite;
}
.loading-subtitle {
  font-family: var(--font-hindi);
  font-size: 16px;
  color: var(--text-secondary);
}
```

### Task 3 — Navbar HTML (in `index.html`)

Replace `<header id="navbar">` placeholder:

```html
<header id="navbar" role="banner">
  <nav class="navbar-inner container" aria-label="Main navigation">
    <!-- Left: Logo -->
    <a href="#hero" class="navbar-logo" aria-label="VoteIQ India home">
      <svg class="navbar-chakra" viewBox="0 0 40 40" aria-hidden="true" width="28" height="28">
        <use href="#chakra-svg"/>
      </svg>
      <span class="navbar-brand">
        <span class="brand-voteiq">VOTEIQ</span>
        <span class="brand-india">INDIA</span>
      </span>
    </a>

    <!-- Center: Nav links (desktop) -->
    <ul class="navbar-links" role="list" aria-label="Site sections">
      <li><a href="#india-map" class="nav-link" data-section="map">Map</a></li>
      <li><a href="#leaders" class="nav-link" data-section="leaders">Leaders</a></li>
      <li><a href="#parties" class="nav-link" data-section="parties">Parties</a></li>
      <li><a href="#parliament" class="nav-link" data-section="parliament">Parliament</a></li>
      <li><a href="#election-process" class="nav-link" data-section="process">Process</a></li>
      <li><a href="#quiz" class="nav-link" data-section="quiz">Quiz</a></li>
      <li><a href="#ai-guide" class="nav-link" data-section="ai">AI Guide</a></li>
    </ul>

    <!-- Right: Actions -->
    <div class="navbar-actions">
      <button id="search-btn" class="navbar-icon-btn" aria-label="Search" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
      <button id="lang-toggle" class="navbar-lang-btn" aria-label="Toggle language English/Hindi" aria-pressed="false">
        <span class="en-only">EN</span>
        <span class="hi-only" lang="hi">हिं</span>
      </button>
      <button id="ask-ai-btn" class="btn btn-saffron navbar-ai-btn" aria-haspopup="dialog">
        Ask AI ✨
      </button>
      <!-- Mobile hamburger -->
      <button id="hamburger" class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span class="ham-line"></span>
        <span class="ham-line"></span>
        <span class="ham-line"></span>
      </button>
    </div>
  </nav>

  <!-- Mobile menu overlay -->
  <div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" hidden>
    <ul class="mobile-links" role="list">
      <li><a href="#india-map" class="mobile-link">🗺️ Map</a></li>
      <li><a href="#leaders" class="mobile-link">👤 Leaders</a></li>
      <li><a href="#parties" class="mobile-link">🏛️ Parties</a></li>
      <li><a href="#parliament" class="mobile-link">⚖️ Parliament</a></li>
      <li><a href="#election-process" class="mobile-link">📋 Process</a></li>
      <li><a href="#quiz" class="mobile-link">🧠 Quiz</a></li>
      <li><a href="#ai-guide" class="mobile-link">✨ AI Guide</a></li>
    </ul>
    <div class="mobile-actions">
      <button id="lang-toggle-mobile" class="navbar-lang-btn">EN | हिं</button>
      <button id="ask-ai-mobile" class="btn btn-saffron">Ask AI ✨</button>
    </div>
  </div>
</header>
```

### Task 4 — Navbar CSS

```css
/* ─── Navbar ─────────────────────────────────────── */
#navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  z-index: 1000;
  transition: background var(--transition-mid), border-color var(--transition-mid);
}
#navbar.scrolled {
  background: rgba(4, 5, 10, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(90deg, var(--saffron-mid), var(--white-pure), var(--green-light)) 1;
}
.navbar-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.navbar-chakra {
  color: var(--navy-chakra);
  transition: transform var(--transition-slow);
}
.navbar-logo:hover .navbar-chakra {
  animation: chakra-spin 0.5s linear;
}
.navbar-brand {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.brand-voteiq {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--saffron-mid), var(--white-warm));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.brand-india {
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--text-green);
  text-transform: uppercase;
}

/* Center nav links */
.navbar-links {
  display: flex;
  list-style: none;
  gap: var(--space-lg);
}
.nav-link {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color var(--transition-fast);
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: var(--saffron-mid);
  transition: width var(--transition-mid);
}
.nav-link:hover, .nav-link.active {
  color: var(--text-saffron);
}
.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}

/* Right actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.navbar-icon-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast);
}
.navbar-icon-btn:hover { color: var(--text-saffron); }

.navbar-lang-btn {
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.navbar-lang-btn:hover {
  border-color: var(--border-saffron);
  color: var(--text-saffron);
}

.navbar-ai-btn {
  padding: 8px 18px;
  font-size: 13px;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.ham-line {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-mid);
}
.hamburger[aria-expanded="true"] .ham-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger[aria-expanded="true"] .ham-line:nth-child(2) {
  opacity: 0;
}
.hamburger[aria-expanded="true"] .ham-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  position: fixed;
  top: 64px; left: 0; right: 0; bottom: 0;
  background: rgba(4, 5, 10, 0.98);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  z-index: 999;
  animation: reveal 0.3s ease forwards;
}
.mobile-menu[hidden] { display: none; }
.mobile-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}
.mobile-link {
  font-family: var(--font-ui);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-primary);
  text-decoration: none;
  text-transform: uppercase;
  transition: color var(--transition-fast);
}
.mobile-link:hover { color: var(--text-saffron); }
.mobile-actions {
  display: flex;
  gap: var(--space-md);
  align-items: center;
}

/* Back to top */
#back-to-top {
  position: fixed;
  bottom: var(--space-xl);
  right: var(--space-xl);
  width: 48px; height: 48px;
  background: var(--bg-card);
  border: 1px solid var(--border-saffron);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 500;
  opacity: 0;
  pointer-events: none;
  transition: all var(--transition-mid);
  color: var(--text-saffron);
}
#back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}
#back-to-top:hover {
  transform: rotate(360deg);
  border-color: var(--green-light);
  color: var(--text-green);
}
#back-to-top svg { width: 22px; height: 22px; }

/* Responsive */
@media (max-width: 1024px) { .navbar-links { display: none; } }
@media (max-width: 768px) {
  .navbar-ai-btn { display: none; }
  .hamburger { display: flex; }
}
```

### Task 5 — `frontend/script.js` — Loading + Navbar + Language JS

Create `frontend/script.js`:

```javascript
'use strict';

// ─── Loading Screen ────────────────────────────────
(function initLoading() {
  const screen = document.getElementById('loading-screen');
  const bar    = document.getElementById('loading-bar');
  if (!screen || !bar) return;

  // Animate progress bar
  requestAnimationFrame(() => { bar.style.width = '100%'; });

  // Dismiss after 2.5s with curtain animation
  setTimeout(() => {
    screen.classList.add('dismissing');
    screen.addEventListener('animationend', () => {
      screen.classList.add('hidden');
      screen.setAttribute('aria-hidden', 'true');
    }, { once: true });
  }, 2500);
})();

// ─── Navbar Scroll ────────────────────────────────
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  if (!navbar) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 80;
    navbar.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── Active Section Tracking ────────────────────────
(function initActiveSection() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();

// ─── Mobile Menu ───────────────────────────────────
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.hidden = false;
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.hidden ? openMenu() : closeMenu();
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileMenu.hidden) closeMenu();
  });
})();

// ─── Language Toggle ──────────────────────────────
(function initLanguageToggle() {
  const toggles = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');
  let currentLang = localStorage.getItem('voteiq-lang') || 'en';

  function setLang(lang) {
    currentLang = lang;
    document.body.classList.toggle('lang-hi', lang === 'hi');
    document.body.classList.toggle('lang-en', lang === 'en');
    document.documentElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');
    localStorage.setItem('voteiq-lang', lang);
    toggles.forEach(t => t.setAttribute('aria-pressed', lang === 'hi' ? 'true' : 'false'));
  }

  // Apply saved preference
  setLang(currentLang);

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      setLang(currentLang === 'en' ? 'hi' : 'en');
    });
  });
})();

// ─── Back to Top ──────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ─── IntersectionObserver: Scroll Reveal ──────────
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-children');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();
```

### Task 6 — Back-to-Top Button HTML

Add before `</body>` in `index.html`:

```html
<button id="back-to-top" aria-label="Back to top">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <use href="#chakra-svg"/>
  </svg>
</button>
```

## Verification

- [ ] Loading screen appears on page open; Chakra SVG spins; progress bar fills saffron→white→green over 2.2s; screen dismisses with curtain-open animation at 2.5s
- [ ] At `scrollY = 0`, navbar has no background
- [ ] After scrolling 80px+, navbar shows frosted glass + tricolor bottom border
- [ ] On mobile (< 768px), hamburger is visible; click opens full-screen mobile menu
- [ ] Mobile menu links close the menu and scroll to section
- [ ] Pressing Escape closes mobile menu
- [ ] Language toggle switches `body.lang-en` ↔ `body.lang-hi`; preference persists via `localStorage`
- [ ] Back-to-top button appears after 400px scroll; click returns to top; rotates 360° on hover
- [ ] No JS console errors on page load

---
*Plan B — Loading Screen + Navbar*
*Phase 1: Foundation & Visual Shell*
