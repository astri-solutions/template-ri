// =============================================================================
// NAV — Hamburger + Dropdowns (mobile click, desktop hover/keyboard)
// =============================================================================

document.addEventListener('DOMContentLoaded', initNav);

function initNav() {
  const hamburger = document.querySelector('[data-nav-hamburger]');
  const nav       = document.querySelector('[data-nav]');
  const triggers  = Array.from(document.querySelectorAll('[data-nav-trigger]'));

  // ---------------------------------------------------------------------------
  // Hamburger (mobile)
  // ---------------------------------------------------------------------------
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });
  }

  // ---------------------------------------------------------------------------
  // Triggers de dropdown — click abre/fecha no mobile E no teclado (desktop)
  // ---------------------------------------------------------------------------
  triggers.forEach((trigger) => {
    const item     = trigger.closest('.nav-list__item');
    if (!item) return;

    trigger.addEventListener('click', (e) => {
      // No desktop, clicks nos triggers são para teclado/acessibilidade.
      // O CSS já cuida do hover, então sincronizamos apenas o aria-expanded.
      const willOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(willOpen));

      // Fecha os outros itens abertos
      triggers.forEach((other) => {
        if (other === trigger) return;
        const otherItem = other.closest('.nav-list__item');
        otherItem?.classList.remove('is-open');
        other.setAttribute('aria-expanded', 'false');
      });

      e.stopPropagation();
    });
  });

  // ---------------------------------------------------------------------------
  // Fechar com Escape
  // ---------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    triggers.forEach((trigger) => {
      trigger.closest('.nav-list__item')?.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    });

    if (nav?.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      hamburger?.setAttribute('aria-expanded', 'false');
      hamburger?.setAttribute('aria-label', 'Abrir menu');
      hamburger?.focus();
    }
  });

  // ---------------------------------------------------------------------------
  // Fechar ao clicar fora do nav
  // ---------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    if (nav?.contains(e.target) || hamburger?.contains(e.target)) return;

    triggers.forEach((trigger) => {
      trigger.closest('.nav-list__item')?.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    });
  });
}
