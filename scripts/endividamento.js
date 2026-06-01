import './topbar.js';
import './nav.js';
import './reveal.js';

// Anima as barras de amortização quando a seção entra em tela
function initAmortBars() {
  const section = document.querySelector('[data-amort-section]');
  if (!section) return;

  const fills = section.querySelectorAll('[data-amort-fill]');

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        fills.forEach(el => {
          el.style.width = el.dataset.pct + '%';
        });
        io.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  io.observe(section);
}

// Anima as barras de composição (por índice / por moeda)
function initMixBars() {
  const section = document.querySelector('[data-mix-section]');
  if (!section) return;

  const fills = section.querySelectorAll('[data-mix-fill]');

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        fills.forEach(el => {
          el.style.width = el.dataset.pct + '%';
        });
        io.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  io.observe(section);
}

initAmortBars();
initMixBars();
