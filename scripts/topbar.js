// =============================================================================
// TOPBAR — Tickers · Acessibilidade · Idioma
// =============================================================================

import { initCookieBanner } from './cookie-banner.js';

document.addEventListener('DOMContentLoaded', () => {
  initTickers();
  initA11y();
  initLang();
  initCookieBanner();
});

// ---------------------------------------------------------------------------
// Ticker rotation (mobile < 992px: one at a time, every 3s)
// ---------------------------------------------------------------------------
function initTickers() {
  const tickers = Array.from(document.querySelectorAll('[data-topbar-ticker]'));
  if (tickers.length <= 1) return;

  let current = 0;

  setInterval(() => {
    if (window.matchMedia('(min-width: 992px)').matches) return;
    tickers[current].classList.remove('is-active');
    current = (current + 1) % tickers.length;
    tickers[current].classList.add('is-active');
  }, 3000);
}

// ---------------------------------------------------------------------------
// Accessibility: contrast toggle + font size steps (persisted)
// ---------------------------------------------------------------------------
function initA11y() {
  const html = document.documentElement;
  const FONT_MIN = -1;
  const FONT_MAX = 2;

  // Restore persisted settings
  const savedContrast = localStorage.getItem('a11y-contrast') === 'on';
  const savedFont     = parseInt(localStorage.getItem('a11y-font') ?? '0', 10);

  if (savedContrast) setContrast(true);
  if (savedFont !== 0) setFont(savedFont);

  document.querySelector('[data-a11y="contrast"]')
    ?.addEventListener('click', (e) => {
      const next = html.dataset.contrast !== 'on';
      setContrast(next);
      localStorage.setItem('a11y-contrast', next ? 'on' : 'off');
    });

  document.querySelector('[data-a11y="font-up"]')
    ?.addEventListener('click', () => {
      const cur = getFont();
      if (cur < FONT_MAX) setFont(cur + 1);
    });

  document.querySelector('[data-a11y="font-down"]')
    ?.addEventListener('click', () => {
      const cur = getFont();
      if (cur > FONT_MIN) setFont(cur - 1);
    });

  function setContrast(on) {
    html.dataset.contrast = on ? 'on' : 'off';
    document.querySelector('[data-a11y="contrast"]')
      ?.classList.toggle('is-active', on);
  }

  function getFont() {
    return parseInt(html.dataset.fontSize ?? '0', 10);
  }

  function setFont(step) {
    if (step === 0) {
      delete html.dataset.fontSize;
    } else {
      html.dataset.fontSize = String(step);
    }
    localStorage.setItem('a11y-font', String(step));

    // Update button states
    document.querySelector('[data-a11y="font-down"]')
      ?.toggleAttribute('disabled', step <= FONT_MIN);
    document.querySelector('[data-a11y="font-up"]')
      ?.toggleAttribute('disabled', step >= FONT_MAX);
  }
}

// ---------------------------------------------------------------------------
// Language switcher (UI toggle — wire up translations as needed)
// ---------------------------------------------------------------------------
function initLang() {
  const buttons = Array.from(document.querySelectorAll('[data-lang]'));

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });
}
