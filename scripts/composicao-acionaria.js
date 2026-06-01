import './topbar.js';
import './nav.js';
import './reveal.js';

// ─── Labels ──────────────────────────────────────────────────────────────────

const PERFIL_LABEL = {
  controlador:   'Controlador',
  institucional: 'Institucional',
  freeFloat:     'Free Float',
  tesouraria:    'Tesouraria',
};

// ─── Dados ───────────────────────────────────────────────────────────────────
// ON = ASTR3 (ações ordinárias) | PN = ASTR4 (ações preferenciais)
// Total ON emitidas: 120.000.000 | Total PN emitidas: 80.000.000

const DATA = {
  '1T26': [
    { nome: 'Marcelo Korber e Família',  perfil: 'controlador',   on:  42_000_000, onPct: 35.00, pn:  16_000_000, pnPct: 20.00, total:  58_000_000, totalPct: 29.00 },
    { nome: 'Astri Participações S.A.',  perfil: 'controlador',   on:  18_000_000, onPct: 15.00, pn:   8_000_000, pnPct: 10.00, total:  26_000_000, totalPct: 13.00 },
    { nome: 'BlackRock Brasil',          perfil: 'institucional', on:   9_600_000, onPct:  8.00, pn:   6_400_000, pnPct:  8.00, total:  16_000_000, totalPct:  8.00 },
    { nome: 'Itaú Asset Management',     perfil: 'institucional', on:   6_000_000, onPct:  5.00, pn:   4_800_000, pnPct:  6.00, total:  10_800_000, totalPct:  5.40 },
    { nome: 'Vanguard Brasil',           perfil: 'institucional', on:   4_800_000, onPct:  4.00, pn:   4_000_000, pnPct:  5.00, total:   8_800_000, totalPct:  4.40 },
    { nome: 'Outros Institucionais',     perfil: 'institucional', on:  14_400_000, onPct: 12.00, pn:  16_000_000, pnPct: 20.00, total:  30_400_000, totalPct: 15.20 },
    { nome: 'Pessoas Físicas e Outros',  perfil: 'freeFloat',     on:  19_200_000, onPct: 16.00, pn:  20_800_000, pnPct: 26.00, total:  40_000_000, totalPct: 20.00 },
    { nome: 'Ações em Tesouraria',       perfil: 'tesouraria',    on:   6_000_000, onPct:  5.00, pn:   4_000_000, pnPct:  5.00, total:  10_000_000, totalPct:  5.00 },
  ],
  '4T25': [
    { nome: 'Marcelo Korber e Família',  perfil: 'controlador',   on:  42_000_000, onPct: 35.00, pn:  16_000_000, pnPct: 20.00, total:  58_000_000, totalPct: 29.00 },
    { nome: 'Astri Participações S.A.',  perfil: 'controlador',   on:  18_000_000, onPct: 15.00, pn:   8_000_000, pnPct: 10.00, total:  26_000_000, totalPct: 13.00 },
    { nome: 'BlackRock Brasil',          perfil: 'institucional', on:   9_600_000, onPct:  8.00, pn:   6_400_000, pnPct:  8.00, total:  16_000_000, totalPct:  8.00 },
    { nome: 'Itaú Asset Management',     perfil: 'institucional', on:   6_000_000, onPct:  5.00, pn:   5_200_000, pnPct:  6.50, total:  11_200_000, totalPct:  5.60 },
    { nome: 'Vanguard Brasil',           perfil: 'institucional', on:   4_800_000, onPct:  4.00, pn:   3_200_000, pnPct:  4.00, total:   8_000_000, totalPct:  4.00 },
    { nome: 'Outros Institucionais',     perfil: 'institucional', on:  13_200_000, onPct: 11.00, pn:  15_200_000, pnPct: 19.00, total:  28_400_000, totalPct: 14.20 },
    { nome: 'Pessoas Físicas e Outros',  perfil: 'freeFloat',     on:  20_400_000, onPct: 17.00, pn:  22_000_000, pnPct: 27.50, total:  42_400_000, totalPct: 21.20 },
    { nome: 'Ações em Tesouraria',       perfil: 'tesouraria',    on:   6_000_000, onPct:  5.00, pn:   4_000_000, pnPct:  5.00, total:  10_000_000, totalPct:  5.00 },
  ],
  '4T24': [
    { nome: 'Marcelo Korber e Família',  perfil: 'controlador',   on:  42_000_000, onPct: 35.00, pn:  16_000_000, pnPct: 20.00, total:  58_000_000, totalPct: 29.00 },
    { nome: 'Astri Participações S.A.',  perfil: 'controlador',   on:  18_000_000, onPct: 15.00, pn:   8_000_000, pnPct: 10.00, total:  26_000_000, totalPct: 13.00 },
    { nome: 'BlackRock Brasil',          perfil: 'institucional', on:  10_800_000, onPct:  9.00, pn:   7_200_000, pnPct:  9.00, total:  18_000_000, totalPct:  9.00 },
    { nome: 'Itaú Asset Management',     perfil: 'institucional', on:   7_200_000, onPct:  6.00, pn:   5_600_000, pnPct:  7.00, total:  12_800_000, totalPct:  6.40 },
    { nome: 'Vanguard Brasil',           perfil: 'institucional', on:   4_800_000, onPct:  4.00, pn:   4_000_000, pnPct:  5.00, total:   8_800_000, totalPct:  4.40 },
    { nome: 'Outros Institucionais',     perfil: 'institucional', on:  12_000_000, onPct: 10.00, pn:  13_600_000, pnPct: 17.00, total:  25_600_000, totalPct: 12.80 },
    { nome: 'Pessoas Físicas e Outros',  perfil: 'freeFloat',     on:  21_200_000, onPct: 17.67, pn:  21_600_000, pnPct: 27.00, total:  42_800_000, totalPct: 21.40 },
    { nome: 'Ações em Tesouraria',       perfil: 'tesouraria',    on:   4_000_000, onPct:  3.33, pn:   4_000_000, pnPct:  5.00, total:   8_000_000, totalPct:  4.00 },
  ],
};

// ─── Estado ──────────────────────────────────────────────────────────────────

let activePeriod = '1T26';
let activePerfil = 'todos';

// ─── Utilitários ─────────────────────────────────────────────────────────────

const fmtN = n => n.toLocaleString('pt-BR');
const fmtP = p => p.toFixed(2).replace('.', ',') + '%';

function badge(perfil) {
  return `<span class="acionista-badge acionista-badge--${perfil}">${PERFIL_LABEL[perfil]}</span>`;
}

// ─── Render ──────────────────────────────────────────────────────────────────

function render() {
  const tbody   = document.querySelector('[data-ca-tbody]');
  const totalTr = document.querySelector('[data-ca-total]');
  if (!tbody) return;

  let rows = DATA[activePeriod] ?? [];

  if (activePerfil !== 'todos') {
    rows = rows.filter(r => r.perfil === activePerfil || r.perfil === 'tesouraria');
  }

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.nome}</td>
      <td>${badge(r.perfil)}</td>
      <td class="mono">${fmtN(r.on)}</td>
      <td class="mono">${fmtP(r.onPct)}</td>
      <td class="mono">${fmtN(r.pn)}</td>
      <td class="mono">${fmtP(r.pnPct)}</td>
      <td class="mono">${fmtN(r.total)}</td>
      <td class="mono">${fmtP(r.totalPct)}</td>
    </tr>
  `).join('');

  if (totalTr) {
    const totON    = rows.reduce((s, r) => s + r.on,    0);
    const totPN    = rows.reduce((s, r) => s + r.pn,    0);
    const totTotal = rows.reduce((s, r) => s + r.total, 0);
    totalTr.innerHTML = `
      <td>Total</td>
      <td>—</td>
      <td class="mono">${fmtN(totON)}</td>
      <td class="mono">—</td>
      <td class="mono">${fmtN(totPN)}</td>
      <td class="mono">—</td>
      <td class="mono">${fmtN(totTotal)}</td>
      <td class="mono">—</td>
    `;
  }
}

// ─── Filtros ─────────────────────────────────────────────────────────────────

document.querySelector('[data-ca-period]')?.addEventListener('change', e => {
  activePeriod = e.target.value;
  render();
});

document.querySelector('[data-ca-perfil]')?.addEventListener('change', e => {
  activePerfil = e.target.value;
  render();
});

render();
