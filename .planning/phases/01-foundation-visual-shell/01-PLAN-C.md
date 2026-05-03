# Plan C: Hero Section

**Phase:** 1 — Foundation & Visual Shell
**Plan:** C of 3
**Depends on:** Plan A (design system), Plan B (script.js exists)

## Files Modified

```
frontend/index.html   # Hero section HTML
frontend/style.css    # Hero CSS
frontend/script.js    # Canvas particles + CountUp + ticker + hero CTA behaviors
```

## Tasks

### Task 1 — Hero Section HTML (in `index.html`)

Replace hero section placeholder with:

```html
<section id="hero" class="hero-section" aria-labelledby="hero-heading">

  <!-- Ashoka Chakra watermark -->
  <div class="hero-chakra-watermark" aria-hidden="true">
    <svg viewBox="0 0 200 200">
      <use href="#chakra-svg"/>
    </svg>
  </div>

  <!-- Particle canvas -->
  <canvas id="hero-canvas" aria-hidden="true"></canvas>

  <!-- Content -->
  <div class="hero-content container">

    <!-- Badge -->
    <div class="hero-badge-wrap reveal">
      <span class="badge badge-saffron" role="text">
        <span class="pulse-indicator" aria-hidden="true"></span>
        <span class="en-only">🗳️ BHARAT GAURAV EDITION — ELECTION DATA 2026</span>
        <span class="hi-only" lang="hi">🗳️ भारत गौरव संस्करण — चुनाव डेटा 2026</span>
      </span>
    </div>

    <!-- Main heading -->
    <h1 id="hero-heading" class="hero-headline" aria-label="VoteIQ India">
      <span class="hero-letters" aria-hidden="true"></span>
    </h1>

    <!-- Hindi subheadline -->
    <p class="hero-sub-hindi hi-only reveal" lang="hi">भारत के लोकतंत्र को समझिए</p>
    <p class="hero-sub-english reveal">
      <span class="en-only">Understand India's Democracy — Deeply, Visually, Intelligently</span>
      <span class="hi-only" lang="hi">Samajhiye Bharat ke Loktantra ko — Gehrai se, Visually, Intelligently</span>
    </p>

    <!-- CountUp Stats -->
    <div class="hero-stats reveal-children" role="region" aria-label="Key statistics">
      <div class="hero-stat">
        <span class="stat-number" data-target="96.88" data-suffix=" Cr" data-decimal="2" id="stat-voters">0</span>
        <span class="stat-label en-only">Registered Voters</span>
        <span class="stat-label hi-only" lang="hi">पंजीकृत मतदाता</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number" data-target="543" data-suffix="" id="stat-seats">0</span>
        <span class="stat-label en-only">Lok Sabha Seats</span>
        <span class="stat-label hi-only" lang="hi">लोक सभा सीटें</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number" data-target="4000" data-suffix="+" id="stat-assembly">0</span>
        <span class="stat-label en-only">Vidhan Sabha Seats</span>
        <span class="stat-label hi-only" lang="hi">विधान सभा सीटें</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number" data-target="1950" data-suffix="" id="stat-year">0</span>
        <span class="stat-label en-only">Constitution Year</span>
        <span class="stat-label hi-only" lang="hi">संविधान वर्ष</span>
      </div>
    </div>

    <!-- CTAs -->
    <div class="hero-ctas reveal">
      <a href="#india-map" class="btn btn-saffron" id="cta-map">
        Explore the Map →
      </a>
      <button class="btn btn-outline-saffron" id="cta-ai" aria-haspopup="dialog">
        Ask AI Guide ✨
      </button>
      <a href="#quiz" class="btn btn-outline-green" id="cta-quiz">
        Take Election Quiz 🧠
      </a>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll-indicator reveal" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>

  </div>

  <!-- Scrolling ticker -->
  <div class="hero-ticker" role="marquee" aria-label="Election statistics ticker">
    <div class="ticker-track" aria-hidden="true">
      <span class="ticker-content">
        LOK SABHA 543 SEATS &bull;
        RAJYA SABHA 245 SEATS &bull;
        28 STATES + 8 UTs &bull;
        96.88 CR VOTERS &bull;
        CURRENT PM: NARENDRA MODI &bull;
        CEC: GYANESH KUMAR &bull;
        NDA: 293 SEATS &bull;
        INDIA ALLIANCE: 234 SEATS &bull;
        NEXT BIG ELECTION: BIHAR 2025 &bull;
        ARTICLE 324: ECI AUTHORITY &bull;
        VOTER HELPLINE: 1950 &bull;
      </span>
      <!-- Duplicate for seamless loop -->
      <span class="ticker-content" aria-hidden="true">
        LOK SABHA 543 SEATS &bull;
        RAJYA SABHA 245 SEATS &bull;
        28 STATES + 8 UTs &bull;
        96.88 CR VOTERS &bull;
        CURRENT PM: NARENDRA MODI &bull;
        CEC: GYANESH KUMAR &bull;
        NDA: 293 SEATS &bull;
        INDIA ALLIANCE: 234 SEATS &bull;
        NEXT BIG ELECTION: BIHAR 2025 &bull;
        ARTICLE 324: ECI AUTHORITY &bull;
        VOTER HELPLINE: 1950 &bull;
      </span>
    </div>
  </div>

</section>
```

### Task 2 — Hero CSS

```css
/* ─── Hero ───────────────────────────────────────── */
.hero-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--gradient-hero);
  overflow: hidden;
  padding-top: 64px; /* navbar offset */
}

/* Chakra watermark */
.hero-chakra-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(60vw, 600px);
  height: min(60vw, 600px);
  opacity: 0.06;
  pointer-events: none;
  animation: chakra-spin 60s linear infinite;
  color: var(--navy-chakra);
}
.hero-chakra-watermark svg { width: 100%; height: 100%; }

/* Canvas */
#hero-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Hero content */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-xl);
  padding: var(--space-3xl) var(--space-xl);
}

/* Badge */
.hero-badge-wrap { display: flex; justify-content: center; }
.pulse-indicator {
  display: inline-block;
  width: 8px; height: 8px;
  background: var(--bg-primary);
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

/* Headline */
.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 7vw, 4.25rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0.04em;
  background: var(--gradient-tricolor);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: tricolor-shimmer 5s ease infinite;
}
.hero-letters { display: inline-block; }
.hero-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px);
  animation: reveal 0.4s forwards ease;
}
/* JS sets animation-delay per letter */

/* Subheadlines */
.hero-sub-hindi {
  font-family: var(--font-hindi);
  font-size: clamp(1.2rem, 3vw, 1.75rem);
  color: var(--text-secondary);
}
.hero-sub-english {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 600px;
}

/* Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  width: 100%;
  max-width: 800px;
}
.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}
.stat-number {
  font-family: var(--font-data);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 500;
  color: var(--text-saffron);
  line-height: 1;
}
.stat-label {
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* CTAs */
.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
}

/* Scroll indicator */
.hero-scroll-indicator {
  color: var(--text-saffron);
  animation: flag-wave 2s ease-in-out infinite;
}

/* Ticker */
.hero-ticker {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  overflow: hidden;
  border-top: 3px solid var(--saffron-mid);
  border-bottom: 3px solid var(--green-india);
  background: rgba(4, 5, 10, 0.8);
  padding: 8px 0;
}
.ticker-track {
  display: flex;
  white-space: nowrap;
  animation: ticker-scroll 40s linear infinite;
}
.ticker-content {
  flex-shrink: 0;
  padding: 0 var(--space-xl);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-stats { grid-template-columns: repeat(2, 1fr); gap: var(--space-lg); }
  .hero-ctas .btn { width: 100%; justify-content: center; }
}
@media (max-width: 480px) {
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
}
```

### Task 3 — Hero JS (append to `frontend/script.js`)

**3a. Headline letter-by-letter animation:**

```javascript
// ─── Hero Headline Animation ──────────────────────
(function initHeroHeadline() {
  const container = document.querySelector('.hero-letters');
  if (!container) return;
  const text = 'VOTEIQ INDIA';
  container.innerHTML = text.split('').map((char, i) => {
    if (char === ' ') return '<span class="hero-letter" style="display:inline-block;width:0.4em"> </span>';
    return `<span class="hero-letter" style="animation-delay:${i * 0.06}s">${char}</span>`;
  }).join('');
})();
```

**3b. CountUp animation (IntersectionObserver-triggered):**

```javascript
// ─── CountUp Stats ────────────────────────────────
(function initCountUp() {
  const statEls = document.querySelectorAll('.stat-number[data-target]');
  if (!statEls.length) return;

  const formatNum = (val, decimal, suffix) => {
    const n = decimal > 0 ? val.toFixed(decimal) : Math.floor(val).toLocaleString('en-IN');
    return n + suffix;
  };

  const animateCount = (el) => {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const decimal = parseInt(el.dataset.decimal || '0');
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      el.textContent = formatNum(target * ease, decimal, suffix);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = formatNum(target, decimal, suffix);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
})();
```

**3c. Canvas particle system (24 spoke-shaped gold particles):**

```javascript
// ─── Hero Canvas Particles ────────────────────────
(function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const PARTICLE_COUNT = 24;
  const SPOKE_LENGTH = 18;
  const COLORS = ['rgba(255,140,0,', 'rgba(255,179,71,', 'rgba(255,98,0,'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    const angle = Math.random() * Math.PI * 2;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      angle,
      speed: 0.08 + Math.random() * 0.12,
      spin:  0.003 + Math.random() * 0.005,
      alpha: 0.1 + Math.random() * 0.25,
      size:  SPOKE_LENGTH * (0.5 + Math.random() * 0.8),
      drift: (Math.random() - 0.5) * 0.3,
      color,
    };
  }

  function drawSpoke(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    // Draw 4 spokes (cross pattern)
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -p.size);
      ctx.strokeStyle = `${p.color}${p.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.angle += p.spin;
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -p.size) { p.y = H + p.size; p.x = Math.random() * W; }
      if (p.x < -p.size) p.x = W + p.size;
      if (p.x > W + p.size) p.x = -p.size;
      drawSpoke(p);
    });
    requestAnimationFrame(animate);
  }

  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  animate();

  window.addEventListener('resize', () => { resize(); }, { passive: true });
})();
```

**3d. CTA click handlers:**

```javascript
// ─── Hero CTA Handlers ────────────────────────────
(function initHeroCTAs() {
  // "Ask AI Guide" opens chatbot section
  const aiBtn = document.getElementById('cta-ai');
  if (aiBtn) {
    aiBtn.addEventListener('click', () => {
      const aiSection = document.getElementById('ai-guide');
      if (aiSection) {
        aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Focus chat input after scroll
        setTimeout(() => {
          const chatInput = document.getElementById('chat-input');
          if (chatInput) chatInput.focus();
        }, 800);
      }
    });
  }
})();
```

## Verification

- [ ] Hero section fills 100vh on load; no overflow/scroll at 100vh
- [ ] Ashoka Chakra watermark is visible as faint navy shape behind hero content (6% opacity), slowly rotating
- [ ] Canvas particles: 24 gold spoke-shaped particles drift slowly upward
- [ ] "VOTEIQ INDIA" headline renders with tricolor shimmer; each letter animates in one-by-one with stagger
- [ ] Hindi subheadline visible when `lang-hi` class active
- [ ] CountUp counters: numbers animate from 0 to their targets when hero enters viewport:
  - `96.88 Cr`, `543`, `4000+`, `1950`
- [ ] All 3 CTA buttons render correctly:
  - "Explore the Map →" links to `#india-map`
  - "Ask AI Guide ✨" scrolls to `#ai-guide` and focuses chat input
  - "Take Election Quiz 🧠" links to `#quiz`
- [ ] Ticker marquee scrolls infinitely left without jumping/resetting
- [ ] Ticker has saffron top border + green bottom border
- [ ] Scroll chevron visible at bottom center of hero, bouncing
- [ ] On mobile (< 768px): stats in 2×2 grid; CTA buttons full-width; no horizontal overflow

---
*Plan C — Hero Section*
*Phase 1: Foundation & Visual Shell*
