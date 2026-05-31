import './topbar.js';
import './nav.js';
import './reveal.js';

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
