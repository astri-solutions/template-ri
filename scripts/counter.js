// =============================================================================
// COUNTER — Animated number count-up on scroll
// =============================================================================

const DURATION_MS = 1400;

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  if (isNaN(target)) return;

  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / DURATION_MS, 1);
    const value = Math.round(easeOutExpo(progress) * target);
    el.textContent = value.toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const els = Array.from(document.querySelectorAll('[data-counter]'));
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animateCounter(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  els.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initCounters);
