// =============================================================================
// DIVIDENDOS E RECOMPRA DE AÇÕES
// Lê dados de /documentos/dividendos-recompra.xlsx via SheetJS e renderiza
// gráfico Chart.js + tabelas dinâmicas.
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';

Chart.register(...registerables);

// ---------------------------------------------------------------------------
// Constantes de cor (mapeadas nos tokens CSS)
// ---------------------------------------------------------------------------
const C_JCP       = '#0B5B68'; // color-secondary-700
const C_DIV       = '#00D865'; // color-primary-500
const C_GRID      = 'rgba(0,0,0,0.07)';
const C_TICK      = '#6B7280';
const FONT_FAMILY = "'Inter', 'Plus Jakarta Sans', sans-serif";

// ---------------------------------------------------------------------------
// Estado
// ---------------------------------------------------------------------------
let allDividendos = [];
let allRecompra   = [];
let chartInstance = null;
let activeYear    = null; // null = todos

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------
function fmtDate(v) {
  if (!v) return '—';
  if (typeof v === 'number') {
    // Excel serial date
    const d = XLSX.SSF.parse_date_code(v);
    return `${String(d.d).padStart(2,'0')}/${String(d.m).padStart(2,'0')}/${d.y}`;
  }
  if (typeof v === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [y, m, d] = v.split('-');
    return `${d}/${m}/${y}`;
  }
  return v;
}

function fmtNum(n) {
  return Number(n).toLocaleString('pt-BR');
}

// ---------------------------------------------------------------------------
// Carrega o Excel
// ---------------------------------------------------------------------------
async function loadData() {
  const res = await fetch('/documentos/dividendos-recompra.xlsx');
  if (!res.ok) throw new Error(`HTTP ${res.status} ao carregar planilha`);
  const buf = await res.arrayBuffer();
  const wb  = XLSX.read(buf, { type: 'array', cellDates: false });

  allDividendos = XLSX.utils.sheet_to_json(wb.Sheets['Dividendos'] || wb.Sheets[wb.SheetNames[0]]);
  allRecompra   = XLSX.utils.sheet_to_json(wb.Sheets['Recompra']   || wb.Sheets[wb.SheetNames[1]] || []);
}

// ---------------------------------------------------------------------------
// Gráfico — barras empilhadas por ano
// ---------------------------------------------------------------------------
function buildChartData() {
  const years = [...new Set(allDividendos.map(d => d.Ano))].sort();

  const jcpByYear = {};
  const divByYear = {};
  years.forEach(y => { jcpByYear[y] = 0; divByYear[y] = 0; });

  allDividendos.forEach(d => {
    if (d.Tipo === 'JCP')       jcpByYear[d.Ano] = +(jcpByYear[d.Ano] + d.ValorPorAcao).toFixed(4);
    if (d.Tipo === 'Dividendo') divByYear[d.Ano] = +(divByYear[d.Ano] + d.ValorPorAcao).toFixed(4);
  });

  return {
    labels: years.map(String),
    datasets: [
      {
        label: 'JCP',
        data: years.map(y => jcpByYear[y]),
        backgroundColor: C_JCP,
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 4, bottomRight: 4 },
        borderSkipped: false,
        stack: 'provento',
      },
      {
        label: 'Dividendo',
        data: years.map(y => divByYear[y]),
        backgroundColor: C_DIV,
        borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
        borderSkipped: false,
        stack: 'provento',
      },
    ],
  };
}

function renderChart() {
  const canvas = document.getElementById('div-chart');
  if (!canvas) return;

  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

  chartInstance = new Chart(canvas, {
    type: 'bar',
    data: buildChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'rectRounded',
            color: C_TICK,
            font: { family: FONT_FAMILY, size: 12 },
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: '#fff',
          borderColor: '#E5E7EB',
          borderWidth: 1,
          titleColor: '#111827',
          bodyColor: '#6B7280',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: R$ ${ctx.parsed.y.toFixed(4)}/ação`,
            footer: items => {
              const total = items.reduce((s, i) => s + i.parsed.y, 0);
              return `Total: R$ ${total.toFixed(4)}/ação`;
            },
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          border: { display: false },
          ticks: { color: C_TICK, font: { family: FONT_FAMILY, size: 12 } },
        },
        y: {
          stacked: true,
          grid: { color: C_GRID },
          border: { display: false },
          ticks: {
            color: C_TICK,
            font: { family: FONT_FAMILY, size: 11 },
            callback: v => `R$ ${v.toFixed(2)}`,
          },
        },
      },
    },
  });
}

// ---------------------------------------------------------------------------
// KPIs
// ---------------------------------------------------------------------------
function updateKpis() {
  const now  = new Date();
  const cutoff = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const last12 = allDividendos.filter(d => new Date(d.DataPagamento) >= cutoff);

  const totalDistrib  = allDividendos.reduce((s, d) => s + d.TotalDistribuido, 0);
  const perAcaoUlt12  = last12.reduce((s, d) => s + d.ValorPorAcao, 0);
  const totalUlt12    = last12.reduce((s, d) => s + d.TotalDistribuido, 0);
  const qtdDists      = allDividendos.length;

  setKpi('total',    `R$ ${totalDistrib.toFixed(0)} mi`);
  setKpi('ult12',    `R$ ${totalUlt12.toFixed(0)} mi`);
  setKpi('provento', `R$ ${perAcaoUlt12.toFixed(4)}`);
  setKpi('count',    `${qtdDists} distribuições`);
}

function setKpi(key, val) {
  const el = document.querySelector(`[data-kpi="${key}"]`);
  if (el) el.textContent = val;
}

// ---------------------------------------------------------------------------
// Tabela de dividendos
// ---------------------------------------------------------------------------
const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

function renderDivTable(year) {
  const tbody = document.querySelector('[data-div-tbody]');
  if (!tbody) return;

  const rows = allDividendos
    .filter(d => !year || d.Ano === year)
    .sort((a, b) => b.DataPagamento.localeCompare(a.DataPagamento));

  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="div-table__empty">Nenhum dado para ${year}.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(d => `
    <tr>
      <td>${d.Periodo}</td>
      <td><span class="div-tag div-tag--${d.Tipo === 'JCP' ? 'jcp' : 'div'}">${d.Tipo}</span></td>
      <td class="mono">R$ ${d.ValorPorAcao.toFixed(4)}</td>
      <td class="mono">${fmtDate(d.DataBase)}</td>
      <td class="mono">${fmtDate(d.DataPagamento)}</td>
      <td class="mono">R$ ${d.TotalDistribuido.toFixed(1)} mi</td>
    </tr>
  `).join('');
}

// ---------------------------------------------------------------------------
// Tabela de recompra
// ---------------------------------------------------------------------------
function renderRecompraKpis() {
  const total  = allRecompra.reduce((s, r) => s + r.TotalGasto, 0);
  const qtdAut = allRecompra.reduce((s, r) => s + r.QtdAutorizada, 0);
  const qtdRec = allRecompra.reduce((s, r) => s + r.QtdRecomprada, 0);

  setKpi('rec-total',   `R$ ${total.toFixed(0)} mi`);
  setKpi('rec-qtd-aut', fmtNum(qtdAut));
  setKpi('rec-qtd-rec', fmtNum(qtdRec));
  setKpi('rec-pct',     `${((qtdRec / qtdAut) * 100).toFixed(1)}%`);
}

function renderRecompraTable() {
  const tbody = document.querySelector('[data-recompra-tbody]');
  if (!tbody) return;

  tbody.innerHTML = allRecompra.map(r => {
    const pct     = ((r.QtdRecomprada / r.QtdAutorizada) * 100).toFixed(1);
    const isAtivo = r.Status === 'Em andamento';
    return `
      <tr>
        <td>${r.Programa}</td>
        <td class="mono">${fmtDate(r.Inicio)}</td>
        <td class="mono">${fmtDate(r.Termino)}</td>
        <td class="mono">${fmtNum(r.QtdAutorizada)}</td>
        <td class="mono">${fmtNum(r.QtdRecomprada)}</td>
        <td>
          <div class="div-progress">
            <div class="div-progress__bar" style="width:${pct}%"></div>
          </div>
          <span class="div-progress__label">${pct}%</span>
        </td>
        <td class="mono">R$ ${Number(r.TotalGasto).toFixed(1)} mi</td>
        <td class="mono">R$ ${Number(r.PrecoMedio).toFixed(2)}</td>
        <td><span class="div-status div-status--${isAtivo ? 'active' : 'done'}">${r.Status}</span></td>
      </tr>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// Filtro de ano
// ---------------------------------------------------------------------------
function buildYearOptions() {
  const years = [...new Set(allDividendos.map(d => d.Ano))].sort((a, b) => b - a);
  const sel   = document.querySelector('[data-div-year]');
  if (!sel) return;

  sel.innerHTML =
    `<option value="">Todos</option>` +
    years.map(y => `<option value="${y}">${y}</option>`).join('');

  sel.addEventListener('change', e => {
    const y = e.target.value ? Number(e.target.value) : null;
    activeYear = y;
    renderDivTable(y);
  });
}

// ---------------------------------------------------------------------------
// Download link
// ---------------------------------------------------------------------------
function initDownload() {
  const link = document.querySelector('[data-div-download]');
  if (link) link.href = '/documentos/dividendos-recompra.xlsx';
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('[data-div-main]');

  try {
    await loadData();

    buildYearOptions();
    updateKpis();
    renderChart();
    renderDivTable(null);
    renderRecompraKpis();
    renderRecompraTable();
    initDownload();
  } catch (err) {
    console.error('[dividendos] Erro ao carregar planilha:', err);
    if (container) {
      container.innerHTML = `<p style="text-align:center;padding:3rem;color:var(--color-text-muted)">
        Não foi possível carregar os dados. Por favor, recarregue a página.
      </p>`;
    }
  }
});
