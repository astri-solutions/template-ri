// =============================================================================
// NAV — Drawer mobile (slide-in left) + Dropdowns + Scroll behavior
// =============================================================================

document.addEventListener('DOMContentLoaded', initNav);

function initNav() {
  const header    = document.querySelector('.site-header');
  const hamburger = document.querySelector('[data-nav-hamburger]');
  const nav       = document.querySelector('[data-nav]');
  const overlay   = document.querySelector('[data-nav-overlay]');
  const closeBtn  = document.querySelector('[data-nav-close]');
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
          closeDrawer(); // fecha drawer ao esconder header
        } else if (current < lastScrollY - 4) {
          header.classList.remove('is-hidden');
        }
        lastScrollY = current;
        ticking = false;
      });
    }, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // Helpers para abrir/fechar o drawer
  // ---------------------------------------------------------------------------
  function openDrawer() {
    nav?.classList.add('is-open');
    overlay?.classList.add('is-open');
    hamburger?.setAttribute('aria-expanded', 'true');
    hamburger?.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    nav?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';

    triggers.forEach((trigger) => {
      trigger.closest('.nav-list__item')?.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  // ---------------------------------------------------------------------------
  // Hamburger — abre drawer
  // ---------------------------------------------------------------------------
  hamburger?.addEventListener('click', () => {
    const isOpen = nav?.classList.contains('is-open');
    isOpen ? closeDrawer() : openDrawer();
  });

  // ---------------------------------------------------------------------------
  // Botão fechar dentro do drawer
  // ---------------------------------------------------------------------------
  closeBtn?.addEventListener('click', closeDrawer);

  // ---------------------------------------------------------------------------
  // Overlay — clique fecha drawer
  // ---------------------------------------------------------------------------
  overlay?.addEventListener('click', closeDrawer);

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
  // Click nos triggers — mobile: expande sub-menu | desktop: apenas aria
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
    closeDrawer();
    closeSearch();
  });

  // ---------------------------------------------------------------------------
  // Search overlay
  // ---------------------------------------------------------------------------
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput   = document.querySelector('[data-search-input]');

  function openSearch() {
    searchOverlay?.classList.add('is-open');
    searchOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    searchInput?.focus();
  }

  function closeSearch() {
    searchOverlay?.classList.remove('is-open');
    searchOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelector('[data-search-toggle]')?.addEventListener('click', openSearch);
  document.querySelector('[data-search-close]')?.addEventListener('click', closeSearch);
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay || e.target === searchOverlay.firstElementChild) closeSearch();
  });
}
