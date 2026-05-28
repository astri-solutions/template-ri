// =============================================================================
// NAV — Hamburger + Dropdowns (mobile click, desktop hover/keyboard) + scroll
// =============================================================================

document.addEventListener('DOMContentLoaded', initNav);

function initNav() {
  const header    = document.querySelector('.site-header');
  const hamburger = document.querySelector('[data-nav-hamburger]');
  const nav       = document.querySelector('[data-nav]');
  const triggers  = Array.from(document.querySelectorAll('[data-nav-trigger]'));

  // ---------------------------------------------------------------------------
  // Scroll — slide-in/out com base na direção
  // ---------------------------------------------------------------------------
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current <= 10) {
          header.classList.remove('is-hidden');
        } else if (current > lastScrollY + 4) {
          header.classList.add('is-hidden');
        } else if (current < lastScrollY - 4) {
          header.classList.remove('is-hidden');
        }
        lastScrollY = current;
        ticking = false;
      });
    }, { passive: true });
  }

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
  // Hover no desktop — sincroniza aria-expanded (chevron + acessibilidade)
  // ---------------------------------------------------------------------------
  triggers.forEach((trigger) => {
    const item = trigger.closest('.nav-list__item');
    if (!item) return;

    item.addEventListener('mouseenter', () => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Click — mobile: abre/fecha via .is-open | desktop: apenas teclado/aria
  // ---------------------------------------------------------------------------
  triggers.forEach((trigger) => {
    const item = trigger.closest('.nav-list__item');
    if (!item) return;

    trigger.addEventListener('click', (e) => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        return;
      }

      const willOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(willOpen));

      triggers.forEach((other) => {
        if (other === trigger) return;
        other.closest('.nav-list__item')?.classList.remove('is-open');
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
