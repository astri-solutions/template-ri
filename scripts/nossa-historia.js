import './topbar.js';
import './nav.js';
import './reveal.js';
import './accordion.js';

// ---------------------------------------------------------------------------
// Timeline — scroll-driven animations
// ---------------------------------------------------------------------------

const ITEM_SELECTOR   = '[data-timeline-item]';
const FILL_SELECTOR   = '[data-timeline-fill]';
const TRACK_SELECTOR  = '[data-timeline-track]';

function initTimeline() {
  const items    = [...document.querySelectorAll(ITEM_SELECTOR)];
  const fillEl   = document.querySelector(FILL_SELECTOR);
  const trackEl  = document.querySelector(TRACK_SELECTOR);

  if (!items.length || !fillEl || !trackEl) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- IntersectionObserver: reveal items when they enter the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item      = entry.target;
        const yearWrap  = item.querySelector('.timeline__year-wrap');
        const content   = item.querySelector('.timeline__content');

        if (entry.isIntersecting) {
          item.classList.add('is-active');
          item.classList.remove('was-active');
          if (yearWrap) yearWrap.classList.add('is-visible');
          if (content)  content.classList.add('is-visible');
        } else {
          if (item.classList.contains('is-active')) {
            item.classList.remove('is-active');
            item.classList.add('was-active');
          }
        }
      });
    },
    { threshold: 0.25, rootMargin: '0px 0px -80px 0px' }
  );

  items.forEach((item) => observer.observe(item));

  // --- Scroll listener: grow the track fill
  if (reducedMotion) {
    fillEl.style.height = '100%';
    return;
  }

  function updateFill() {
    const trackRect = trackEl.getBoundingClientRect();
    const vh        = window.innerHeight;

    // The fill progresses as the user scrolls the track into view.
    // "progress point" sits at 65% from the top of the viewport.
    const progressY  = vh * 0.65;
    const filled     = progressY - trackRect.top;
    const ratio      = Math.min(Math.max(filled / trackRect.height, 0), 1);

    fillEl.style.height = `${ratio * 100}%`;
  }

  window.addEventListener('scroll', updateFill, { passive: true });
  updateFill(); // run once on load
}

document.addEventListener('DOMContentLoaded', initTimeline);
