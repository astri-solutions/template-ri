// =============================================================================
// NOSSO TIME
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';

// ---------------------------------------------------------------------------
// Team data
// ---------------------------------------------------------------------------

const DEPARTMENTS = {
  diretoria:   'Diretoria Executiva',
  conselho:    'Conselho de Administração',
  financeiro:  'Financeiro',
  operacoes:   'Operações',
  tecnologia:  'Tecnologia',
};

const TEAM = [
  // Diretoria Executiva
  { name: 'Carlos Eduardo',  surname: 'Monteiro',    role: 'CEO — Diretor-Executivo',          dept: 'diretoria',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=11' },
  { name: 'Fernanda',        surname: 'Albuquerque', role: 'CFO — Diretora Financeira',         dept: 'diretoria',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=47' },
  { name: 'Ricardo',         surname: 'Vasconcellos',role: 'COO — Diretor de Operações',        dept: 'diretoria',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=12' },
  { name: 'Patrícia',        surname: 'Drummond',    role: 'CTO — Diretora de Tecnologia',      dept: 'diretoria',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=49' },
  { name: 'Guilherme',       surname: 'Fonseca',     role: 'CRO — Diretor de RI',               dept: 'diretoria',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=15' },
  // Conselho de Administração
  { name: 'Antônio',         surname: 'Saraiva',     role: 'Presidente do Conselho',            dept: 'conselho',   linkedin: '#', photo: 'https://i.pravatar.cc/400?img=53' },
  { name: 'Maria Luísa',     surname: 'Cavalcanti',  role: 'Conselheira Independente',          dept: 'conselho',   linkedin: '#', photo: 'https://i.pravatar.cc/400?img=44' },
  { name: 'Bruno',           surname: 'Azevedo',     role: 'Conselheiro Independente',          dept: 'conselho',   linkedin: '#', photo: 'https://i.pravatar.cc/400?img=18' },
  { name: 'Luciana',         surname: 'Peixoto',     role: 'Conselheira',                       dept: 'conselho',   linkedin: '#', photo: 'https://i.pravatar.cc/400?img=45' },
  { name: 'Paulo',           surname: 'Mendonça',    role: 'Conselheiro',                       dept: 'conselho',   linkedin: '#', photo: 'https://i.pravatar.cc/400?img=57' },
  { name: 'Cláudia',         surname: 'Rezende',     role: 'Conselheira Independente',          dept: 'conselho',   linkedin: '#', photo: 'https://i.pravatar.cc/400?img=48' },
  // Financeiro
  { name: 'Rafael',          surname: 'Menezes',     role: 'Gerente de Controladoria',          dept: 'financeiro', linkedin: '#', photo: 'https://i.pravatar.cc/400?img=21' },
  { name: 'Isabela',         surname: 'Guimarães',   role: 'Gerente de Tesouraria',             dept: 'financeiro', linkedin: '#', photo: 'https://i.pravatar.cc/400?img=40' },
  { name: 'Marcos',          surname: 'Tolentino',   role: 'Analista Sênior de RI',             dept: 'financeiro', linkedin: '#', photo: 'https://i.pravatar.cc/400?img=25' },
  // Operações
  { name: 'André',           surname: 'Castilho',    role: 'Gerente de Operações Sul',          dept: 'operacoes',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=33' },
  { name: 'Camila',          surname: 'Nogueira',    role: 'Gerente de Operações Nordeste',     dept: 'operacoes',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=39' },
  { name: 'Rodrigo',         surname: 'Barros',      role: 'Coordenador de Logística',          dept: 'operacoes',  linkedin: '#', photo: 'https://i.pravatar.cc/400?img=36' },
  // Tecnologia
  { name: 'Juliana',         surname: 'Siqueira',    role: 'Head de Produto',                   dept: 'tecnologia', linkedin: '#', photo: 'https://i.pravatar.cc/400?img=41' },
  { name: 'Felipe',          surname: 'Andrade',     role: 'Engenheiro Sênior',                 dept: 'tecnologia', linkedin: '#', photo: 'https://i.pravatar.cc/400?img=8'  },
  { name: 'Natália',         surname: 'Viana',       role: 'UX Designer',                      dept: 'tecnologia', linkedin: '#', photo: 'https://i.pravatar.cc/400?img=42' },
];

const PER_PAGE = 12;

const ICON_LINKEDIN = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let state = { dept: 'todos', page: 1 };

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

function filtered() {
  return state.dept === 'todos'
    ? TEAM
    : TEAM.filter(m => m.dept === state.dept);
}

function renderGrid() {
  const grid = document.querySelector('[data-team-grid]');
  if (!grid) return;

  const members = filtered();
  const total   = members.length;
  const pages   = Math.ceil(total / PER_PAGE);
  const start   = (state.page - 1) * PER_PAGE;
  const slice   = members.slice(start, start + PER_PAGE);

  if (!slice.length) {
    grid.innerHTML = `<p class="team-empty">Nenhum membro encontrado.</p>`;
    renderPagination(0, 0);
    return;
  }

  grid.innerHTML = slice.map(m => `
    <article class="team-card">
      <img class="team-card__photo" src="${m.photo}" alt="${m.name} ${m.surname}" loading="lazy" />
      <div class="team-card__overlay" aria-hidden="true"></div>
      <div class="team-card__body">
        <span class="team-card__name">${m.name} ${m.surname}</span>
        <span class="team-card__role">${m.role}</span>
        <a class="team-card__linkedin" href="${m.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de ${m.name} ${m.surname}">
          ${ICON_LINKEDIN}
        </a>
      </div>
    </article>
  `).join('');

  renderPagination(state.page, pages);
}

function renderPagination(current, total) {
  const el = document.querySelector('[data-team-pagination]');
  if (!el) return;

  if (total <= 1) { el.innerHTML = ''; return; }

  const prevDisabled = current <= 1;
  const nextDisabled = current >= total;

  el.innerHTML = `
    <button class="pagination__btn" data-team-prev ${prevDisabled ? 'disabled' : ''} aria-label="Página anterior">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span class="pagination__info">${current} / ${total}</span>
    <button class="pagination__btn" data-team-next ${nextDisabled ? 'disabled' : ''} aria-label="Próxima página">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
    </button>`;

  el.querySelector('[data-team-prev]')?.addEventListener('click', () => {
    if (state.page > 1) { state.page--; renderGrid(); scrollToGrid(); }
  });
  el.querySelector('[data-team-next]')?.addEventListener('click', () => {
    const pages = Math.ceil(filtered().length / PER_PAGE);
    if (state.page < pages) { state.page++; renderGrid(); scrollToGrid(); }
  });
}

function scrollToGrid() {
  document.querySelector('[data-team-grid]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const deptSel = document.querySelector('[data-team-dept]');

  if (deptSel) {
    deptSel.addEventListener('change', e => {
      state.dept = e.target.value;
      state.page = 1;
      renderGrid();
    });
  }

  renderGrid();
});
