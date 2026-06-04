# Guia de Implementação — Novo Projeto RI

Este documento é um prompt completo para criar um site de Relações com Investidores do
zero usando a arquitetura do Template RI. Faça upload deste arquivo em uma nova sessão
do Claude Code e ele terá todo o contexto necessário para executar o projeto.

---

## 1. Visão Geral da Stack

- **Bundler:** Vite (multi-page app, sem framework)
- **CSS:** SCSS com arquitetura 7-1 e CSS custom properties
- **JS:** Vanilla ES Modules, sem dependências de UI
- **Deploy:** Vercel (Vite preset, `npm run build` → `dist/`)
- **Repo:** GitHub (privado, org `astri-solutions`)

---

## 2. Inputs Necessários Antes de Começar

Solicitar ao usuário:

| Item | Descrição |
|------|-----------|
| Nome do repositório | ex: `cliente-xyz` |
| Nome da empresa | ex: `São Martinho` |
| PDF de diretrizes | Cores (primary/secondary hex), fonte, árvore de canais |
| Ticker(s) | ex: `SMTO3` |
| E-mail RI | ex: `ri@empresa.com.br` |
| Telefone | ex: `+55 (11) 0000-0000` |
| Endereço | Endereço físico completo |
| Logos SVG | `logotipo-original.svg`, `logotipo-negative.svg`, `logotipo-black.svg` |

---

## 3. Setup Inicial

```bash
# 1. Clonar o Template RI como base
git clone <URL_TEMPLATE_RI> /tmp/<nome-cliente>
cd /tmp/<nome-cliente>
git remote remove origin

# 2. Criar repo no GitHub (via MCP ou manualmente) e conectar
git remote add origin https://github.com/astri-solutions/<nome-cliente>.git
git checkout -b main

# 3. Instalar dependências
npm install
```

---

## 4. Configuração Única do Site — `scripts/site.config.js`

**Criar este arquivo.** É a única fonte de verdade para dados que se repetem em
todas as páginas (nav, footer, tickers, logos). Os componentes compartilhados lêem
daqui — nunca duplicar esse conteúdo nos HTMLs.

```js
// scripts/site.config.js
export const siteConfig = {

  company: {
    name:        'Nome da Empresa',
    nameShort:   'Empresa',          // para titles, ex: "Página — Empresa RI"
    description: 'Descrição curta para meta tags.',
    logoOriginal: '/assets/logotipo/logotipo-original.svg',
    logoNegative: '/assets/logotipo/logotipo-negative.svg',
    logoContrast: '/assets/logotipo/logotipo-negative.svg',
    favicon:     '/favicon.svg',
  },

  tickers: [
    { symbol: 'TICK3', price: 'R$ 00,00', change: '0,00%', direction: 'up'  },
    // { symbol: 'TICK4', price: 'R$ 00,00', change: '0,00%', direction: 'down' },
  ],

  nav: [
    {
      label: 'A Companhia',
      children: [
        { label: 'Visão Geral',        href: '/visao-geral.html' },
        { label: 'Nossa História',     href: '/nossa-historia.html' },
        { label: 'Estratégias',        href: '/estrategias-vantagens.html' },
      ],
    },
    {
      label: 'Governança',
      children: [
        { label: 'Composição Acionária', href: '/composicao-acionaria.html' },
        { label: 'Diretoria e Conselho', href: '/diretoria-conselho.html' },
        { label: 'Estatuto e Políticas', href: '/estatuto-politicas.html' },
      ],
    },
    {
      label: 'Financeiro',
      children: [
        { label: 'Central de Resultados', href: '/central-resultados.html' },
        { label: 'Apresentações',         href: '/apresentacoes.html' },
        { label: 'Dividendos',            href: '/dividendos-recompra.html' },
      ],
    },
    {
      label: 'Investidores',
      children: [
        { label: 'Calendário de Eventos', href: '/calendario-eventos.html' },
        { label: 'Documentos CVM',        href: '/documentos-cvm.html' },
      ],
    },
    {
      label: 'Contato',
      children: [
        { label: 'Fale com RI', href: '/fale-com-ri.html' },
        { label: 'Glossário',   href: '/glossario.html'   },
      ],
    },
  ],

  footer: {
    address:   'Endereço completo, Cidade — UF, CEP 00000-000',
    email:     'ri@empresa.com.br',
    phone:     '+55 (11) 0000-0000',
    hours:     'Segunda a sexta, das 08h às 18h, exceto feriados.',
    copyright: `©Copyright Nome da Empresa ${new Date().getFullYear()}`,
    social: {
      linkedin:  '#',
      instagram: '#',
      facebook:  '#',
    },
    columns: [
      {
        title: 'A Companhia',
        links: [
          { label: 'Visão Geral',    href: '/visao-geral.html' },
          { label: 'Nossa História', href: '/nossa-historia.html' },
        ],
      },
      // ... demais colunas do rodapé
    ],
    legalLinks: [
      { label: 'Termos e Condições',    href: '/termos-e-condicoes.html'    },
      { label: 'Política de Privacidade', href: '/politica-de-privacidade.html' },
      { label: 'Definições de Cookies', href: '/definicao-de-cookies.html'  },
    ],
    legalText: 'Texto legal obrigatório para o rodapé do site RI...',
  },

};
```

---

## 5. Componentes Compartilhados

Em vez de copiar nav/footer em cada HTML, eles são **renderizados via JS** a partir
do `siteConfig`. Cada componente expõe uma função `init(config)` que injeta o HTML
no elemento alvo e inicializa os eventos.

### 5.1 `scripts/components/header.js`

Renderiza e injeta o `<header class="site-header">` + drawer mobile dentro de
`<header id="site-header"></header>`. Gera os itens de nav a partir de
`config.nav`.

```js
// scripts/components/header.js
import { initNav } from '../nav.js';

export function initHeader(config) {
  const el = document.getElementById('site-header');
  if (!el) return;

  const navItems = config.nav.map(item => {
    const children = item.children.map(child =>
      `<li><a class="nav-dropdown__link" href="${child.href}">${child.label}</a></li>`
    ).join('');

    return `
      <li class="nav-list__item nav-list__item--has-sub">
        <button class="nav-list__trigger" type="button"
          aria-haspopup="true" aria-expanded="false" data-nav-trigger>
          ${item.label}
          <svg class="nav-list__chevron" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="4 6 8 10 12 6"/>
          </svg>
        </button>
        <ul class="nav-dropdown">${children}</ul>
      </li>`;
  }).join('');

  el.className = 'site-header';
  el.innerHTML = `
    <div class="site-header__inner">
      <a href="/" class="site-header__brand" aria-label="${config.company.name}">
        <img src="${config.company.logoOriginal}" alt="${config.company.name}"
             class="site-header__logo" />
      </a>
      <nav class="site-header__nav" id="site-nav" data-nav aria-label="Principal">
        <div class="site-header__drawer-top">
          <img src="${config.company.logoNegative}" alt="${config.company.name}"
               class="site-header__drawer-logo" />
          <button class="site-header__drawer-close" type="button"
            aria-label="Fechar menu" data-nav-close>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <ul class="nav-list">${navItems}</ul>
      </nav>
      <div class="site-header__actions">
        <button class="site-header__search" type="button"
          aria-label="Buscar" data-search-toggle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
        <button class="site-header__hamburger" type="button"
          aria-label="Abrir menu" aria-expanded="false"
          aria-controls="site-nav" data-nav-hamburger>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="site-header__overlay" data-nav-overlay aria-hidden="true"></div>`;

  // Inicializa comportamento do nav (scroll hide, drawer, dropdowns)
  initNav();

  // Alto contraste: trocar logo
  const logoEl = el.querySelector('.site-header__logo');
  if (logoEl && config.company.logoContrast) {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      logoEl.src = html.dataset.contrast === 'on'
        ? config.company.logoContrast
        : config.company.logoOriginal;
    });
    observer.observe(html, { attributes: true, attributeFilter: ['data-contrast'] });
  }
}
```

### 5.2 `scripts/components/footer.js`

Injeta o `<footer class="site-footer">` dentro de `<footer id="site-footer"></footer>`.

```js
// scripts/components/footer.js
export function initFooter(config) {
  const el = document.getElementById('site-footer');
  if (!el) return;

  const { footer, company } = config;

  const columns = (footer.columns || []).map(col => `
    <div class="site-footer__block">
      <h4>${col.title}</h4>
      <ul>${col.links.map(l =>
        `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
      </ul>
    </div>`).join('');

  const legalLinks = (footer.legalLinks || []).map(l =>
    `<a href="${l.href}">${l.label}</a>`).join('');

  el.className = 'site-footer';
  el.innerHTML = `
    <div class="site-footer__inner">
      <div class="site-footer__top">
        <img src="${company.logoNegative}" alt="${company.name}"
             class="site-footer__logo" />
      </div>
      <div class="site-footer__grid">
        <div class="site-footer__info">
          <div class="site-footer__block">
            <h4>Endereço</h4>
            <p class="site-footer__address-text">${footer.address}</p>
          </div>
          <div class="site-footer__block">
            <h4>Entre em Contato</h4>
            <div class="site-footer__contact-details">
              <a href="mailto:${footer.email}">${footer.email}</a>
              <a href="tel:${footer.phone.replace(/\D/g,'')}">${footer.phone}</a>
              <p>${footer.hours}</p>
            </div>
          </div>
        </div>
        ${columns}
      </div>
      <div class="site-footer__bottom">
        <div class="site-footer__bottom-row site-footer__bottom-row--spread">
          <div class="site-footer__bottom-links">${legalLinks}</div>
          <div class="site-footer__social">
            <span>Siga a ${company.nameShort}:</span>
            ${footer.social.linkedin !== '#' ? `
            <a href="${footer.social.linkedin}" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7
                  a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>` : ''}
          </div>
        </div>
        <div class="site-footer__bottom-row site-footer__bottom-row--spread">
          <span>${footer.copyright}</span>
          <a href="https://astri.solutions" class="site-footer__powered"
             target="_blank" rel="noopener">
            <span>Powered by</span>
            <img src="${company.logoNegative}" alt="Astri Solutions" />
          </a>
        </div>
        <p class="site-footer__legal">${footer.legalText || ''}</p>
      </div>
    </div>`;
}
```

### 5.3 `scripts/components/topbar.js`

Injeta a topbar dentro de `<div id="site-topbar"></div>`. Reutiliza `initTickers`,
`initA11y` e `initLang` do `topbar.js` existente (que atua sobre o DOM
já renderizado).

```js
// scripts/components/topbar.js
import { initTopbarBehavior } from '../topbar.js'; // renomear função atual

export function initTopbar(config) {
  const el = document.getElementById('site-topbar');
  if (!el) return;

  const tickers = config.tickers.map((t, i) => `
    <div class="topbar__ticker${i === 0 ? ' is-active' : ''}" data-topbar-ticker>
      <span class="topbar__ticker-symbol">${t.symbol}</span>
      <span class="topbar__ticker-dot" aria-hidden="true">·</span>
      <span class="topbar__ticker-price">${t.price}</span>
      <span class="topbar__ticker-change topbar__ticker-change--${t.direction}"
        aria-label="${t.direction === 'up' ? 'Alta' : 'Baixa'} de ${t.change}">
        <svg viewBox="0 0 10 10" width="8" height="8" fill="currentColor"
          aria-hidden="true">
          <path d="${t.direction === 'up' ? 'M5 2 9 8H1z' : 'M5 8 9 2H1z'}"/>
        </svg>
        ${t.change}
      </span>
    </div>`).join('');

  el.className = 'topbar';
  el.setAttribute('role', 'navigation');
  el.setAttribute('aria-label', 'Barra de utilitários');
  el.innerHTML = `
    <div class="topbar__inner">
      <div class="topbar__left">
        <a href="/" class="topbar__link topbar__link--active">
          Relações com Investidores
        </a>
        <span class="topbar__sep" aria-hidden="true"></span>
        <a href="#" class="topbar__link">Institucional</a>
      </div>
      <div class="topbar__tickers" aria-label="Cotação" aria-live="polite">
        ${tickers}
      </div>
      <div class="topbar__right">
        <div class="topbar__a11y" role="group" aria-label="Acessibilidade">
          <span class="topbar__a11y-label">Acessibilidade</span>
          <button class="topbar__a11y-btn" type="button" data-a11y="contrast"
            aria-label="Alternar alto contraste" data-tooltip="Alto contraste">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
              <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>
            </svg>
          </button>
          <button class="topbar__a11y-btn topbar__a11y-btn--font-up" type="button"
            data-a11y="font-up" aria-label="Aumentar fonte"
            data-tooltip="Aumentar texto">A<sup>+</sup></button>
          <button class="topbar__a11y-btn topbar__a11y-btn--font-down" type="button"
            data-a11y="font-down" aria-label="Reduzir fonte"
            data-tooltip="Reduzir texto">A<sup>-</sup></button>
        </div>
        <div class="topbar__sep" aria-hidden="true"></div>
        <div class="topbar__lang" role="group" aria-label="Idioma">
          <button class="topbar__lang-btn is-active" type="button"
            data-lang="pt" aria-pressed="true" data-tooltip="Português">PT</button>
          <span class="topbar__lang-sep" aria-hidden="true">|</span>
          <button class="topbar__lang-btn" type="button"
            data-lang="en" aria-pressed="false" data-tooltip="English">EN</button>
        </div>
      </div>
    </div>`;

  initTopbarBehavior(); // inicializa tickers, a11y, lang
}
```

### 5.4 `scripts/page.js` — Bootstrap de todas as páginas

```js
// scripts/page.js
import { siteConfig }  from './site.config.js';
import { initTopbar }  from './components/topbar.js';
import { initHeader }  from './components/header.js';
import { initFooter }  from './components/footer.js';
import { initSearch }  from './components/search.js';
import './reveal.js';
import './accordion.js';

// Inicializa todos os componentes compartilhados
initTopbar(siteConfig);
initHeader(siteConfig);
initFooter(siteConfig);
initSearch();

// Marca o link ativo no nav
document.querySelectorAll('.nav-dropdown__link').forEach(link => {
  if (link.getAttribute('href') === location.pathname.replace(/\/$/, '') ||
      link.getAttribute('href') === location.pathname + 'index.html') {
    link.setAttribute('aria-current', 'page');
  }
});
```

---

## 6. Shell HTML Padrão (toda página interna)

Todas as páginas internas compartilham este shell mínimo. O conteúdo real vai
apenas dentro do `<main>`.

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nome da Página — Empresa RI</title>
    <meta name="description" content="Descrição da página." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=FONTE:wght@400;500;600;700&display=swap"
          rel="stylesheet" />
    <link rel="stylesheet" href="/styles/main.scss" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </head>
  <body>

    <!-- Componentes injetados via JS -->
    <div id="site-topbar"></div>
    <header id="site-header"></header>

    <main>

      <!-- Page Header: breadcrumb + título + lede (obrigatório) -->
      <section class="page-header" aria-labelledby="page-title">
        <img class="page-header__bg"
             src="https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1920&q=80"
             alt="" aria-hidden="true" />
        <div class="page-header__overlay" aria-hidden="true"></div>
        <div class="page-header__inner">
          <ol class="page-header__breadcrumb" aria-label="Você está em">
            <li><a href="/">Home</a></li>
            <li><a href="/secao.html">Seção</a></li>
            <li aria-current="page">Nome da Página</li>
          </ol>
          <h1 id="page-title" class="page-header__title">Nome da Página</h1>
          <p class="page-header__lede">Subtítulo descritivo da página.</p>
        </div>
      </section>

      <!-- Conteúdo principal -->
      <section class="page-section" aria-label="Conteúdo">
        <div class="page-section__container">
          <!-- CONTEÚDO DA PÁGINA AQUI -->
        </div>
      </section>

    </main>

    <footer id="site-footer"></footer>

    <!-- Search overlay -->
    <div class="search-overlay" id="search-overlay" aria-hidden="true"
         aria-label="Busca" role="dialog">
      <div class="search-overlay__inner">
        <div class="search-overlay__box">
          <svg class="search-overlay__icon" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input class="search-overlay__input" type="search"
            placeholder="O que você está procurando?" aria-label="Campo de busca"
            data-search-input />
          <button class="search-overlay__close" type="button"
            aria-label="Fechar busca" data-search-close>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <p class="search-overlay__hint">Pressione <kbd>ESC</kbd> para fechar</p>
      </div>
    </div>

    <script type="module" src="/scripts/page.js"></script>
  </body>
</html>
```

---

## 7. Registrar Página no Vite

Para cada novo HTML, adicionar entrada em `vite.config.js`:

```js
// vite.config.js
rollupOptions: {
  input: {
    main:          resolve(__dirname, 'index.html'),
    visaoGeral:    resolve(__dirname, 'visao-geral.html'),
    nomeDaPagina:  resolve(__dirname, 'nome-da-pagina.html'), // ← adicionar
    // ...
  }
}
```

---

## 8. SCSS — Referência Rápida

### Breakpoints (usar SEMPRE os mixins)
```scss
@include respond-down(desktop)  // < 992px — tablet + mobile
@include respond-down(tablet)   // < 580px — mobile
@include respond-up(desktop)    // ≥ 992px — desktop only
```

### Espaçamento (`$spacing-N` = N × 4px)
```
$spacing-1=4px  $spacing-2=8px  $spacing-3=12px  $spacing-4=16px
$spacing-5=20px $spacing-6=24px $spacing-8=32px  $spacing-10=40px
$spacing-12=48px $spacing-14=56px $spacing-16=64px $spacing-20=80px
```
> Atenção: `$spacing-7` **não existe** (pular de 6 para 8).

### Container
```scss
.page-section__container { @include container; }
// max-width responsivo, centrado, padding lateral automático
```

### Grids padrão
```
Desktop: repeat(4, 1fr)
Tablet:  repeat(2, 1fr)  →  @include respond-down(desktop)
Mobile:  1fr             →  @include respond-down(tablet)
```

### Cores
```scss
var(--color-primary)          // cor primária (botões, destaques)
var(--color-secondary)        // cor secundária
var(--color-text)             // texto principal
var(--color-text-muted)       // texto secundário
var(--color-bg)               // fundo da página
var(--color-surface)          // superfície/card
var(--color-border)           // bordas
var(--color-primary-500)      // escala direta (100–900)
```

---

## 9. Templates de Páginas

Cada template define a estrutura HTML interna do `<main>` e o JS necessário.
Páginas começam **sem conteúdo de negócio** — apenas a estrutura pronta.

---

### 9.1 Template: Show (Conteúdo Editorial)

**Uso:** Visão Geral, Nossa História, Estratégias, Sustentabilidade, etc.
**Estrutura:** grid texto (3fr) + imagem (2fr), alternando lados entre seções.

```html
<!-- Seção normal: texto esquerda, imagem direita -->
<section class="page-section" aria-label="Descrição da seção">
  <div class="page-section__container">
    <div class="show-grid">

      <div class="show-grid__text">
        <span class="show-grid__eyebrow">Categoria</span>
        <h2 class="show-grid__title">Título da seção</h2>
        <div class="show-grid__body">
          <p>Parágrafo de conteúdo.</p>
          <p>Segundo parágrafo.</p>
        </div>
        <ul class="show-grid__highlights">
          <li>Destaque 1</li>
          <li>Destaque 2</li>
          <li>Destaque 3</li>
        </ul>
        <div class="show-grid__cta">
          <a class="btn btn--secondary btn--md" href="/pagina.html">CTA</a>
          <a class="btn btn--ghost btn--md" href="/outra.html">Secundário</a>
        </div>
      </div>

      <div class="show-grid__image">
        <img src="URL_IMAGEM" alt="Descrição" loading="lazy" />
      </div>

    </div>
  </div>
</section>

<!-- Seção invertida: imagem esquerda, texto direita -->
<section class="page-section" aria-label="Outra seção">
  <div class="page-section__container">
    <div class="show-grid show-grid--reversed">
      <!-- mesmo conteúdo, imagem vai para a esquerda automaticamente -->
    </div>
  </div>
</section>

<!-- Seção full-width: só texto, sem imagem -->
<section class="page-section" aria-label="Seção introdutória">
  <div class="page-section__container">
    <div class="show-grid show-grid--full">
      <div class="show-grid__text">
        <!-- texto apenas, max-width 740px -->
      </div>
    </div>
  </div>
</section>
```

**CSS classes disponíveis:**
- `.show-grid` — grid 3fr/2fr
- `.show-grid--reversed` — imagem à esquerda
- `.show-grid--full` — bloco de texto full-width
- `.show-grid__eyebrow` — label superior (cor primária, uppercase)
- `.show-grid__title` — h2 grande
- `.show-grid__body` — parágrafos
- `.show-grid__highlights` — lista com bullet primário
- `.show-grid__cta` — wrapper de botões
- `.show-grid__image` — container da imagem (ocupa 100% da altura)

**JS:** Nenhum além do `page.js`.

---

### 9.2 Template: List Simples (Documentos para Download)

**Uso:** Apresentações, Documentos CVM, Políticas, etc.

```html
<section class="page-section" aria-label="Filtros">
  <div class="page-section__container">

    <!-- Filtros -->
    <div class="page-filter" role="search" aria-label="Filtrar documentos">
      <div class="page-filter__fields">
        <div class="select">
          <select id="filter-year" aria-label="Filtrar por ano">
            <option value="">Todos os anos</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div class="select">
          <select id="filter-type" aria-label="Filtrar por tipo">
            <option value="">Todos os tipos</option>
            <option value="pdf">PDF</option>
            <option value="xls">Excel</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Lista de documentos (renderizada via JS) -->
    <ul class="doc-list" id="doc-list" aria-label="Lista de documentos">
      <!-- Renderizado pelo JS da página -->
    </ul>

    <!-- Template de item (referência — o JS gera isso) -->
    <!--
    <li class="doc-list__item">
      <span class="doc-list__badge doc-list__badge--pdf">PDF</span>
      <span class="doc-list__name">Nome do Documento</span>
      <span class="doc-list__date">01/01/2025</span>
      <span class="doc-list__size">1,2 MB</span>
      <a class="btn btn--ghost btn--sm" href="/docs/arquivo.pdf"
         target="_blank" download>Baixar</a>
    </li>
    -->
  </div>
</section>
```

**JS da página** (`scripts/nome-pagina.js`):
```js
import './page.js';
import { initAccordion } from './accordion.js'; // se usar agrupamento

const docs = [
  { year: 2025, type: 'pdf', name: 'Relatório 4T25', date: '15/03/2025',
    size: '2,1 MB', url: '/docs/relatorio-4t25.pdf' },
  // ...
];

function renderDocs(items) {
  const list = document.getElementById('doc-list');
  if (!list) return;
  list.innerHTML = items.map(d => `
    <li class="doc-list__item">
      <span class="doc-list__badge doc-list__badge--${d.type}">${d.type.toUpperCase()}</span>
      <span class="doc-list__name">${d.name}</span>
      <span class="doc-list__date">${d.date}</span>
      <span class="doc-list__size">${d.size}</span>
      <a class="btn btn--ghost btn--sm" href="${d.url}" target="_blank" download>Baixar</a>
    </li>`).join('');
}

// Filtros
document.getElementById('filter-year')?.addEventListener('change', applyFilters);
document.getElementById('filter-type')?.addEventListener('change', applyFilters);

function applyFilters() {
  const year = document.getElementById('filter-year')?.value;
  const type = document.getElementById('filter-type')?.value;
  const filtered = docs.filter(d =>
    (!year || d.year == year) && (!type || d.type === type));
  renderDocs(filtered);
}

renderDocs(docs);
```

**Badges disponíveis:** `.doc-list__badge--pdf` `.doc-list__badge--xls`
`.doc-list__badge--doc` `.doc-list__badge--ppt` `.doc-list__badge--zip`
`.doc-list__badge--xml`

---

### 9.3 Template: List Group (Documentos Agrupados em Accordion)

**Uso:** Atas de Assembleias, Estatuto e Políticas, Código de Conduta.

```html
<section class="page-section" aria-label="Filtros">
  <div class="page-section__container">

    <div class="page-filter" role="search">
      <div class="page-filter__fields">
        <div class="select">
          <select id="filter-year" aria-label="Filtrar por ano">
            <option value="">Todos os anos</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Accordion renderizado via JS -->
    <div class="accordion" data-accordion data-accordion-open="0"
         id="docs-accordion" aria-label="Documentos por categoria">
    </div>

  </div>
</section>
```

**JS da página:**
```js
import './page.js';
import { initAccordion } from './accordion.js';

const groups = [
  {
    title: 'Grupo A — 2025',
    year: 2025,
    docs: [
      { type: 'pdf', name: 'Documento 1', date: '01/01/2025',
        size: '800 KB', url: '/docs/doc1.pdf' },
    ]
  },
  // ...
];

function renderGroups(items) {
  const acc = document.getElementById('docs-accordion');
  if (!acc) return;
  acc.innerHTML = items.map((g, i) => `
    <div class="accordion__item">
      <button class="accordion__trigger" type="button"
        aria-expanded="false" data-accordion-trigger>
        ${g.title}
        <span class="accordion__bar"></span>
      </button>
      <div class="accordion__body" data-accordion-body>
        <div class="accordion__content">
          <ul class="doc-list">
            ${g.docs.map(d => `
              <li class="doc-list__item">
                <span class="doc-list__badge doc-list__badge--${d.type}">
                  ${d.type.toUpperCase()}
                </span>
                <span class="doc-list__name">${d.name}</span>
                <span class="doc-list__date">${d.date}</span>
                <span class="doc-list__size">${d.size}</span>
                <a class="btn btn--ghost btn--sm" href="${d.url}"
                   target="_blank" download>Baixar</a>
              </li>`).join('')}
          </ul>
        </div>
      </div>
    </div>`).join('');

  initAccordion(acc);  // ← obrigatório após renderizar
}

renderGroups(groups);
```

---

### 9.4 Template: Calendário de Eventos

**Uso:** Calendário de Eventos RI.

```html
<section class="page-section" aria-label="Filtros">
  <div class="page-section__container">
    <div class="page-filter">
      <div class="page-filter__fields">
        <div class="select">
          <select id="cal-year" aria-label="Ano"><option>2025</option></select>
        </div>
        <div class="select">
          <select id="cal-quarter" aria-label="Trimestre">
            <option value="">Todos</option>
            <option value="1">1T</option>
            <option value="2">2T</option>
            <option value="3">3T</option>
            <option value="4">4T</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="page-section" aria-label="Grade mensal">
  <div class="page-section__container">
    <div class="cal-layout">
      <div class="cal-months" id="cal-months">
        <!-- Grade mensal renderizada pelo JS -->
        <!-- Estrutura de cada mês:
        <div class="cal-month">
          <h3 class="cal-month__name">Janeiro 2025</h3>
          <div class="cal-month__grid">
            <span class="cal-month__day-label">Dom</span>...
            <button class="cal-month__day" data-date="2025-01-15">
              15
              <span class="cal-month__dot cal-month__dot--resultados"
                    data-tooltip="Divulgação 3T24"></span>
            </button>
            ...
          </div>
        </div>
        -->
      </div>
      <aside class="cal-upcoming" aria-label="Próximos eventos">
        <h3 class="cal-upcoming__title">Próximos Eventos</h3>
        <div id="cal-upcoming-list">
          <!-- Renderizado pelo JS -->
          <!-- Estrutura:
          <div class="cal-upcoming__item">
            <div class="cal-upcoming__date">15 Jan</div>
            <div class="cal-upcoming__info">
              <span class="cal-upcoming__cat cal-upcoming__cat--resultados">
                Resultados
              </span>
              <p class="cal-upcoming__title-text">Divulgação 4T24</p>
              <p class="cal-upcoming__time">Após fechamento</p>
              <div class="cal-upcoming__actions">
                <a href="URL_GMAIL" class="btn btn--ghost btn--sm" target="_blank">
                  <img src="/assets/Icones/icon-gmail.png" alt="" width="16">
                  Gmail
                </a>
                <a href="URL_OUTLOOK" class="btn btn--ghost btn--sm" target="_blank">
                  <img src="/assets/Icones/icon-outlook.png" alt="" width="16">
                  Outlook
                </a>
              </div>
            </div>
          </div>
          -->
        </div>
      </aside>
    </div>
  </div>
</section>
```

**Dados do JS:**
```js
const events = [
  {
    date:     '2025-03-15',     // ISO
    title:    'Divulgação Resultados 4T24',
    category: 'resultados',     // resultados | conferencia | assembleia | outros
    time:     'Após fechamento',
  },
  // ...
];
```

**Categorias e CSS vars de cor:**
```
resultados  → --cal-resultados    --cal-resultados-bg
conferencia → --cal-conferencia   --cal-conferencia-bg
assembleia  → --cal-assembleia    --cal-assembleia-bg
outros      → --cal-outros        --cal-outros-bg
```

**JS:** Importar `scripts/calendario-eventos.js` existente. Adaptá-lo para
receber o array `events` de forma configurável.

---

### 9.5 Template: Tabela de Dados

**Uso:** Composição Acionária, Ratings, Dividendos (tabular), etc.

```html
<section class="page-section" aria-label="Filtros">
  <div class="page-section__container">
    <div class="page-filter">
      <div class="page-filter__fields">
        <div class="select">
          <select id="filter-year" aria-label="Ano"></select>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="page-section" aria-label="Dados">
  <div class="page-section__container">
    <div class="data-table">
      <div class="data-table__scroller">
        <table aria-label="Descrição da tabela">
          <thead>
            <tr>
              <th scope="col">Coluna 1</th>
              <th scope="col">Coluna 2</th>
              <th scope="col" class="mono">Valor</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <!-- Renderizado pelo JS -->
            <!-- Exemplo de linha:
            <tr>
              <td>Dado</td>
              <td>Dado</td>
              <td class="mono">R$ 1.234,56</td>
              <td><span class="div-status--active">Ativo</span></td>
            </tr>
            -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
```

**Classes de status disponíveis:**
```
.div-status--active     verde
.div-status--inactive   cinza
.div-status--pending    amarelo
```

**JS da página:**
```js
import './page.js';

const rows = [
  { col1: 'Valor', col2: 'Valor', amount: 'R$ 0,00', status: 'active' },
];

function render(data) {
  document.getElementById('table-body').innerHTML = data.map(r => `
    <tr>
      <td>${r.col1}</td>
      <td>${r.col2}</td>
      <td class="mono">${r.amount}</td>
      <td><span class="div-status--${r.status}">${r.status}</span></td>
    </tr>`).join('');
}

render(rows);
```

---

### 9.6 Template: Central de Resultados

**Uso:** Central de Resultados, Apresentações e Teleconferências.
Estrutura especial: abas por ano + cards por trimestre.

```html
<section class="page-section" aria-label="Central de Resultados">
  <div class="page-section__container">

    <!-- Abas de ano -->
    <div class="cr-tabs" role="tablist" aria-label="Selecionar ano" id="cr-tabs">
      <!-- Renderizado pelo JS:
      <button class="cr-tab is-active" role="tab" data-year="2025">2025</button>
      <button class="cr-tab" role="tab" data-year="2024">2024</button>
      -->
    </div>

    <!-- Grid de trimestres -->
    <div class="cr-grid" id="cr-grid">
      <!-- Renderizado pelo JS:
      <div class="cr-card">
        <div class="cr-card__quarter">4T25</div>
        <h3 class="cr-card__title">Resultados 4T25</h3>
        <p class="cr-card__date">15/03/2026</p>
        <ul class="cr-card__links">
          <li>
            <a href="/docs/release-4t25.pdf" class="cr-card__link"
               target="_blank">
              <span class="doc-list__badge doc-list__badge--pdf">PDF</span>
              Release de Resultados
            </a>
          </li>
          <li>
            <a href="https://youtube.com/watch?v=ID" class="cr-card__link"
               target="_blank">
              Webcast
            </a>
          </li>
        </ul>
      </div>
      -->
    </div>

  </div>
</section>
```

**Dados do JS:**
```js
const results = {
  2025: [
    {
      quarter: '4T25',
      title:   'Resultados 4T25',
      date:    '15/03/2026',
      links: [
        { type: 'pdf', label: 'Release de Resultados', url: '/docs/release-4t25.pdf' },
        { type: 'pdf', label: 'Apresentação',          url: '/docs/apres-4t25.pdf'   },
        { type: 'link', label: 'Webcast',              url: 'https://youtube.com/...' },
      ]
    },
    // 3T25, 2T25, 1T25...
  ],
  2024: [ /* ... */ ],
};
```

---

### 9.7 Template: Form (Contato / Cadastro)

**Uso:** Fale com RI, Mailing, Trabalhe Conosco.

```html
<section class="page-section" aria-label="Formulário">
  <div class="page-section__container">
    <div class="contact-grid">

      <!-- Coluna de informações -->
      <div class="contact-info">
        <span class="contact-info__eyebrow">Fale Conosco</span>
        <h2 class="contact-info__title">Entre em contato</h2>
        <div class="contact-info__body">
          <p>Texto introdutório.</p>
        </div>
        <ul class="contact-info__items">
          <li>
            <svg><!-- ícone --></svg>
            <span>email@empresa.com.br</span>
          </li>
          <li>
            <svg><!-- ícone --></svg>
            <span>+55 (11) 0000-0000</span>
          </li>
        </ul>
      </div>

      <!-- Coluna do formulário -->
      <div class="contact-form-card">
        <form data-contact-form novalidate>

          <div class="field">
            <label class="field__label" for="name">Nome *</label>
            <input class="field__input" type="text" id="name" name="name"
                   placeholder="Seu nome completo" required />
          </div>

          <div class="field">
            <label class="field__label" for="email">E-mail *</label>
            <input class="field__input" type="email" id="email" name="email"
                   placeholder="seu@email.com" required />
          </div>

          <div class="field">
            <label class="field__label" for="subject">Assunto</label>
            <div class="select">
              <select id="subject" name="subject" class="field__input">
                <option value="">Selecione</option>
                <option>Informações financeiras</option>
                <option>Assembleia</option>
                <option>Outro</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="field__label" for="message">Mensagem *</label>
            <textarea class="field__textarea" id="message" name="message"
                      rows="5" placeholder="Sua mensagem..." required></textarea>
          </div>

          <button class="btn btn--secondary btn--lg" type="submit">
            Enviar mensagem
          </button>

          <!-- Feedback de sucesso -->
          <div class="contact-success" data-form-success aria-live="polite">
            <p>Mensagem enviada com sucesso. Entraremos em contato em breve.</p>
          </div>

        </form>
      </div>

    </div>
  </div>
</section>
```

**JS:** O `page.js` já trata o `[data-contact-form]` (preventDefault, mostra
`.contact-success`, reseta o form). Nenhum JS extra necessário para o fluxo básico.

---

### 9.8 Template: Galeria

**Uso:** Galeria de imagens, vídeos ou relatórios.

```html
<section class="page-section" aria-label="Filtros">
  <div class="page-section__container">
    <div class="page-filter">
      <div class="page-filter__fields">
        <div class="select">
          <select id="filter-year" aria-label="Ano"></select>
        </div>
        <div class="select">
          <select id="filter-type" aria-label="Tipo"></select>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="page-section" aria-label="Galeria">
  <div class="page-section__container">

    <div class="gallery-grid" id="gallery-grid">
      <!-- Renderizado pelo JS:
      <a class="gallery-card" href="/item.html">
        <div class="gallery-card__image">
          <img src="URL" alt="Descrição" loading="lazy" />
          <span class="gallery-card__badge">Tipo</span>
        </div>
        <div class="gallery-card__body">
          <h3 class="gallery-card__title">Título do item</h3>
          <p class="gallery-card__date">Janeiro 2025</p>
        </div>
      </a>
      -->
    </div>

    <!-- Paginação -->
    <nav class="pagination" aria-label="Paginação">
      <button class="pagination__btn" id="prev-page" aria-label="Anterior">
        ← Anterior
      </button>
      <div class="pagination__pages" id="page-numbers"></div>
      <button class="pagination__btn" id="next-page" aria-label="Próximo">
        Próximo →
      </button>
    </nav>

  </div>
</section>
```

**Dados do JS:**
```js
const items = [
  {
    year: 2025, type: 'Relatório',
    title: 'Relatório Anual 2024',
    date:  'Março 2025',
    image: 'URL_IMAGEM',
    url:   '/relatorio-2024.html',
  },
];

const PER_PAGE = 9;
```

---

## 10. Customização Visual

### 10.1 Cores (`styles/abstracts/_colors.scss`)

Para cada cor do PDF, gerar a escala 100–900:
- **100–400:** interpolação entre `#FFFFFF` e a cor base (tons claros)
- **500:** a cor exata do PDF (default)
- **600–900:** versões progressivamente mais escuras (~12%, 25%, 40%, 55%)

```scss
// Exemplo — primary #2EA24F
$color-primary-light-100: #EAF6EE;
$color-primary-light-200: #C5E8CF;
$color-primary-light-300: #96D4A8;
$color-primary-light-400: #5FBF7C;
$color-primary-light-500: #2EA24F;   // ← cor do PDF
$color-primary-light-600: #258742;
$color-primary-light-700: #1C6C35;   // hover
$color-primary-light-800: #135128;
$color-primary-light-900: #0A361A;   // pressed
```

**`$color-on-primary`:** Verificar contraste WCAG:
- Luminância da cor > 0,18 → texto **preto** `#000000`
- Luminância da cor < 0,18 → texto **branco** `#ffffff`

### 10.2 Fontes (`styles/abstracts/_typography.scss`)

```scss
$font-family-base:    'Nome da Fonte', system-ui, sans-serif;
$font-family-display: 'Nome da Fonte Display', system-ui, sans-serif;
```

Fonts disponíveis em Google Fonts → usar diretamente.
Fonts pagas (ex: Univers) → usar substituta (Source Sans 3) e carregar
versão licenciada via Adobe Fonts no `<head>`.

### 10.3 Logos

Colocar em `assets/logotipo/`:
- `logotipo-original.svg` — colorido (header fundo claro)
- `logotipo-negative.svg` — branco (header escuro, rodapé, modo contraste)
- `logotipo-black.svg` — preto (opcional)

Referenciados apenas no `siteConfig` — não repetir caminhos no HTML.

### 10.4 Tickers e Rodapé

Editar apenas `scripts/site.config.js`. Todos os HTMLs herdam automaticamente.

---

## 11. Deploy

### 11.1 GitHub

```bash
git add -A
git commit -m "Inicializa projeto <nome-cliente>"
git push -u origin main
```

### 11.2 Vercel

1. vercel.com → **Add New Project**
2. Importar `astri-solutions/<nome-cliente>`
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy

O `vercel.json` já está configurado com rewrites para SPA:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/$1" }]
}
```

---

## 12. Checklist de Entrega

### Identidade
- [ ] `siteConfig.company.name` e `nameShort` preenchidos
- [ ] `siteConfig.tickers` com símbolos reais
- [ ] Logos em `assets/logotipo/` (3 variantes)
- [ ] Favicon em `public/favicon.svg`
- [ ] Cores em `_colors.scss` (escala 100–900)
- [ ] Fonte em `_typography.scss` + `<link>` do Google Fonts

### Estrutura
- [ ] `siteConfig.nav` reflete a árvore de canais do cliente
- [ ] `siteConfig.footer.columns` com links corretos
- [ ] Todos os HTMLs têm `<div id="site-topbar">`, `<header id="site-header">`,
      `<footer id="site-footer">`
- [ ] Todas as páginas registradas em `vite.config.js`
- [ ] Cada página tem `page-header` com breadcrumb, título e lede

### Qualidade
- [ ] `npm run build` passa sem erros
- [ ] Nav link ativo marcado em cada página (verificar `aria-current="page"`)
- [ ] Responsivo testado: mobile 375px, tablet 768px, desktop 1280px
- [ ] Modo alto contraste: todo conteúdo visível
- [ ] Tooltips na topbar funcionando
- [ ] Formulários de contato e mailing testados

### Deploy
- [ ] Push para `main` no GitHub
- [ ] Deploy no Vercel sem erros de build
- [ ] URL de preview testada
