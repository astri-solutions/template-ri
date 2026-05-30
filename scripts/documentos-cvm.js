// =============================================================================
// DOCUMENTOS CVM
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';
import { initAccordion } from './accordion.js';

// ---------------------------------------------------------------------------
// Document data
// ---------------------------------------------------------------------------

const TYPE_ORDER = ['itr', 'dfp', 'fr', 'fc', 'fato', 'comunicado', 'aviso'];

const TYPE_LABELS = {
  itr:        'Informações Trimestrais (ITR)',
  dfp:        'Demonstrações Financeiras (DFP)',
  fr:         'Formulário de Referência',
  fc:         'Formulário Cadastral',
  fato:       'Fatos Relevantes',
  comunicado: 'Comunicados ao Mercado',
  aviso:      'Avisos aos Acionistas',
};

const DOCS = [
  // 2026
  { year: 2026, type: 'itr',        title: 'ITR — 1T26',                                                         date: '14 Mai 2026', size: '2,1 MB' },
  { year: 2026, type: 'fr',         title: 'Formulário de Referência 2026',                                       date: '29 Mai 2026', size: '4,8 MB' },
  { year: 2026, type: 'fc',         title: 'Formulário Cadastral — Atualização 2026',                             date: '15 Jan 2026', size: '0,4 MB' },
  { year: 2026, type: 'fato',       title: 'Fato Relevante — Aprovação de JCP',                                   date: '10 Fev 2026', size: '0,2 MB' },
  { year: 2026, type: 'fato',       title: 'Fato Relevante — Resultado da AGO 2026',                              date: '30 Abr 2026', size: '0,1 MB' },
  { year: 2026, type: 'comunicado', title: 'Comunicado ao Mercado — Calendário de Divulgação de Resultados 2026', date: '10 Jan 2026', size: '0,1 MB' },
  { year: 2026, type: 'aviso',      title: 'Aviso aos Acionistas — Pagamento de JCP',                             date: '10 Fev 2026', size: '0,1 MB' },
  // 2025
  { year: 2025, type: 'itr',        title: 'ITR — 1T25',                                                         date: '12 Mai 2025', size: '1,8 MB' },
  { year: 2025, type: 'itr',        title: 'ITR — 2T25',                                                         date: '11 Ago 2025', size: '1,9 MB' },
  { year: 2025, type: 'itr',        title: 'ITR — 3T25',                                                         date: '10 Nov 2025', size: '2,0 MB' },
  { year: 2025, type: 'dfp',        title: 'DFP — Demonstrações Financeiras Padronizadas 2025',                   date: '12 Fev 2025', size: '3,5 MB' },
  { year: 2025, type: 'fr',         title: 'Formulário de Referência 2025',                                       date: '30 Mai 2025', size: '4,5 MB' },
  { year: 2025, type: 'fc',         title: 'Formulário Cadastral — Atualização 2025',                             date: '12 Jan 2025', size: '0,4 MB' },
  { year: 2025, type: 'fato',       title: 'Fato Relevante — Aprovação de Dividendos',                            date: '12 Fev 2025', size: '0,2 MB' },
  { year: 2025, type: 'fato',       title: 'Fato Relevante — Resultado da AGO 2025',                              date: '29 Abr 2025', size: '0,1 MB' },
  { year: 2025, type: 'comunicado', title: 'Comunicado ao Mercado — Calendário de Divulgação de Resultados 2025', date: '08 Jan 2025', size: '0,1 MB' },
  { year: 2025, type: 'aviso',      title: 'Aviso aos Acionistas — Pagamento de Dividendos',                      date: '12 Fev 2025', size: '0,1 MB' },
  // 2024
  { year: 2024, type: 'itr',        title: 'ITR — 1T24',                                                         date: '13 Mai 2024', size: '1,7 MB' },
  { year: 2024, type: 'itr',        title: 'ITR — 2T24',                                                         date: '12 Ago 2024', size: '1,8 MB' },
  { year: 2024, type: 'itr',        title: 'ITR — 3T24',                                                         date: '11 Nov 2024', size: '1,9 MB' },
  { year: 2024, type: 'dfp',        title: 'DFP — Demonstrações Financeiras Padronizadas 2024',                   date: '14 Fev 2024', size: '3,2 MB' },
  { year: 2024, type: 'fr',         title: 'Formulário de Referência 2024',                                       date: '31 Mai 2024', size: '4,2 MB' },
  { year: 2024, type: 'fc',         title: 'Formulário Cadastral — Atualização 2024',                             date: '10 Jan 2024', size: '0,3 MB' },
  { year: 2024, type: 'fato',       title: 'Fato Relevante — Aprovação de Dividendos',                            date: '14 Fev 2024', size: '0,2 MB' },
  { year: 2024, type: 'fato',       title: 'Fato Relevante — Resultado da AGO 2024',                              date: '30 Abr 2024', size: '0,1 MB' },
  { year: 2024, type: 'comunicado', title: 'Comunicado ao Mercado — Calendário de Divulgação de Resultados 2024', date: '09 Jan 2024', size: '0,1 MB' },
  { year: 2024, type: 'aviso',      title: 'Aviso aos Acionistas — Pagamento de Dividendos',                      date: '14 Fev 2024', size: '0,1 MB' },
  // 2023
  { year: 2023, type: 'itr',        title: 'ITR — 1T23',                                                         date: '15 Mai 2023', size: '1,5 MB' },
  { year: 2023, type: 'itr',        title: 'ITR — 2T23',                                                         date: '14 Ago 2023', size: '1,6 MB' },
  { year: 2023, type: 'itr',        title: 'ITR — 3T23',                                                         date: '13 Nov 2023', size: '1,7 MB' },
  { year: 2023, type: 'dfp',        title: 'DFP — Demonstrações Financeiras Padronizadas 2023',                   date: '15 Fev 2023', size: '3,0 MB' },
  { year: 2023, type: 'fr',         title: 'Formulário de Referência 2023',                                       date: '29 Mai 2023', size: '3,8 MB' },
  { year: 2023, type: 'fc',         title: 'Formulário Cadastral — Atualização 2023',                             date: '11 Jan 2023', size: '0,3 MB' },
  { year: 2023, type: 'fato',       title: 'Fato Relevante — Aprovação de Dividendos',                            date: '15 Fev 2023', size: '0,2 MB' },
  { year: 2023, type: 'comunicado', title: 'Comunicado ao Mercado — Calendário de Divulgação de Resultados 2023', date: '10 Jan 2023', size: '0,1 MB' },
  { year: 2023, type: 'aviso',      title: 'Aviso aos Acionistas — Pagamento de Dividendos',                      date: '15 Fev 2023', size: '0,1 MB' },
];

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

let _uid = 0;
function uid() { return `acc-cvm-${++_uid}`; }

function docListHtml(docs) {
  return `<ul class="doc-list">
    ${docs.map(doc => `
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

function renderList(year) {
  const container = document.querySelector('[data-cvm-list]');
  if (!container) return;

  const yearDocs = DOCS.filter(d => d.year === year);

  if (!yearDocs.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--color-text-muted);padding:3rem 0">Nenhum documento disponível para ${year}.</p>`;
    return;
  }

  // Group by type in display order
  const groups = TYPE_ORDER
    .map(type => ({ type, docs: yearDocs.filter(d => d.type === type) }))
    .filter(g => g.docs.length > 0);

  // Render accordion — first group opens by default
  const accId = uid();
  container.innerHTML = `<div class="accordion" data-accordion id="${accId}">
    ${groups.map(({ type, docs }, i) => {
      const contentId = uid();
      return `<div class="accordion__item" data-accordion-item>
        <button class="accordion__trigger" data-accordion-trigger aria-expanded="false" aria-controls="${contentId}">
          <span class="accordion__label">${TYPE_LABELS[type]}</span>
        </button>
        <div class="accordion__content" id="${contentId}" role="region">
          <div class="accordion__body">
            ${docListHtml(docs)}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;

  // Initialize accordion JS on the freshly rendered element
  const accEl = container.querySelector('[data-accordion]');
  if (accEl) {
    // Open first item
    accEl.dataset.accordionOpen = '0';
    initAccordion(accEl);
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.querySelector('[data-cvm-year]');
  const currentYear = new Date().getFullYear();

  if (sel) {
    sel.value = String(currentYear);
    sel.addEventListener('change', e => renderList(Number(e.target.value)));
  }

  renderList(currentYear);
});
