// =============================================================================
// CENTRAL DE RESULTADOS — Versão 1
//
// Estrutura (conforme briefing):
//   - Cabeçalho com primeira célula em branco, depois 4T(ano), 3T(ano),
//     2T(ano), 1T(ano) — ordem decrescente.
//   - Linhas:
//       Teleconferência, Apresentação, ITR, DFP, Vídeo, Transcrição
//     com ícones por tipo de arquivo.
// =============================================================================

/**
 * Mapeamento das linhas da tabela. Cada item define o nome do documento
 * e o tipo de ícone que será exibido nas colunas de trimestre.
 *
 * Quando você for ligar a um back-end real, troque este array por uma
 * estrutura que inclua a URL de download por (ano, trimestre).
 */
const ROW_DEFINITIONS = [
  { name: 'Teleconferência', type: 'audio' },
  { name: 'Apresentação',    type: 'ppt'   },
  { name: 'ITR',             type: 'pdf'   },
  { name: 'DFP',             type: 'pdf'   },
  { name: 'Vídeo',           type: 'video' },
  { name: 'Transcrição',     type: 'doc'   },
];

/**
 * Disponibilidade dos arquivos por ano e trimestre.
 *   true  → o arquivo existe (renderiza ícone clicável)
 *   false → o arquivo não existe (renderiza traço)
 *
 * Por padrão estou marcando 2025 com apenas 1T/2T disponíveis e os
 * anos anteriores completos. Ajuste conforme os arquivos reais.
 */
const AVAILABILITY = {
  2025: { '1T': true,  '2T': true,  '3T': false, '4T': false },
  2024: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2023: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2022: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
};

// Ordem de exibição dos trimestres (decrescente): 4T → 3T → 2T → 1T
const QUARTER_ORDER = ['4T', '3T', '2T', '1T'];

// -----------------------------------------------------------------------------
// ÍCONES SVG inline — monocromáticos, herdam currentColor
// -----------------------------------------------------------------------------

const FILE_ICONS = {
  pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
          <path d="M14 3v5h5"/>
          <text x="12" y="17" text-anchor="middle" font-size="5" font-family="Inter, sans-serif" font-weight="700" fill="currentColor" stroke="none">PDF</text>
        </svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
          <path d="M14 3v5h5"/>
          <line x1="8" y1="13" x2="16" y2="13"/>
          <line x1="8" y1="16" x2="16" y2="16"/>
          <line x1="8" y1="19" x2="13" y2="19"/>
        </svg>`,
  ppt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="1.5"/>
          <line x1="12" y1="16" x2="12" y2="20"/>
          <line x1="8"  y1="20" x2="16" y2="20"/>
          <circle cx="12" cy="10" r="2.5"/>
        </svg>`,
  audio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 18V8l9-4v10"/>
            <circle cx="6"  cy="18" r="3"/>
            <circle cx="15" cy="14" r="3"/>
          </svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="6" width="14" height="12" rx="2"/>
            <path d="M22 8l-6 4 6 4z"/>
          </svg>`,
};

const TYPE_LABEL = {
  pdf: 'PDF', doc: 'Word', ppt: 'PowerPoint', audio: 'Áudio', video: 'Vídeo',
};

// -----------------------------------------------------------------------------
// RENDER
// -----------------------------------------------------------------------------

function renderHead(year) {
  const headRow = document.querySelector('[data-results-head]');
  if (!headRow) return;

  // Primeira célula em branco + 4T(ano), 3T(ano), 2T(ano), 1T(ano)
  headRow.innerHTML =
    '<th scope="col"><span class="sr-only">Documento</span></th>' +
    QUARTER_ORDER.map((q) => `<th scope="col">${q}${year}</th>`).join('');
}

function renderBody(year) {
  const tbody = document.querySelector('[data-results-body]');
  if (!tbody) return;

  const availability = AVAILABILITY[year] || { '1T': false, '2T': false, '3T': false, '4T': false };

  tbody.innerHTML = ROW_DEFINITIONS.map((row) => {
    const cells = QUARTER_ORDER.map((q) => {
      const available = availability[q];

      if (!available) {
        return `<td>
          <span class="file-icon file-icon--empty" aria-hidden="true">—</span>
          <span class="sr-only">Não disponível</span>
        </td>`;
      }

      const icon = FILE_ICONS[row.type] || FILE_ICONS.doc;
      const label = `${row.name} — ${q}${year} · ${TYPE_LABEL[row.type] || row.type}`;
      const filename = `${row.name.toLowerCase().replace(/\s+/g, '-')}-${q.toLowerCase()}${year}`;

      return `<td>
        <a class="file-icon file-icon--${row.type}" href="#${filename}" aria-label="${label}" title="${label}" download>
          ${icon}
        </a>
      </td>`;
    }).join('');

    return `<tr><td>${row.name}</td>${cells}</tr>`;
  }).join('');
}

function render(year) {
  renderHead(year);
  renderBody(year);
}

// -----------------------------------------------------------------------------
// INIT
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('[data-results-filter]');
  if (!select) return;

  render(select.value);
  select.addEventListener('change', (e) => render(e.target.value));
});
