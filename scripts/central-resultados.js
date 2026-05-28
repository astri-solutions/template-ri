// =============================================================================
// CENTRAL DE RESULTADOS — tabela trimestral por ano
// =============================================================================

const ROW_DEFINITIONS = [
  { name: 'Apresentação de Resultados',        type: 'pdf'   },
  { name: 'Áudio Teleconferência',              type: 'audio' },
  { name: 'ITR/DFP',                            type: 'pdf'   },
  { name: 'Demonstrações Financeiras - BRGAAP', type: 'pdf'   },
  { name: 'Demonstrações Financeiras - IFRS',   type: 'pdf'   },
  { name: 'Release de Resultados',              type: 'pdf'   },
  { name: 'Séries Históricas',                  type: 'pdf'   },
  { name: 'Transcrição',                        type: 'pdf'   },
];

const AVAILABILITY = {
  2026: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2025: { '1T': true,  '2T': true,  '3T': false, '4T': false },
  2024: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2023: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2022: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
};

const QUARTER_ORDER = ['4T', '3T', '2T', '1T'];

// -----------------------------------------------------------------------------
// Ícones SVG inline (monocromáticos, herdam currentColor)
// -----------------------------------------------------------------------------

const FILE_ICONS = {
  pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
          <path d="M14 3v5h5"/>
          <text x="12" y="17" text-anchor="middle" font-size="5" font-family="Inter, sans-serif" font-weight="700" fill="currentColor" stroke="none">PDF</text>
        </svg>`,
  audio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 18V8l9-4v10"/>
            <circle cx="6"  cy="18" r="3"/>
            <circle cx="15" cy="14" r="3"/>
          </svg>`,
};

const TYPE_LABEL = { pdf: 'PDF', audio: 'Áudio' };

// -----------------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------------

function renderHead(year) {
  const headRow = document.querySelector('[data-results-head]');
  if (!headRow) return;

  headRow.innerHTML =
    '<th scope="col"><span class="sr-only">Documento</span></th>' +
    QUARTER_ORDER.map((q) => `<th scope="col">${q}${String(year).slice(-2)}</th>`).join('');
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

      const icon = FILE_ICONS[row.type] || FILE_ICONS.pdf;
      const shortYear = String(year).slice(-2);
      const label = `${row.name} — ${q}${shortYear} · ${TYPE_LABEL[row.type] || row.type}`;
      const filename = `${row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${q.toLowerCase()}${shortYear}`;

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
// Init
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('[data-results-filter]');
  if (!select) return;

  render(select.value);
  select.addEventListener('change', (e) => render(e.target.value));
});
