// =============================================================================
// HOME — Slider do banner + handlers dos formulários
// =============================================================================

import './nav.js';

/* -----------------------------------------------------------------------------
 * SLIDER do banner
 *
 * - Troca automática a cada 4s (definido em INTERVAL_MS).
 * - Animação slide-left: o slide ativo sai para a esquerda enquanto o próximo
 *   entra pela direita (transition em transform/opacity nas classes
 *   .is-active / .is-leaving — definidas no SCSS).
 * - Setas de navegação e bullets clicáveis.
 * - Pausa o autoplay quando o mouse está sobre o banner ou quando o usuário
 *   está focado em um controle (acessibilidade).
 * - Respeita prefers-reduced-motion.
 * --------------------------------------------------------------------------- */

const INTERVAL_MS = 4000;

function initHeroSlider() {
  const track = document.querySelector('[data-hero-track]');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('[data-hero-slide]'));
  const bullets = Array.from(document.querySelectorAll('[data-hero-bullet]'));
  const prevBtn = document.querySelector('[data-hero-prev]');
  const nextBtn = document.querySelector('[data-hero-next]');
  const hero = track.closest('.hero');

  if (slides.length <= 1) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timerId = null;
  let isPaused = false;

  function goTo(nextIndex, direction = 1) {
    if (nextIndex === current) return;

    const total = slides.length;
    nextIndex = ((nextIndex % total) + total) % total;

    const outgoing = slides[current];
    const incoming = slides[nextIndex];

    // Posiciona o incoming antes de animar
    incoming.style.transform = `translateX(${direction > 0 ? '100%' : '-100%'})`;
    incoming.style.opacity = '0';

    // Força reflow para a transição funcionar
    void incoming.offsetWidth;

    // Aplica classes — o CSS cuida da animação
    outgoing.classList.remove('is-active');
    outgoing.classList.add('is-leaving');
    outgoing.style.transform = `translateX(${direction > 0 ? '-100%' : '100%'})`;

    incoming.classList.add('is-active');
    incoming.style.transform = 'translateX(0)';
    incoming.style.opacity = '1';

    // Limpa estado do slide que saiu depois da transição
    const cleanup = () => {
      outgoing.classList.remove('is-leaving');
      outgoing.style.transform = '';
      outgoing.style.opacity = '';
      outgoing.removeEventListener('transitionend', cleanup);
    };
    outgoing.addEventListener('transitionend', cleanup);

    // Atualiza bullets
    bullets.forEach((b, i) => {
      const isActive = i === nextIndex;
      b.classList.toggle('is-active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    current = nextIndex;
  }

  function next() { goTo(current + 1, 1); }
  function prev() { goTo(current - 1, -1); }

  function startAutoplay() {
    if (reduceMotion || isPaused) return;
    stopAutoplay();
    timerId = window.setInterval(next, INTERVAL_MS);

    // Reinicia barra de progresso do bullet ativo
    restartProgressBar();
  }

  function stopAutoplay() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function restartProgressBar() {
    bullets.forEach((b) => b.classList.remove('is-active'));
    void bullets[current].offsetWidth; // reflow
    bullets[current].classList.add('is-active');
  }

  function pause() {
    isPaused = true;
    stopAutoplay();
    bullets.forEach((b) => b.classList.add('is-paused'));
  }

  function resume() {
    isPaused = false;
    bullets.forEach((b) => b.classList.remove('is-paused'));
    startAutoplay();
  }

  // ---- Wiring
  bullets.forEach((b) => {
    b.addEventListener('click', () => {
      const idx = Number(b.dataset.heroBullet);
      const direction = idx > current ? 1 : -1;
      goTo(idx, direction);
      startAutoplay();
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

  if (hero) {
    hero.addEventListener('mouseenter', pause);
    hero.addEventListener('mouseleave', resume);
    hero.addEventListener('focusin', pause);
    hero.addEventListener('focusout', (e) => {
      if (!hero.contains(e.relatedTarget)) resume();
    });
  }

  // Pausa quando a aba sai de foco (economiza CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else if (!isPaused) startAutoplay();
  });

  // Inicializa
  startAutoplay();
}

/* -----------------------------------------------------------------------------
 * FORMULÁRIOS — handlers placeholder.
 * Substituir pelas integrações reais (back-end, mailchimp, etc.) no futuro.
 * --------------------------------------------------------------------------- */

function initForms() {
  const mailingForm = document.querySelector('[data-mailing-form]');
  const contactForm = document.querySelector('[data-contact-form]');

  function showSuccess(form, message) {
    let banner = form.querySelector('[data-form-feedback]');
    if (!banner) {
      banner = document.createElement('div');
      banner.dataset.formFeedback = 'true';
      banner.style.cssText = `
        padding: 12px 16px; border-radius: 8px;
        background-color: rgba(0, 216, 101, 0.12);
        color: var(--color-primary-700);
        font-size: 14px; font-weight: 600;
        margin-top: 12px;
      `;
      form.appendChild(banner);
    }
    banner.textContent = message;
  }

  if (mailingForm) {
    mailingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(mailingForm));
      console.info('[mailing]', data);
      mailingForm.reset();
      showSuccess(mailingForm, '✓ Cadastro recebido! Em breve você receberá nossos comunicados.');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm));
      console.info('[contact]', data);
      contactForm.reset();
      showSuccess(contactForm, '✓ Mensagem enviada. Retornaremos em até 2 dias úteis.');
    });
  }
}

// ---- Init
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initForms();
});
