import './topbar.js';
import './nav.js';
import './reveal.js';

// ─── Ratings de Crédito ───────────────────────────────────────────────────────

const RATINGS = [
  { agencia: 'Fitch Ratings', tipo: 'Corporativo', escala: 'Nacional', rating: 'brAA+',  perspectiva: 'estavel',  data: 'Mar 2026' },
  { agencia: 'Fitch Ratings', tipo: 'Corporativo', escala: 'Global',   rating: 'BB+',    perspectiva: 'estavel',  data: 'Mar 2026' },
  { agencia: 'S&P Global',    tipo: 'Corporativo', escala: 'Nacional', rating: 'brAA',   perspectiva: 'positivo', data: 'Jan 2026' },
  { agencia: 'S&P Global',    tipo: 'Corporativo', escala: 'Global',   rating: 'BB',     perspectiva: 'positivo', data: 'Jan 2026' },
  { agencia: "Moody's",       tipo: 'Corporativo', escala: 'Global',   rating: 'Ba1',    perspectiva: 'estavel',  data: 'Fev 2026' },
];

const PERSPECTIVA_LABEL = {
  positivo: 'Positivo',
  estavel:  'Estável',
  negativo: 'Negativo',
};

// ─── Cobertura de Analistas ───────────────────────────────────────────────────

const ANALISTAS = [
  { instituicao: 'BTG Pactual',          analista: 'Rafael Dias',        rec: 'compra', paASTR3: 28.00, paASTR4: 33.00, data: 'Mai 2026' },
  { instituicao: 'XP Investimentos',     analista: 'Guilherme Costa',    rec: 'compra', paASTR3: 27.50, paASTR4: 32.00, data: 'Mai 2026' },
  { instituicao: 'Genial Investimentos', analista: 'Thiago Melo',        rec: 'compra', paASTR3: 29.00, paASTR4: 34.00, data: 'Mai 2026' },
  { instituicao: 'Itaú BBA',             analista: 'Fernanda Lima',      rec: 'compra', paASTR3: 27.00, paASTR4: 32.50, data: 'Mai 2026' },
  { instituicao: 'Goldman Sachs',        analista: 'Carlos Mendes',      rec: 'compra', paASTR3: 26.00, paASTR4: 31.50, data: 'Abr 2026' },
  { instituicao: 'Santander',            analista: 'Lucas Ferrari',      rec: 'compra', paASTR3: 26.50, paASTR4: 31.00, data: 'Mar 2026' },
  { instituicao: 'Morgan Stanley',       analista: 'André Alves',        rec: 'neutro', paASTR3: 23.00, paASTR4: 27.50, data: 'Abr 2026' },
  { instituicao: 'JPMorgan',             analista: 'Ana Rodrigues',      rec: 'neutro', paASTR3: 21.00, paASTR4: 25.00, data: 'Abr 2026' },
  { instituicao: 'Bank of America',      analista: 'Paulo Silveira',     rec: 'neutro', paASTR3: 22.50, paASTR4: 26.50, data: 'Mar 2026' },
  { instituicao: 'Bradesco BBI',         analista: 'Marina Fonseca',     rec: 'neutro', paASTR3: 22.00, paASTR4: 26.00, data: 'Mar 2026' },
];

// ─── Estado ──────────────────────────────────────────────────────────────────

let activeRec = 'todos';

// ─── Utilitários ─────────────────────────────────────────────────────────────

const fmtBRL = n => `R$ ${n.toFixed(2).replace('.', ',')}`;

function perspBadge(p) {
  return `<span class="rc-badge rc-badge--${p}">${PERSPECTIVA_LABEL[p]}</span>`;
}

function recBadge(r) {
  const label = { compra: 'Compra', neutro: 'Neutro', venda: 'Venda' }[r];
  return `<span class="rc-badge rc-badge--${r}">${label}</span>`;
}

// ─── Render ratings ───────────────────────────────────────────────────────────

function renderRatings() {
  const tbody = document.querySelector('[data-rc-ratings]');
  if (!tbody) return;

  tbody.innerHTML = RATINGS.map(r => `
    <tr>
      <td>${r.agencia}</td>
      <td>${r.tipo}</td>
      <td>${r.escala}</td>
      <td class="mono"><strong>${r.rating}</strong></td>
      <td>${perspBadge(r.perspectiva)}</td>
      <td class="mono">${r.data}</td>
    </tr>
  `).join('');
}

// ─── Render analistas ─────────────────────────────────────────────────────────

function renderAnalistas() {
  const tbody  = document.querySelector('[data-rc-analistas]');
  const count  = document.querySelector('[data-rc-count]');
  if (!tbody) return;

  let rows = ANALISTAS;
  if (activeRec !== 'todos') rows = rows.filter(a => a.rec === activeRec);

  if (count) {
    count.textContent = `${rows.length} instituiç${rows.length !== 1 ? 'ões' : 'ão'}`;
  }

  tbody.innerHTML = rows.map(a => `
    <tr>
      <td>${a.instituicao}</td>
      <td>${a.analista}</td>
      <td>${recBadge(a.rec)}</td>
      <td class="mono">${fmtBRL(a.paASTR3)}</td>
      <td class="mono">${fmtBRL(a.paASTR4)}</td>
      <td class="mono">${a.data}</td>
    </tr>
  `).join('');
}

// ─── Filtro ───────────────────────────────────────────────────────────────────

document.querySelector('[data-rc-rec]')?.addEventListener('change', e => {
  activeRec = e.target.value;
  renderAnalistas();
});

// ─── Init ─────────────────────────────────────────────────────────────────────

renderRatings();
renderAnalistas();
