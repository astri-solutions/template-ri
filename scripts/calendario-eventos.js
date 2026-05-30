// =============================================================================
// CALENDÁRIO DE EVENTOS
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';
import './accordion.js';

// ---------------------------------------------------------------------------
// Event data
// ---------------------------------------------------------------------------

const EVENTS = [
  // 2026 — futuro
  { date: '2026-08-04', title: 'Divulgação de Resultados 2T26', category: 'resultados', time: '22:00' },
  { date: '2026-08-05', title: 'Conference Call do 2T26',        category: 'conferencia', time: '10:00' },
  { date: '2026-11-10', title: 'Divulgação de Resultados 3T26', category: 'resultados', time: '22:00' },
  { date: '2026-11-11', title: 'Conference Call do 3T26',        category: 'conferencia', time: '10:00' },
  // 2026 — passado
  { date: '2026-02-10', title: 'Divulgação de Resultados 4T25', category: 'resultados', time: '22:00' },
  { date: '2026-02-11', title: 'Conference Call do 4T25',        category: 'conferencia', time: '10:00' },
  { date: '2026-04-30', title: 'Assembleia Geral Ordinária',     category: 'assembleia', time: '14:00', location: 'São Paulo, SP' },
  { date: '2026-05-14', title: 'Divulgação de Resultados 1T26', category: 'resultados', time: '22:00' },
  { date: '2026-05-15', title: 'Videoconferência de Resultados 1T26', category: 'conferencia', time: '10:00' },
  { date: '2026-05-29', title: 'Formulário de Referência 2026', category: 'outros' },
  // 2025
  { date: '2025-02-12', title: 'Divulgação de Resultados 4T24', category: 'resultados', time: '22:00' },
  { date: '2025-02-13', title: 'Conference Call do 4T24',        category: 'conferencia', time: '10:00' },
  { date: '2025-04-29', title: 'Assembleia Geral Ordinária',     category: 'assembleia', time: '14:00', location: 'São Paulo, SP' },
  { date: '2025-05-12', title: 'Divulgação de Resultados 1T25', category: 'resultados', time: '22:00' },
  { date: '2025-05-13', title: 'Conference Call do 1T25',        category: 'conferencia', time: '10:00' },
  { date: '2025-08-11', title: 'Divulgação de Resultados 2T25', category: 'resultados', time: '22:00' },
  { date: '2025-08-12', title: 'Conference Call do 2T25',        category: 'conferencia', time: '10:00' },
  { date: '2025-11-10', title: 'Divulgação de Resultados 3T25', category: 'resultados', time: '22:00' },
  { date: '2025-11-11', title: 'Conference Call do 3T25',        category: 'conferencia', time: '10:00' },
  { date: '2025-11-26', title: 'APIMEC São Paulo',               category: 'conferencia', time: '09:00', location: 'São Paulo, SP' },
  // 2024
  { date: '2024-02-14', title: 'Divulgação de Resultados 4T23', category: 'resultados', time: '22:00' },
  { date: '2024-02-15', title: 'Conference Call do 4T23',        category: 'conferencia', time: '10:00' },
  { date: '2024-04-30', title: 'Assembleia Geral Ordinária',     category: 'assembleia', time: '14:00', location: 'São Paulo, SP' },
  { date: '2024-05-13', title: 'Divulgação de Resultados 1T24', category: 'resultados', time: '22:00' },
  { date: '2024-05-14', title: 'Conference Call do 1T24',        category: 'conferencia', time: '10:00' },
  { date: '2024-08-12', title: 'Divulgação de Resultados 2T24', category: 'resultados', time: '22:00' },
  { date: '2024-08-13', title: 'Conference Call do 2T24',        category: 'conferencia', time: '10:00' },
  { date: '2024-11-11', title: 'Divulgação de Resultados 3T24', category: 'resultados', time: '22:00' },
  { date: '2024-11-12', title: 'Conference Call do 3T24',        category: 'conferencia', time: '10:00' },
];

const CAT_LABELS = {
  resultados:  'Resultados',
  conferencia: 'Conferência',
  assembleia:  'Assembléia',
  outros:      'Outros',
};

const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const MONTHS_SHORT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const WEEKDAYS_SHORT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

// Quarter → starting month index (0-based)
const QUARTER_MONTHS = [0, 3, 6, 9];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const today = new Date();
today.setHours(0, 0, 0, 0);

let state = {
  year:    today.getFullYear(),
  month:   today.getMonth(),
  pastYear: today.getFullYear(),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pad(n) { return String(n).padStart(2, '0'); }
function toDateStr(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function todayStr() { return toDateStr(today); }

function formatDatePt(d) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function buildGmailUrl(event) {
  const d = parseDate(event.date);
  const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${dateStr}/${dateStr}`,
    details: event.location || 'Horário de Brasília',
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params}`;
}

function buildOutlookUrl(event) {
  const d = parseDate(event.date);
  const startdt = `${event.date}T${event.time || '09:00'}:00`;
  const params = new URLSearchParams({
    subject: event.title,
    startdt,
    enddt: `${event.date}T${incrementHour(event.time || '09:00')}:00`,
    body: event.location || 'Horário de Brasília',
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`;
}

function incrementHour(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return `${pad((h + 1) % 24)}:${pad(m)}`;
}

// ---------------------------------------------------------------------------
// Calendar rendering
// ---------------------------------------------------------------------------

const ICON_CLOCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const ICON_PREV  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>`;
const ICON_NEXT  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`;
const ICON_GMAIL   = `<img src="/assets/Icones/icon-gmail.png"   alt="Gmail"   class="cal-export__icon" aria-hidden="true">`;
const ICON_OUTLOOK = `<img src="/assets/Icones/icon-outlook.png" alt="Outlook" class="cal-export__icon" aria-hidden="true">`;
const ICON_ADD_CAL = ICON_GMAIL;

function renderMonthGrid() {
  const grid = document.querySelector('[data-cal-grid]');
  if (!grid) return;

  const { year, month } = state;
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const tStr     = todayStr();

  // Build flat days array (always 6 rows × 7 cols = 42 cells)
  const days = [];
  for (let i = 0; i < startDow; i++) {
    days.push({ date: new Date(year, month, 1 - startDow + i), own: false });
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), own: true });
  }
  let next = 1;
  while (days.length < 42) {
    days.push({ date: new Date(year, month + 1, next++), own: false });
  }

  const weekdaysHtml = WEEKDAYS_SHORT
    .map(w => `<div class="cal-month__weekday">${w}</div>`)
    .join('');

  const daysHtml = days.map(({ date, own }) => {
    const dateStr = toDateStr(date);
    const evs     = EVENTS.filter(e => e.date === dateStr);
    const isToday = dateStr === tStr;

    const cls = [
      'cal-month__day',
      !own    && 'cal-month__day--other',
      isToday && 'cal-month__day--today',
    ].filter(Boolean).join(' ');

    const dots = evs.map(e =>
      `<span class="cal-month__dot cal-month__dot--${e.category}" title="${e.title}"></span>`
    ).join('');

    return `<div class="${cls}" data-date="${dateStr}">
      <span class="cal-month__day-num" aria-label="${date.getDate()}">${date.getDate()}</span>
      ${dots ? `<div class="cal-month__dots" aria-hidden="true">${dots}</div>` : ''}
    </div>`;
  }).join('');

  grid.innerHTML = `
    <div class="cal-month__header">
      <button class="cal-month__nav-btn" type="button" data-cal-prev aria-label="Mês anterior">${ICON_PREV}</button>
      <h3 class="cal-month__title">${MONTHS_PT[month]} ${year}</h3>
      <button class="cal-month__nav-btn" type="button" data-cal-next aria-label="Próximo mês">${ICON_NEXT}</button>
    </div>
    <div class="cal-month__weekdays" aria-hidden="true">${weekdaysHtml}</div>
    <div class="cal-month__days" role="grid" aria-label="Calendário ${MONTHS_PT[month]} ${year}">${daysHtml}</div>`;

  grid.querySelector('[data-cal-prev]').addEventListener('click', () => navigateMonth(-1));
  grid.querySelector('[data-cal-next]').addEventListener('click', () => navigateMonth(1));
}

function navigateMonth(delta) {
  let m = state.month + delta;
  let y = state.year;
  if (m < 0)  { m = 11; y -= 1; }
  if (m > 11) { m = 0;  y += 1; }
  state.month = m;
  state.year  = y;
  renderMonthGrid();
  syncYearSelect();
}

// ---------------------------------------------------------------------------
// Upcoming events
// ---------------------------------------------------------------------------

function renderUpcoming() {
  const list = document.querySelector('[data-cal-upcoming]');
  if (!list) return;

  const tStr = todayStr();
  const upcoming = EVENTS
    .filter(e => e.date > tStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 10);

  if (!upcoming.length) {
    list.innerHTML = `<li class="cal-upcoming__empty">Nenhum evento futuro cadastrado.</li>`;
    return;
  }

  list.innerHTML = upcoming.map(event => {
    const d        = parseDate(event.date);
    const gmailUrl = buildGmailUrl(event);
    const outlookUrl = buildOutlookUrl(event);

    return `<li class="cal-upcoming__item">
      <div class="cal-upcoming__date-col">
        <span class="cal-upcoming__day">${d.getDate()}</span>
        <span class="cal-upcoming__month-abbr">${MONTHS_SHORT[d.getMonth()]}</span>
      </div>
      <div class="cal-upcoming__info">
        <p class="cal-upcoming__title">${event.title}</p>
        ${event.time ? `<span class="cal-upcoming__time">${ICON_CLOCK} ${event.time} &bull; Horário de Brasília</span>` : ''}
      </div>
      <div class="cal-upcoming__actions">
        <a class="cal-upcoming__export" href="${gmailUrl}" target="_blank" rel="noopener noreferrer" aria-label="Adicionar ao Google Calendar" title="Google Calendar">${ICON_GMAIL}</a>
        <a class="cal-upcoming__export" href="${outlookUrl}" target="_blank" rel="noopener noreferrer" aria-label="Adicionar ao Outlook" title="Outlook">${ICON_OUTLOOK}</a>
      </div>
    </li>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// Past events
// ---------------------------------------------------------------------------

function renderPast(year) {
  const list = document.querySelector('[data-cal-past]');
  if (!list) return;

  const tStr = todayStr();
  const pastEvents = EVENTS
    .filter(e => e.date <= tStr && e.date.startsWith(String(year)))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (!pastEvents.length) {
    list.innerHTML = `<li class="events-past__empty">Nenhum evento realizado em ${year}.</li>`;
    return;
  }

  list.innerHTML = pastEvents.map(event => {
    const d        = parseDate(event.date);
    const gmailUrl = buildGmailUrl(event);

    return `<li class="events-past__item">
      <span class="events-past__date">${formatDatePt(d)}</span>
      <div class="events-past__info">
        <div class="events-past__info-text">
          <span class="events-past__title-text">${event.title}</span>
          <span class="events-past__date-mobile">${formatDatePt(d)}</span>
        </div>
      </div>
      <a class="events-past__add" href="${gmailUrl}" target="_blank" rel="noopener noreferrer" aria-label="Adicionar ao calendário: ${event.title}" title="Adicionar ao calendário">${ICON_ADD_CAL}</a>
    </li>`;
  }).join('');
}

function syncYearSelect() {
  const sel = document.querySelector('[data-cal-year]');
  if (sel) sel.value = String(state.year);
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Year select (calendar view)
  const yearSel = document.querySelector('[data-cal-year]');
  if (yearSel) {
    yearSel.value = String(state.year);
    yearSel.addEventListener('change', (e) => {
      state.year = Number(e.target.value);
      renderMonthGrid();
    });
  }

  // Past events year filter
  const pastYearSel = document.querySelector('[data-cal-past-year]');
  if (pastYearSel) {
    pastYearSel.value = String(state.pastYear);
    pastYearSel.addEventListener('change', (e) => {
      state.pastYear = Number(e.target.value);
      renderPast(state.pastYear);
    });
  }

  // Initial render
  renderMonthGrid();
  renderUpcoming();
  renderPast(state.pastYear);
});
