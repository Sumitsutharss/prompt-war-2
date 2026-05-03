'use strict';

/* ═══════════════════════════════════════════════════
   VoteIQ India — Bharat Gaurav
   script.js — Phase 1: Foundation & Visual Shell
   ═══════════════════════════════════════════════════ */

// ─── Loading Screen ────────────────────────────────
(function initLoading() {
  const screen = document.getElementById('loading-screen');
  const bar    = document.getElementById('loading-bar');
  if (!screen || !bar) return;

  // Start progress bar fill
  requestAnimationFrame(() => { bar.style.width = '100%'; });

  // Dismiss after 2.5s
  setTimeout(() => {
    screen.classList.add('dismissing');
    setTimeout(() => {
      screen.classList.add('hidden');
      screen.setAttribute('aria-hidden', 'true');
      // Trigger scroll-reveal for visible elements
      document.dispatchEvent(new CustomEvent('voteiq:loaded'));
    }, 500);
  }, 2500);
})();

// ─── Navbar Scroll ────────────────────────────────
(function initNavbarScroll() {
  const navbar    = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── Active Section Tracking ───────────────────────
(function initActiveSection() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
})();

// ─── Mobile Menu ───────────────────────────────────
(function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  if (!hamburger || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.hidden = false;
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus first link
    const firstLink = mobileMenu.querySelector('.mobile-link');
    if (firstLink) setTimeout(() => firstLink.focus(), 50);
  };
  const closeMenu = () => {
    mobileMenu.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  };

  hamburger.addEventListener('click', () => mobileMenu.hidden ? openMenu() : closeMenu());
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileMenu.hidden) closeMenu(); });
})();

// ─── Language Toggle ──────────────────────────────
(function initLanguageToggle() {
  const toggles = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');
  let lang = localStorage.getItem('voteiq-lang') || 'en';

  const setLang = (l) => {
    lang = l;
    document.body.classList.toggle('lang-hi', l === 'hi');
    document.body.classList.toggle('lang-en', l === 'en');
    document.documentElement.setAttribute('lang', l === 'hi' ? 'hi' : 'en');
    localStorage.setItem('voteiq-lang', l);
    toggles.forEach(t => t.setAttribute('aria-pressed', String(l === 'hi')));
  };

  setLang(lang);
  toggles.forEach(t => t.addEventListener('click', () => setLang(lang === 'en' ? 'hi' : 'en')));
})();

// ─── Back to Top ──────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ─── Scroll Reveal (IntersectionObserver) ─────────
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-children');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ─── Hero Headline Letter Animation ───────────────
(function initHeroHeadline() {
  const container = document.querySelector('.hero-letters');
  if (!container) return;

  const text = 'VOTEIQ INDIA';
  container.innerHTML = text.split('').map((char, i) => {
    if (char === ' ') {
      return `<span class="hero-letter" style="width:0.35em;animation-delay:${i * 0.065}s"> </span>`;
    }
    return `<span class="hero-letter" style="animation-delay:${i * 0.065}s">${char}</span>`;
  }).join('');
})();

// ─── CountUp Stat Counters ────────────────────────
(function initCountUp() {
  const statEls = document.querySelectorAll('.stat-number[data-target]');
  if (!statEls.length) return;

  const animate = (el) => {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0');
    const duration = 2000;
    const startTs  = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTs) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const value    = target * eased;
      el.textContent = (decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString('en-IN')) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('en-IN')) + suffix;
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
})();

// ─── Canvas Particle System ───────────────────────
(function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;
  const COUNT  = 24;
  const COLORS = ['rgba(255,140,0,', 'rgba(255,179,71,', 'rgba(255,98,0,'];

  let particles = [];

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  };

  const mkParticle = () => ({
    x:     Math.random() * (W || window.innerWidth),
    y:     Math.random() * (H || window.innerHeight),
    angle: Math.random() * Math.PI * 2,
    speed: 0.06 + Math.random() * 0.10,
    spin:  0.004 + Math.random() * 0.006,
    alpha: 0.08 + Math.random() * 0.22,
    size:  12 + Math.random() * 16,
    drift: (Math.random() - 0.5) * 0.25,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  });

  const drawSpoke = (p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -p.size);
      ctx.strokeStyle = `${p.color}${p.alpha})`;
      ctx.lineWidth   = 1.2;
      ctx.lineCap     = 'round';
      ctx.stroke();
    }
    ctx.restore();
  };

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.angle += p.spin;
      p.y     -= p.speed;
      p.x     += p.drift;
      if (p.y < -p.size)       { p.y = H + p.size; p.x = Math.random() * W; }
      if (p.x < -p.size * 2)   p.x = W + p.size;
      if (p.x > W + p.size * 2) p.x = -p.size;
      drawSpoke(p);
    }
    raf = requestAnimationFrame(loop);
  };

  resize();
  particles = Array.from({ length: COUNT }, mkParticle);
  loop();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    resize();
    loop();
  }, { passive: true });
})();

// ─── Hero CTA — "Ask AI Guide" scroll ─────────────
(function initHeroCTAs() {
  const aiBtn = document.getElementById('cta-ai');
  if (!aiBtn) return;
  aiBtn.addEventListener('click', () => {
    const target = document.getElementById('ai-guide');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) chatInput.focus();
      }, 800);
    }
  });

  // Navbar "Ask AI" button — same behavior
  document.getElementById('ask-ai-btn')?.addEventListener('click', () => {
    aiBtn.click();
  });
  document.getElementById('ask-ai-mobile')?.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.hidden = true;
    const hamburger = document.getElementById('hamburger');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    aiBtn.click();
  });
})();

// ─── Search button placeholder ────────────────────
(function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  if (!searchBtn) return;
  searchBtn.addEventListener('click', () => {
    // Phase 3+ will implement full search modal
    const query = prompt('Search states, parties, or constituencies:');
    if (query && query.trim().length >= 2) {
      fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        .then(r => r.json())
        .then(data => {
          if (data.results && data.results.length) {
            alert(data.results.slice(0, 5).map(r => `${r.type}: ${r.name}`).join('\n'));
          } else {
            alert('No results found.');
          }
        })
        .catch(() => alert('Search unavailable — backend not running locally.'));
    }
  });
})();
