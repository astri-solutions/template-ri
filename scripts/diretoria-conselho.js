import './topbar.js';
import './nav.js';
import './reveal.js';

function drawOrgLines() {
  const chart = document.querySelector('[data-org-chart]');
  const svg   = document.querySelector('[data-org-svg]');
  if (!chart || !svg) return;

  svg.innerHTML = '';
  if (window.innerWidth < 992) return;

  const chartRect = chart.getBoundingClientRect();

  svg.setAttribute('viewBox', `0 0 ${chart.offsetWidth} ${chart.offsetHeight}`);
  svg.style.width  = chart.offsetWidth  + 'px';
  svg.style.height = chart.offsetHeight + 'px';

  function edges(el) {
    const r = el.getBoundingClientRect();
    return {
      cx:     r.left + r.width  / 2 - chartRect.left,
      top:    r.top    - chartRect.top,
      bottom: r.bottom - chartRect.top,
    };
  }

  function path(d) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill',            'none');
    p.setAttribute('stroke',          'var(--color-border)');
    p.setAttribute('stroke-width',    '1.5');
    p.setAttribute('stroke-dasharray','5 3');
    p.setAttribute('stroke-linecap',  'round');
    svg.appendChild(p);
  }

  // Elbow: bottom-center of parent → top-center of child
  function elbow(parent, child) {
    const p = edges(parent);
    const c = edges(child);
    const midY = p.bottom + (c.top - p.bottom) / 2;
    path(`M ${p.cx} ${p.bottom} L ${p.cx} ${midY} L ${c.cx} ${midY} L ${c.cx} ${c.top}`);
  }

  // ── Nível 1 → Nível 2: CEO para CFO e PMO ──
  const ceo   = chart.querySelector('[data-org-id="ceo"]');
  const execs = [...chart.querySelectorAll('[data-org-parent="ceo"]')];
  execs.forEach(exec => elbow(ceo, exec));

  // ── Nível 2 → Nível 3: CFO + PMO para cada colaborador ──
  const employees = [...chart.querySelectorAll('.org-card--employee')];
  if (!execs.length || !employees.length) return;

  const execEdges = execs.map(edges);
  const empEdges  = employees.map(edges);

  const bottomExec = Math.max(...execEdges.map(e => e.bottom));
  const topEmp     = Math.min(...empEdges.map(e => e.top));
  const trunkY     = bottomExec + (topEmp - bottomExec) / 2;

  // Linha horizontal "trunk" de ponta a ponta
  const allCx = [...execEdges, ...empEdges].map(e => e.cx);
  const leftX  = Math.min(...allCx);
  const rightX = Math.max(...allCx);
  path(`M ${leftX} ${trunkY} L ${rightX} ${trunkY}`);

  // Descidas de cada exec até o trunk
  execEdges.forEach(e => path(`M ${e.cx} ${e.bottom} L ${e.cx} ${trunkY}`));

  // Subidas do trunk até cada colaborador
  empEdges.forEach(e => path(`M ${e.cx} ${trunkY} L ${e.cx} ${e.top}`));
}

drawOrgLines();

let tid;
window.addEventListener('resize', () => {
  clearTimeout(tid);
  tid = setTimeout(drawOrgLines, 150);
});
