// =============================================================================
// CENTRAL DE RESULTADOS — tabela trimestral por ano
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';
import './accordion.js';

const ROW_DEFINITIONS = [
  { name: 'Teleconferência de Resultados' },
  { name: 'Áudio Teleconferência'         },
  { name: 'Vídeo'                         },
  { name: 'Apresentação'                  },
  { name: 'ITR'                           },
  { name: 'DFP'                           },
  { name: 'Release de Resultados'         },
];

// Trimestres em ordem crescente (1T → 4T), como na tabela de referência
const QUARTER_ORDER = ['1T', '2T', '3T', '4T'];

const AVAILABILITY = {
  2026: { '1T': true,  '2T': false, '3T': false, '4T': false },
  2025: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2024: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2023: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
  2022: { '1T': true,  '2T': true,  '3T': true,  '4T': true  },
};

// Ícone de download — seta para baixo com linha de base
const DOWNLOAD_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 3v13"/>
  <path d="M7 11l5 5 5-5"/>
  <line x1="5" y1="20" x2="19" y2="20"/>
</svg>`;

// -----------------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------------

function renderHead(year) {
  const headRow = document.querySelector('[data-results-head]');
  if (!headRow) return;

  const shortYear = String(year).slice(-2);
  headRow.innerHTML =
    `<th scope="col">${year}</th>` +
    QUARTER_ORDER.map((q) => `<th scope="col">${q}${shortYear}</th>`).join('');
}

function renderBody(year) {
  const tbody = document.querySelector('[data-results-body]');
  if (!tbody) return;

  const availability = AVAILABILITY[year] || { '1T': false, '2T': false, '3T': false, '4T': false };
  const shortYear = String(year).slice(-2);

  tbody.innerHTML = ROW_DEFINITIONS.map((row) => {
    const cells = QUARTER_ORDER.map((q) => {
      const available = availability[q];
      const label = `${row.name} — ${q}${shortYear}`;
      const filename = `${row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${q.toLowerCase()}${shortYear}`;

      if (available) {
        return `<td>
          <a class="file-icon file-icon--download" href="#${filename}" aria-label="${label}" title="${label}" download>
            ${DOWNLOAD_ICON}
          </a>
        </td>`;
      }

      return `<td>
        <span class="file-icon file-icon--download-na" aria-label="Não disponível" title="Não disponível">
          ${DOWNLOAD_ICON}
        </span>
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
