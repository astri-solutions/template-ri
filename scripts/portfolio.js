import './topbar.js';
import './nav.js';
import './reveal.js';

// Filtro de setor
function initSectorFilter() {
  const filterGroup = document.querySelector('[data-pf-filter]');
  const grid = document.querySelector('[data-pf-grid]');
  if (!filterGroup || !grid) return;

  const cards = [...grid.querySelectorAll('[data-sector]')];
  const buttons = [...filterGroup.querySelectorAll('[data-sector]')];

  filterGroup.addEventListener('click', e => {
    const btn = e.target.closest('[data-sector]');
    if (!btn) return;

    const sector = btn.dataset.sector;

    buttons.forEach(b => b.classList.toggle('is-active', b === btn));

    cards.forEach(card => {
      const match = sector === 'todos' || card.dataset.sector === sector;
      card.hidden = !match;
    });
  });
}

initSectorFilter();
