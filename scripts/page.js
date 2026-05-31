// Entrada consolidada para todas as páginas internas
import './topbar.js';
import './nav.js';
import './reveal.js';
import './accordion.js';

// =============================================================================
// FORMULÁRIO — Fale com RI
// =============================================================================

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm).entries());
    console.log('[Fale com RI] Dados enviados:', data);

    const successEl = contactForm.querySelector('[data-form-success]');
    if (successEl) {
      successEl.classList.add('is-visible');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    contactForm.reset();
  });
}

// =============================================================================
// FORMULÁRIO — Mailing
// =============================================================================

const mailingForm = document.querySelector('[data-mailing-form]');
if (mailingForm) {
  mailingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(mailingForm);
    const comunicados = formData.getAll('comunicados');
    const data = {
      ...Object.fromEntries(formData.entries()),
      comunicados,
    };
    console.log('[Mailing] Dados enviados:', data);

    const successEl = mailingForm.querySelector('[data-form-success]');
    if (successEl) {
      successEl.classList.add('is-visible');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    mailingForm.reset();
  });
}
