// =============================================================================
// REVEAL — fade-in bottom ao entrar na viewport (padrão do projeto)
// Observa [data-reveal] e também auto-descobre cards e seções de conteúdo.
// =============================================================================

const AUTO_SELECTORS = [
  '.card',
  '.big-number',
  '.page-section',
  '.page-header__inner',
  '.ri-section__head',
  '.about-section__intro',
  '.mailing-section__inner',
].join(', ');

document.addEventListener('DOMContentLoaded', () => {
  const manual = Array.from(document.querySelectorAll('[data-reveal]'));
  const auto   = Array.from(document.querySelectorAll(AUTO_SELECTORS))
    .filter((el) => !el.closest('[data-reveal]') && !el.hasAttribute('data-reveal'));

  const targets = [...manual, ...auto];
  if (!targets.length) return;

  // Marca elementos auto-descobertos com data-reveal
  auto.forEach((el) => el.setAttribute('data-reveal', ''));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = el.dataset.revealDelay ?? '0';
        el.style.animationDelay = `${delay}ms`;
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
});
