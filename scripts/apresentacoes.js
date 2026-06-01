import './topbar.js';
import './nav.js';
import './reveal.js';

// ─── Dados ───────────────────────────────────────────────────────────────────

const DOCS = [
  // 2026
  { year: '2026', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 1T26',                    date: '14 Mai 2026', size: '3,2 MB' },
  { year: '2026', tipo: 'institucional', formato: 'pdf', title: 'Investor Day 2026 — Estratégia e Perspectivas',      date: '18 Mar 2026', size: '8,5 MB' },

  // 2025
  { year: '2025', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 4T25 e 2025',             date: '12 Fev 2026', size: '4,1 MB' },
  { year: '2025', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 3T25',                    date: '13 Nov 2025', size: '3,7 MB' },
  { year: '2025', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 2T25',                    date: '14 Ago 2025', size: '3,5 MB' },
  { year: '2025', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 1T25',                    date: '14 Mai 2025', size: '3,3 MB' },
  { year: '2025', tipo: 'institucional', formato: 'pdf', title: 'Apresentação Institucional — XP Expert 2025',        date: '22 Set 2025', size: '5,6 MB' },
  { year: '2025', tipo: 'institucional', formato: 'pdf', title: 'Apresentação Institucional — BTG CEO Conference',    date: '10 Jun 2025', size: '4,8 MB' },
  { year: '2025', tipo: 'institucional', formato: 'pdf', title: 'Apresentação Institucional — Itaú BBA LatAm',        date: '04 Mar 2025', size: '4,2 MB' },

  // 2024
  { year: '2024', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 4T24 e 2024',             date: '13 Fev 2025', size: '4,0 MB' },
  { year: '2024', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 3T24',                    date: '14 Nov 2024', size: '3,6 MB' },
  { year: '2024', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 2T24',                    date: '14 Ago 2024', size: '3,4 MB' },
  { year: '2024', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 1T24',                    date: '15 Mai 2024', size: '3,1 MB' },
  { year: '2024', tipo: 'institucional', formato: 'pdf', title: 'Investor Day 2024 — Plano Estratégico 2024–2027',    date: '20 Mar 2024', size: '9,2 MB' },
  { year: '2024', tipo: 'institucional', formato: 'pdf', title: 'Apresentação Institucional — Bank of America',       date: '05 Nov 2024', size: '4,7 MB' },

  // 2023
  { year: '2023', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 4T23 e 2023',             date: '14 Fev 2024', size: '3,8 MB' },
  { year: '2023', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 3T23',                    date: '14 Nov 2023', size: '3,4 MB' },
  { year: '2023', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 2T23',                    date: '15 Ago 2023', size: '3,2 MB' },
  { year: '2023', tipo: 'resultado',     formato: 'pdf', title: 'Apresentação de Resultados 1T23',                    date: '15 Mai 2023', size: '3,0 MB' },
  { year: '2023', tipo: 'institucional', formato: 'pdf', title: 'Apresentação Institucional — JPMorgan EM Summit',    date: '08 Nov 2023', size: '5,1 MB' },
  { year: '2023', tipo: 'institucional', formato: 'pdf', title: 'Apresentação Institucional — Goldman Sachs Brasil',  date: '22 Jun 2023', size: '4,5 MB' },
];

// ─── Estado ──────────────────────────────────────────────────────────────────

let activeYear = 'todos';
let activeTipo = 'todos';

// ─── Utilitários ─────────────────────────────────────────────────────────────

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

// ─── Render ──────────────────────────────────────────────────────────────────

function render() {
  const list = document.querySelector('[data-ap-list]');
  const count = document.querySelector('[data-ap-count]');
  if (!list) return;

  let docs = DOCS;
  if (activeYear !== 'todos') docs = docs.filter(d => d.year === activeYear);
  if (activeTipo !== 'todos') docs = docs.filter(d => d.tipo === activeTipo);

  if (count) count.textContent = `${docs.length} documento${docs.length !== 1 ? 's' : ''}`;

  if (docs.length === 0) {
    list.innerHTML = `<p class="doc-list__empty">Nenhum documento encontrado para os filtros selecionados.</p>`;
    return;
  }

  list.innerHTML = `<ul class="doc-list">
    ${docs.map(doc => `
      <li class="doc-list__item">
        <span class="doc-list__badge doc-list__badge--${doc.formato}">${doc.formato.toUpperCase()}</span>
        <div class="doc-list__info">
          <span class="doc-list__name">${doc.title}</span>
          <span class="doc-list__meta">${doc.date} · ${doc.size}</span>
        </div>
        <a class="doc-list__btn" href="#" download aria-label="Baixar ${doc.title}">
          ${ICON_DOWNLOAD}
        </a>
      </li>
    `).join('')}
  </ul>`;
}

// ─── Filtros ─────────────────────────────────────────────────────────────────

document.querySelector('[data-ap-year]')?.addEventListener('change', e => {
  activeYear = e.target.value;
  render();
});

document.querySelector('[data-ap-tipo]')?.addEventListener('change', e => {
  activeTipo = e.target.value;
  render();
});

render();
