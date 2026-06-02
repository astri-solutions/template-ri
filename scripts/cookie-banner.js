// =============================================================================
// COOKIE BANNER — Aparece uma vez; descartado via localStorage
// =============================================================================

const STORAGE_KEY = 'cookie-consent';

export function initCookieBanner() {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Aviso de cookies');

  banner.innerHTML = `
    <div class="cookie-banner__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
      </svg>
    </div>
    <div class="cookie-banner__content">
      <p class="cookie-banner__text">
        Utilizamos cookies para melhorar sua experiência de navegação. Ao continuar, você concorda com nossa
        <a class="cookie-banner__link" href="/definicao-de-cookies.html">Política de Cookies</a>.
      </p>
      <button class="cookie-banner__btn btn btn--primary btn--sm" type="button" data-cookie-accept>
        Ciente
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  // Trigger slide-in after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => banner.classList.add('is-visible'));
  });

  banner.querySelector('[data-cookie-accept]').addEventListener('click', () => {
    banner.classList.remove('is-visible');
    localStorage.setItem(STORAGE_KEY, 'true');
    banner.addEventListener('transitionend', () => banner.remove(), { once: true });
  });
}
