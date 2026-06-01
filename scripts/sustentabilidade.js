import './topbar.js';
import './nav.js';
import './reveal.js';

// Carrosel de projetos ESG (mobile only — scroll-snap + dots)
function initProjectsCarousel() {
  const grid = document.querySelector('.esg-projects-grid');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('.esg-project-card')];
  if (cards.length < 2) return;

  const dotsEl = document.createElement('div');
  dotsEl.className = 'esg-carousel-dots';
  dotsEl.setAttribute('aria-hidden', 'true');

  const dots = cards.map((card, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'esg-carousel-dot' + (i === 0 ? ' is-active' : '');
    btn.setAttribute('aria-label', `Item ${i + 1}`);
    btn.addEventListener('click', () => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    dotsEl.appendChild(btn);
    return btn;
  });

  grid.after(dotsEl);

  grid.addEventListener('scroll', () => {
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    const idx = maxScroll > 0
      ? Math.round((grid.scrollLeft / maxScroll) * (cards.length - 1))
      : 0;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }, { passive: true });
}

initProjectsCarousel();

// Counter animation — ESG stats section
function runCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isFloat = el.dataset.float === 'true';
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = eased * target;
    el.textContent = isFloat
      ? value.toFixed(1).replace('.', ',')
      : Math.round(value).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statsSection = document.querySelector('[data-stats-section]');
if (statsSection) {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        statsSection.querySelectorAll('[data-counter]').forEach(runCounter);
        io.disconnect();
      }
    },
    { threshold: 0.25 }
  );
  io.observe(statsSection);
}
