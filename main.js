/* ============================================================
   ATLAS CORPORATION — MAIN.JS
   ============================================================ */

// Mobile menu toggle
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// Intersection Observer for counter trigger
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  observer.observe(heroStats);
}

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 40) {
    header.style.borderBottomColor = 'rgba(204,0,0,0.5)';
  } else {
    header.style.borderBottomColor = '#cc0000';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 130;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Fade-in on scroll for cards
const fadeEls = document.querySelectorAll('.service-card, .ops-card, .leader-card, .sidebar-card, .timeline-item');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// Map dot tooltips
const dots = document.querySelectorAll('.dot');
let tooltip = null;
if (dots.length > 0) {
  tooltip = document.createElement('div');
  tooltip.style.cssText = `
    position: fixed; pointer-events: none; display: none;
    background: rgba(0,0,0,0.95); border: 1px solid #cc0000;
    color: #fff; font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; letter-spacing: 0.15em; padding: 8px 14px;
    z-index: 9999; white-space: nowrap;
  `;
  document.body.appendChild(tooltip);

  dots.forEach(dot => {
    dot.addEventListener('mouseenter', (e) => {
      const title = dot.getAttribute('title');
      if (title && tooltip) {
        tooltip.textContent = title.toUpperCase();
        tooltip.style.display = 'block';
      }
    });
    dot.addEventListener('mousemove', (e) => {
      if (tooltip) {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top = (e.clientY - 30) + 'px';
      }
    });
    dot.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.style.display = 'none';
    });
  });
}

// Glitch text effect on page load for hero title
const heroTitle = document.querySelector('.hero-title .accent');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%';
  let iterations = 0;
  const maxIterations = 20;
  const glitchInterval = setInterval(() => {
    heroTitle.textContent = originalText.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (Math.random() < (iterations / maxIterations)) return char;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    iterations++;
    if (iterations >= maxIterations) {
      heroTitle.textContent = originalText;
      clearInterval(glitchInterval);
    }
  }, 60);
}

// ── Map dot tooltips (SVG overlay version) ──────────────────────────────────
(function() {
  const overlay = document.querySelector('.world-map-svg-overlay');
  if (!overlay) return;
  overlay.style.pointerEvents = 'none';

  const dots = overlay.querySelectorAll('.dot');
  const tip = document.createElement('div');
  tip.style.cssText = [
    'position:fixed','pointer-events:none','display:none',
    'background:rgba(0,0,0,0.96)','border:1px solid #cc0000',
    'color:#fff','font-family:"Barlow Condensed",sans-serif',
    'font-size:12px','letter-spacing:.15em','padding:7px 14px',
    'z-index:9999','white-space:nowrap','text-transform:uppercase'
  ].join(';');
  document.body.appendChild(tip);

  dots.forEach(dot => {
    dot.style.pointerEvents = 'all';
    dot.addEventListener('mouseenter', e => {
      const t = dot.getAttribute('title');
      if (t) { tip.textContent = t; tip.style.display = 'block'; }
    });
    dot.addEventListener('mousemove', e => {
      tip.style.left = (e.clientX + 14) + 'px';
      tip.style.top  = (e.clientY - 32) + 'px';
    });
    dot.addEventListener('mouseleave', () => { tip.style.display = 'none'; });
  });
})();
