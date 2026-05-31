import './topbar.js';
import './nav.js';
import './reveal.js';

function drawOrgLines() {
  const chart = document.querySelector('[data-org-chart]');
  const svg = document.querySelector('[data-org-svg]');
  if (!chart || !svg) return;

  svg.innerHTML = '';

  if (window.innerWidth < 992) return;

  const chartRect = chart.getBoundingClientRect();

  svg.setAttribute('viewBox', `0 0 ${chart.offsetWidth} ${chart.offsetHeight}`);
  svg.style.width  = chart.offsetWidth  + 'px';
  svg.style.height = chart.offsetHeight + 'px';

  function cardEdges(el) {
    const r = el.getBoundingClientRect();
    return {
      cx: r.left + r.width  / 2 - chartRect.left,
      cy: r.top  + r.height / 2 - chartRect.top,
      top:    r.top    - chartRect.top,
      bottom: r.bottom - chartRect.top,
    };
  }

  function addPath(d) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'var(--color-border)');
    p.setAttribute('stroke-width', '1.5');
    p.setAttribute('stroke-dasharray', '5 3');
    p.setAttribute('stroke-linecap', 'round');
    svg.appendChild(p);
  }

  // Elbow connector: from bottom-center of parent to top-center of child
  function elbow(parent, child) {
    const p = cardEdges(parent);
    const c = cardEdges(child);
    const midY = p.bottom + (c.top - p.bottom) / 2;
    addPath(`M ${p.cx} ${p.bottom} L ${p.cx} ${midY} L ${c.cx} ${midY} L ${c.cx} ${c.top}`);
  }

  // CEO → CFO e PMO
  const ceo  = chart.querySelector('[data-org-id="ceo"]');
  const execs = chart.querySelectorAll('[data-org-parent="ceo"]');
  execs.forEach(exec => elbow(ceo, exec));

  // Execs → cada grupo de colaboradores
  // Linha única do centro do bloco de execs para o centro do grid de colaboradores
  const execCards = [...execs];
  const employeeGrid = chart.querySelector('.org-level--employees');
  if (execCards.length && employeeGrid) {
    // Ponto médio entre os dois execs → centro superior do grid
    const e0 = cardEdges(execCards[0]);
    const e1 = cardEdges(execCards[execCards.length - 1]);
    const midExecX = (e0.cx + e1.cx) / 2;
    const bottomExec = Math.max(e0.bottom, e1.bottom);

    const gridRect = employeeGrid.getBoundingClientRect();
    const gridCX = gridRect.left + gridRect.width / 2 - chartRect.left;
    const gridTop = gridRect.top - chartRect.top;

    const midY = bottomExec + (gridTop - bottomExec) / 2;
    addPath(`M ${midExecX} ${bottomExec} L ${midExecX} ${midY} L ${gridCX} ${midY} L ${gridCX} ${gridTop}`);
  }
}

drawOrgLines();

let tid;
window.addEventListener('resize', () => {
  clearTimeout(tid);
  tid = setTimeout(drawOrgLines, 150);
});
