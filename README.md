# Astri RI — Páginas para Relações com Investidores

Projeto multi-página construído com **Vite + Sass**, preparado para deploy no **Vercel**. Cada página de RI vive em um arquivo HTML separado, mas todas compartilham o mesmo sistema de design (cores, tipografia, breakpoints, componentes).

---

## Stack

- **Vite 5** — bundler com servidor de desenvolvimento.
- **Sass (dart-sass)** — variáveis, mixins, módulos `@use` / `@forward`.
- **Vanilla JS** — sem framework. Cada página tem o seu próprio script.

---

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
npm run preview  # serve /dist localmente
```

---

## Deploy no Vercel

1. Faça push para um repositório (GitHub/GitLab/Bitbucket).
2. No painel do Vercel, importe o repositório — `vercel.json` já cuida do resto:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Deploy.

---

## Sistema de Breakpoints

Definidos em `src/styles/abstracts/_breakpoints.scss` e aplicados pelo mixin `@container` em `_mixins.scss`. A largura do container muda em cada faixa:

| Faixa            | Range          | Container | Chave Sass |
|------------------|----------------|-----------|------------|
| Mobile           | < 580px        | **90%**   | `(padrão)` |
| Tablet           | 580px – 991px  | **80%**   | `tablet` ou `sm` |
| Desktop          | 992px – 1540px | **80%**   | `desktop` ou `md` |
| Desktop Large    | > 1540px       | **70%**   | `large` ou `lg` |

Uso nas folhas de estilo:

```scss
@use '../abstracts' as *;

.minha-secao {
  @include respond-up(desktop) {
    grid-template-columns: 1fr 1fr;
  }
}

.minha-secao__wrap {
  @include container;   // aplica 90% / 80% / 80% / 70% automaticamente
}
```

Mixins de seção também respeitam os breakpoints:

- `@include section` — `margin-top` e `margin-bottom` de **112px** em desktop+ (64px em mobile).
- `@include section-stack` — `gap` interno de **72px** em desktop+ (40px em mobile).

---

## Sistema de cores

| Paleta | Light 500 (base) | Dark 500 (base) |
| ------ | ---------------- | --------------- |
| Primary   | `#00D865` | `#00D865` |
| Secondary | `#0B5B68` | `#0B5B68` |
| Tertiary  | `#EDEDE6` | `#EDEDE6` |

Cada paleta com variações 100–900. Definidas em `_colors.scss` como Sass **e** como CSS custom properties em `_root.scss`:

```scss
.foo { background: $color-primary-500; }       // Sass
.foo { background: var(--color-primary-500); } // CSS custom property
```

### Tema dark
Aplique `data-theme="dark"` no `<html>` ou `<body>`.

---

## Tipografia

- **Display:** Fraunces (com itálico para palavras em destaque no banner)
- **Body / UI:** Inter
- **Mono:** JetBrains Mono

Carregadas via Google Fonts no `<head>` dos HTMLs.

---

## Páginas disponíveis

### 🏠 Home (`/`)
Estrutura em 6 blocos:

1. **Banner / Slider** — full width, 80vh, 3 slides com troca automática a cada 4s, animação slide-left, bullets com barra de progresso e setas de navegação. Pausa no hover/foco.
2. **Seção RI (3 colunas)** — Últimas atualizações (4 itens), Central de Resultados (até 6 itens), Próximos Eventos (4 itens com data destacada).
3. **Sobre** — texto introdutório + 4 big numbers (colaboradores, unidades, estados, experiência).
4. **Mailing** — formulário de cadastro (nome, e-mail, empresa).
5. **Contato** — informações + formulário (nome, e-mail, assunto, mensagem).
6. **Footer** — 4 colunas.

### 📊 Central de Resultados — V1 (`/pages/central-resultados-v1.html`)
- **Header Interno** com título, breadcrumb (`Home / Relações com Investidores / Central de Resultados`) e bg-image.
- **Section** com `margin-top` e `margin-bottom` de 112px e `gap` interno de 72px.
- **Container** 80% em resoluções 992–1540px (e 70% em > 1540px).
- **Filtro** de ano.
- **Tabela** com 5 colunas. Cabeçalho na ordem **4T(ano) → 3T(ano) → 2T(ano) → 1T(ano)** (decrescente). Primeira célula da primeira coluna em branco.
- **Linhas:** Teleconferência, Apresentação, ITR, DFP, Vídeo, Transcrição (com ícones por tipo).

### 🗂 Sumário (`/pages/sumario.html`)
Catálogo de desenvolvimento — lista das páginas em construção.

---

## Estrutura

```
astri-ri/
├── index.html                       # Home (página principal, na raiz)
├── pages/
│   ├── central-resultados-v1.html
│   └── sumario.html
├── scripts/
│   ├── home.js                      # Slider + handlers de formulário
│   └── central-resultados-v1.js     # Filtro + render da tabela
├── styles/
│   ├── main.scss                    # entrypoint
│   ├── abstracts/                   # tokens (cores, type, spacing, breakpoints, mixins)
│   ├── base/                        # reset, :root (CSS vars), tipografia
│   ├── layouts/                     # header, footer
│   ├── components/                  # button, select, file-icon, form, card
│   └── pages/                       # estilos específicos por página
├── assets/                          # imagens, fontes locais, etc.
├── public/                          # assets estáticos copiados como-estão
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Adicionando uma nova página

1. Crie o HTML em `pages/minha-pagina.html`.
2. Crie os estilos em `styles/pages/_minha-pagina.scss` e registre em `pages/_index.scss`.
3. Crie o script (opcional) em `scripts/minha-pagina.js`.
4. Adicione a entrada em `vite.config.js > rollupOptions.input`.
5. Adicione um card no sumário (`pages/sumario.html`).

A página herda automaticamente os breakpoints, cores e tipografia. Use `@include container` no wrapper principal e `@include section` em seções para herdar o spacing padrão.
