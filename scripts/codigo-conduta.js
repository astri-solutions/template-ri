// =============================================================================
// CÓDIGO DE CONDUTA E ÉTICA
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';

// ---------------------------------------------------------------------------
// Document data
// ---------------------------------------------------------------------------

const TYPE_LABELS = {
  codigo:    'Código de Conduta',
  politica:  'Política',
  manual:    'Manual',
  relatorio: 'Relatório',
};

const DOCS = [
  // Código de Conduta
  { year: 2026, type: 'codigo',    title: 'Código de Conduta e Ética — Versão 2026',                    date: '15 Jan 2026', size: '1,2 MB' },
  { year: 2025, type: 'codigo',    title: 'Código de Conduta e Ética — Versão 2025',                    date: '10 Jan 2025', size: '1,1 MB' },
  { year: 2024, type: 'codigo',    title: 'Código de Conduta e Ética — Versão 2024',                    date: '08 Jan 2024', size: '1,0 MB' },
  { year: 2023, type: 'codigo',    title: 'Código de Conduta e Ética — Versão 2023',                    date: '05 Jan 2023', size: '0,9 MB' },
  // Políticas
  { year: 2026, type: 'politica',  title: 'Política Antisuborno e Anticorrupção',                       date: '15 Jan 2026', size: '0,4 MB' },
  { year: 2026, type: 'politica',  title: 'Política de Canal de Denúncias',                             date: '15 Jan 2026', size: '0,3 MB' },
  { year: 2025, type: 'politica',  title: 'Política de Direitos Humanos',                               date: '20 Mar 2025', size: '0,5 MB' },
  { year: 2025, type: 'politica',  title: 'Política de Diversidade e Inclusão',                         date: '10 Fev 2025', size: '0,4 MB' },
  { year: 2024, type: 'politica',  title: 'Política de Prevenção à Lavagem de Dinheiro',                date: '12 Mar 2024', size: '0,6 MB' },
  // Manuais
  { year: 2025, type: 'manual',    title: 'Manual de Integridade Corporativa',                          date: '05 Fev 2025', size: '2,3 MB' },
  { year: 2024, type: 'manual',    title: 'Manual de Canal de Denúncias',                               date: '15 Jan 2024', size: '0,8 MB' },
  // Relatórios
  { year: 2026, type: 'relatorio', title: 'Relatório Anual do Comitê de Ética 2025',                    date: '28 Fev 2026', size: '1,5 MB' },
  { year: 2025, type: 'relatorio', title: 'Relatório Anual do Comitê de Ética 2024',                    date: '28 Fev 2025', size: '1,3 MB' },
  { year: 2024, type: 'relatorio', title: 'Relatório Anual do Comitê de Ética 2023',                    date: '28 Fev 2024', size: '1,2 MB' },
];

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

function renderList(year, type) {
  const container = document.querySelector('[data-cc-list]');
  if (!container) return;

  let filtered = DOCS.filter(d => d.year === year);
  if (type !== 'todos') filtered = filtered.filter(d => d.type === type);

  if (!filtered.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--color-text-muted);padding:3rem 0">Nenhum documento disponível para os filtros selecionados.</p>`;
    return;
  }

  container.innerHTML = `<ul class="doc-list">
    ${filtered.map(doc => `
      <li class="doc-list__item">
        <span class="doc-list__badge doc-list__badge--pdf">PDF</span>
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

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const yearSel = document.querySelector('[data-cc-year]');
  const typeSel = document.querySelector('[data-cc-type]');
  const currentYear = new Date().getFullYear();

  let activeYear = currentYear;
  let activeType = 'todos';

  if (yearSel) {
    yearSel.value = String(currentYear);
    yearSel.addEventListener('change', e => {
      activeYear = Number(e.target.value);
      renderList(activeYear, activeType);
    });
  }

  if (typeSel) {
    typeSel.addEventListener('change', e => {
      activeType = e.target.value;
      renderList(activeYear, activeType);
    });
  }

  renderList(activeYear, activeType);
});
