// =============================================================================
// SPLASH — modal de aviso exibido ao carregar a página
//
// Uso:
//   import { initSplash } from './splash.js';
//   initSplash();  → abre automaticamente ao carregar
//
// HTML mínimo:
//   <div class="splash" id="splash" data-splash aria-hidden="true" role="dialog">
//     <div class="splash__backdrop" data-splash-backdrop></div>
//     <div class="splash__dialog">
//       <div class="splash__header">…</div>
//       <button class="splash__close" data-splash-close>…</button>
//       <div class="splash__body">…</div>
//     </div>
//   </div>
// =============================================================================

const OPEN_DELAY = 400; // ms antes de abrir ao carregar a página

export function initSplash(root) {
  if (!root) return;

  const closeBtn  = root.querySelector('[data-splash-close]');
  const backdrop  = root.querySelector('[data-splash-backdrop]');
  const dismissBtns = root.querySelectorAll('[data-splash-dismiss]');

  function open() {
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function close() {
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  dismissBtns.forEach(btn => btn.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) close();
  });

  return { open, close };
}

// Auto-init: abre splash após OPEN_DELAY se [data-splash-auto] presente
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-splash]');
  if (!root) return;

  const ctrl = initSplash(root);

  if (root.hasAttribute('data-splash-auto')) {
    setTimeout(() => ctrl.open(), OPEN_DELAY);
  }
});
