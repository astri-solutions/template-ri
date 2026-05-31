// =============================================================================
// ESTATUTO, POLÍTICAS E REGIMENTOS
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';
import { initAccordion } from './accordion.js';

// ---------------------------------------------------------------------------
// Document data
// ---------------------------------------------------------------------------

const GROUP_ORDER = ['estatuto', 'politicas', 'regimentos', 'outros'];

const GROUP_LABELS = {
  estatuto:   'Estatuto Social',
  politicas:  'Políticas Corporativas',
  regimentos: 'Regimentos Internos',
  outros:     'Outros Documentos',
};

const DOCS = [
  // Estatuto Social
  { group: 'estatuto', title: 'Estatuto Social — Versão Vigente',                   date: '30 Abr 2026', size: '0,8 MB' },
  { group: 'estatuto', title: 'Estatuto Social — Versão 2024',                      date: '25 Abr 2024', size: '0,8 MB' },
  { group: 'estatuto', title: 'Estatuto Social — Versão 2023',                      date: '28 Abr 2023', size: '0,7 MB' },

  // Políticas Corporativas
  { group: 'politicas', title: 'Política de Divulgação de Informações',              date: '15 Jan 2026', size: '0,3 MB' },
  { group: 'politicas', title: 'Política de Negociação de Valores Mobiliários',      date: '15 Jan 2026', size: '0,3 MB' },
  { group: 'politicas', title: 'Política de Gerenciamento de Riscos',                date: '20 Mar 2025', size: '0,5 MB' },
  { group: 'politicas', title: 'Política Antisuborno e Anticorrupção',               date: '10 Fev 2025', size: '0,4 MB' },
  { group: 'politicas', title: 'Política de Responsabilidade Socioambiental',        date: '05 Jan 2025', size: '0,6 MB' },
  { group: 'politicas', title: 'Política de Remuneração dos Administradores',        date: '30 Abr 2024', size: '0,3 MB' },
  { group: 'politicas', title: 'Política de Transações com Partes Relacionadas',     date: '10 Mar 2024', size: '0,4 MB' },

  // Regimentos Internos
  { group: 'regimentos', title: 'Regimento Interno do Conselho de Administração',    date: '30 Abr 2026', size: '0,5 MB' },
  { group: 'regimentos', title: 'Regimento Interno do Comitê de Auditoria',          date: '30 Abr 2026', size: '0,4 MB' },
  { group: 'regimentos', title: 'Regimento Interno do Comitê de Remuneração',        date: '30 Abr 2025', size: '0,4 MB' },
  { group: 'regimentos', title: 'Regimento Interno do Conselho Fiscal',              date: '28 Abr 2023', size: '0,4 MB' },

  // Outros
  { group: 'outros', title: 'Código de Ética e Conduta',                             date: '10 Jan 2026', size: '1,2 MB' },
  { group: 'outros', title: 'Carta Anual de Governança Corporativa 2025',            date: '31 Mar 2026', size: '0,9 MB' },
  { group: 'outros', title: 'Carta Anual de Governança Corporativa 2024',            date: '28 Mar 2025', size: '0,8 MB' },
];

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

let _uid = 0;
function uid() { return `acc-ep-${++_uid}`; }

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

function renderList() {
  const container = document.querySelector('[data-ep-list]');
  if (!container) return;

  const groups = GROUP_ORDER
    .map(group => ({ group, docs: DOCS.filter(d => d.group === group) }))
    .filter(g => g.docs.length > 0);

  const accId = uid();
  container.innerHTML = `<div class="accordion" data-accordion id="${accId}">
    ${groups.map(({ group, docs }) => {
      const contentId = uid();
      return `<div class="accordion__item" data-accordion-item>
        <button class="accordion__trigger" data-accordion-trigger aria-expanded="false" aria-controls="${contentId}">
          <span class="accordion__label">${GROUP_LABELS[group]}</span>
        </button>
        <div class="accordion__content" id="${contentId}" role="region">
          <div class="accordion__body">
            ${docListHtml(docs)}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;

  const accEl = container.querySelector('[data-accordion]');
  if (accEl) {
    accEl.dataset.accordionOpen = '0';
    initAccordion(accEl);
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  renderList();
});
