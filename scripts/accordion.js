// =============================================================================
// ACCORDION — componente reutilizável
//
// HTML mínimo:
//   <div data-accordion>
//     <div data-accordion-item>
//       <button data-accordion-trigger aria-expanded="false" aria-controls="acc-ID">
//         Título
//         <svg class="accordion__chevron">…</svg>
//       </button>
//       <div class="accordion__content" id="acc-ID">
//         <div class="accordion__body">…conteúdo…</div>
//       </div>
//     </div>
//   </div>
//
// Atributos opcionais no [data-accordion]:
//   data-accordion-multiple  → permite múltiplos itens abertos simultaneamente
//   data-accordion-open="0"  → abre o item de índice 0 ao inicializar
// =============================================================================

const DURATION = 300; // ms — deve ser igual à transition no SCSS

function initAccordions() {
  document.querySelectorAll('[data-accordion]').forEach(initAccordion);
}

function initAccordion(root) {
  const allowMultiple = root.hasAttribute('data-accordion-multiple');
  const openDefault   = root.dataset.accordionOpen;

  const items = Array.from(root.querySelectorAll('[data-accordion-item]'));

  items.forEach((item, index) => {
    const trigger  = item.querySelector('[data-accordion-trigger]');
    const content  = item.querySelector('.accordion__content');
    if (!trigger || !content) return;

    // Garante IDs de acessibilidade
    if (!content.id) content.id = `acc-${Math.random().toString(36).slice(2, 7)}`;
    trigger.setAttribute('aria-controls', content.id);
    trigger.setAttribute('aria-expanded', 'false');
    content.setAttribute('role', 'region');
    content.setAttribute('aria-labelledby', trigger.id || '');

    // Fecha inicialmente via inline style (evita flash)
    content.style.height  = '0';
    content.style.overflow = 'hidden';

    // Abre o item padrão
    if (openDefault !== undefined && parseInt(openDefault) === index) {
      openItem(item, trigger, content, false);
    }

    trigger.addEventListener('click', () => toggle(item, trigger, content, root, allowMultiple));

    // Teclado: Arrows para navegar entre triggers
    trigger.addEventListener('keydown', (e) => {
      const triggers = items.map((it) => it.querySelector('[data-accordion-trigger]')).filter(Boolean);
      const idx = triggers.indexOf(trigger);
      if (e.key === 'ArrowDown') { e.preventDefault(); triggers[(idx + 1) % triggers.length]?.focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); triggers[(idx - 1 + triggers.length) % triggers.length]?.focus(); }
      if (e.key === 'Home')      { e.preventDefault(); triggers[0]?.focus(); }
      if (e.key === 'End')       { e.preventDefault(); triggers.at(-1)?.focus(); }
    });
  });
}

function toggle(item, trigger, content, root, allowMultiple) {
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';

  if (!allowMultiple) {
    // Fecha todos os outros itens do mesmo accordion
    root.querySelectorAll('[data-accordion-item]').forEach((other) => {
      if (other === item) return;
      const t = other.querySelector('[data-accordion-trigger]');
      const c = other.querySelector('.accordion__content');
      if (t && c && t.getAttribute('aria-expanded') === 'true') closeItem(other, t, c);
    });
  }

  if (isOpen) closeItem(item, trigger, content);
  else        openItem(item, trigger, content, true);
}

function openItem(item, trigger, content, animate) {
  trigger.setAttribute('aria-expanded', 'true');
  item.classList.add('is-open');

  // Calcula a altura real do conteúdo
  content.style.height   = 'auto';
  const targetHeight = content.scrollHeight;
  content.style.height   = '0';

  if (animate && !prefersReducedMotion()) {
    requestAnimationFrame(() => {
      content.style.transition = `height ${DURATION}ms ease`;
      content.style.height     = `${targetHeight}px`;
      content.addEventListener('transitionend', () => {
        content.style.height     = 'auto'; // permite resize da janela
        content.style.transition = '';
      }, { once: true });
    });
  } else {
    content.style.height     = 'auto';
    content.style.transition = '';
  }
}

function closeItem(item, trigger, content) {
  trigger.setAttribute('aria-expanded', 'false');
  item.classList.remove('is-open');

  if (!prefersReducedMotion()) {
    content.style.transition = `height ${DURATION}ms ease`;
    content.style.height     = `${content.scrollHeight}px`;
    requestAnimationFrame(() => {
      content.style.height = '0';
      content.addEventListener('transitionend', () => {
        content.style.transition = '';
      }, { once: true });
    });
  } else {
    content.style.height     = '0';
    content.style.transition = '';
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

document.addEventListener('DOMContentLoaded', initAccordions);
