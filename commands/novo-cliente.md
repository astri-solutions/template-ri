# Novo Cliente RI

Cria um novo site de RI completo baseado no Template RI para um novo cliente.

## O que você precisa fornecer

O usuário deve informar:
1. **Nome do repositório/projeto** (ex: `cliente-xyz`)
2. **PDF com diretrizes visuais** — cores, tipografia e árvore de canais (sitemap)

## Passo a passo

### 1. Ler o PDF de diretrizes

Use a ferramenta Read para abrir o PDF fornecido e extrair:
- **Cores primária e secundária** (hex)
- **Fonte principal** (display/headings) e fonte de texto (body)
- **Árvore de canais** — lista de páginas que o cliente quer

### 2. Criar o repositório

Use a ferramenta `mcp__github__create_repository` para criar o repo:
- owner: `astri-solutions`
- name: nome fornecido (ex: `cliente-xyz`)
- private: true

### 3. Clonar o Template RI como base

```bash
git clone <URL_TEMPLATE_RI> /tmp/<nome-cliente>
cd /tmp/<nome-cliente>
git remote remove origin
git remote add origin <URL_NOVO_REPO>
git checkout -b main
```

### 4. Substituir cores

No arquivo `styles/abstracts/_colors.scss`, substituir os valores de PRIMARY e SECONDARY pelas cores do PDF. Manter toda a escala de 100–900 interpolando entre branco e a cor base.

Exemplo — se a cor primária for `#E63228`:
```scss
$color-primary-light-500: #E63228;   // default
$color-primary-light-700: #CC2920;   // hover (~15% mais escuro)
$color-primary-light-900: #A01F18;   // pressed (~35% mais escuro)
```

Ajustar `$color-on-primary` conforme contraste (preto ou branco).

### 5. Substituir fontes

No arquivo `styles/abstracts/_typography.scss`:
```scss
$font-family-base:    '<FONTE_BODY>', system-ui, sans-serif;
$font-family-display: '<FONTE_DISPLAY>', system-ui, sans-serif;
```

Em `index.html` (e todos os HTMLs do projeto), trocar os `<link>` do Google Fonts pelo(s) da nova fonte:
```html
<link href="https://fonts.googleapis.com/css2?family=<NOVA_FONTE>:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 6. Remover páginas fora da árvore de canais

Comparar a lista de páginas do Template RI com a árvore de canais do PDF. Para cada página que **não** existe na árvore do cliente:

1. Deletar o `.html` da raiz do projeto
2. Remover a entrada correspondente em `vite.config.js`
3. Remover os links para essa página do nav em todos os HTMLs restantes

**Páginas do Template RI e seus arquivos:**
| Arquivo | Seção |
|---------|-------|
| `index.html` | Home |
| `home-atalhos.html` | Home |
| `sumario.html` | Sumário |
| `visao-geral.html` | A Companhia |
| `nossa-historia.html` | A Companhia |
| `estrategias-vantagens.html` | A Companhia |
| `portfolio.html` | A Companhia |
| `nosso-time.html` | A Companhia |
| `composicao-acionaria.html` | Governança |
| `diretoria-conselho.html` | Governança |
| `estatuto-politicas.html` | Governança |
| `codigo-conduta.html` | Governança |
| `atas-assembleias.html` | Governança |
| `sustentabilidade.html` | Governança |
| `central-resultados.html` | Financeiro |
| `apresentacoes.html` | Financeiro |
| `endividamento.html` | Financeiro |
| `dividendos-recompra.html` | Financeiro |
| `documentos-cvm.html` | Investidores |
| `calendario-eventos.html` | Investidores |
| `ratings-cobertura.html` | Investidores |
| `como-investir.html` | Investidores |
| `glossario.html` | Contato |
| `fale-com-ri.html` | Contato |
| `mailing.html` | Contato |
| `fatores-risco.html` | Contato |
| `trabalhe-conosco.html` | Contato |
| `politica-de-privacidade.html` | Legal |
| `termos-e-condicoes.html` | Legal |
| `definicao-de-cookies.html` | Legal |

### 7. Atualizar textos de identidade da empresa

Substituir "Empresa Template" / "Nome da Empresa" pelo nome do cliente em:
- Todos os HTMLs: `<title>`, `<meta name="description">`, `<meta property="og:*">`, header/footer
- `scripts/nav.js`: nome no topbar

### 8. Substituir logos

Pedir ao cliente os arquivos SVG de logo nas três variantes abaixo e colocá-los em `assets/logotipo/`:

| Arquivo | Uso | Descrição |
|---------|-----|-----------|
| `logotipo-original.svg` | Header (fundo claro) | Versão colorida normal |
| `logotipo-negative.svg` | Header dark, drawer, rodapé, "Powered by" | Versão branca para fundos escuros |
| `logotipo-black.svg` | Opcional — fundos neutros | Versão preta |

Se o cliente ainda não tiver os SVGs, usar placeholders temporários e deixar um comentário `<!-- TODO: substituir logo -->` em cada ocorrência.

As referências nos HTMLs já apontam para esses caminhos — não é necessário alterar o HTML, apenas substituir os arquivos.

### 9. Substituir tickers

Os tickers ASTR3 e ASTR4 estão hardcoded em todos os HTMLs e no rodapé de cada página. Usar `sed` para substituir em lote:

```bash
# Exemplo: cliente com tickers XPTO3 e XPTO4
find . -name "*.html" -exec sed -i \
  -e 's/ASTR3/XPTO3/g' \
  -e 's/ASTR4/XPTO4/g' \
  {} +
```

Verificar também os valores de cotação iniciais (`R$ 26,27`, `R$ 22,15`) e os percentuais de variação — substituir por valores reais ou zerar com `--` até o feed ao vivo ser configurado.

### 10. Atualizar dados do rodapé

Em todos os HTMLs, localizar o bloco `.site-footer__info` e substituir:

| Campo | Template | Substituir por |
|-------|----------|----------------|
| Endereço | Avenida Brigadeiro Faria Lima, nº 2.277… | Endereço real do cliente |
| E-mail | `comercial@astri.solutions` | E-mail RI do cliente |
| Telefone | `+55 (11) 98444-7855` | Telefone do cliente |
| Copyright | `©Copyright Astri 2026` | Nome real + ano atual |
| Links sociais | `href="#"` | URLs reais do cliente |

```bash
# Substituição em lote do e-mail (exemplo)
find . -name "*.html" -exec sed -i \
  's/comercial@astri\.solutions/<email-cliente>/g' {} +
```

### 11. Substituir favicon

Substituir `public/favicon.svg` pela versão do cliente. Se não houver SVG, converter o logo para SVG simples ou usar um PNG via `<link rel="icon" href="/favicon.png">`.

### 12. Build e verificação

```bash
npm install
npm run build
```

Verificar que o build passa sem erros.

### 13. Commit e push

```bash
git add -A
git commit -m "Inicializa projeto <nome-cliente> baseado no Template RI"
git push -u origin main
```

### 14. Deploy no Vercel (instrução manual)

Como o Vercel requer autenticação pelo browser:
1. Acesse vercel.com → "Add New Project"
2. Importe o repo `astri-solutions/<nome-cliente>` do GitHub
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Clique em Deploy

---

## Estrutura do Template RI — referência rápida

### SCSS
```
styles/
  abstracts/        ← variáveis, tokens, mixins, breakpoints
    _colors.scss    ← paleta de cores (EDITAR)
    _typography.scss← fontes e tamanhos (EDITAR)
    _spacing.scss   ← escala 4px ($spacing-1 a $spacing-32, sem $spacing-7)
    _tokens.scss    ← radius, shadows, transitions, z-index
    _breakpoints.scss← tablet: 580px, desktop: 992px, large: 1541px
    _mixins.scss    ← respond-down(desktop|tablet|large), container
  base/             ← reset, tipografia base, root CSS vars (light/dark)
  components/       ← button, card, form, accordion, data-table, doc-list, etc.
  layouts/          ← header, footer, page, topbar
  pages/            ← estilos específicos de cada página
  main.scss         ← ponto de entrada
```

### Breakpoints (usar sempre os mixins)
- `@include respond-down(desktop)` → abaixo de 992px
- `@include respond-down(tablet)` → abaixo de 580px

### Grids padrão
- 4 colunas → desktop
- 2 colunas → `respond-down(desktop)`
- 1 coluna → `respond-down(tablet)`

### Componentes reutilizáveis
- `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--lg`, `.btn--sm`
- `.card`, `.card__link`
- `.field`, `.field__input`, `.field__label`, `.field__textarea`
- `.select`
- `.accordion[data-accordion]` (init via `accordion.js`)
- `.data-table > .data-table__scroller > table`
- `.doc-list > .doc-list__item`
- `.page-filter`
- `.page-header` (breadcrumb + título + lede)
- `.page-section > .page-section__container`
- `[data-reveal]` (fade-in on scroll via `reveal.js`)
- `[data-counter]` (count-up animation via `counter.js`)

### Scripts base (importar em todo JS de página)
```js
import './topbar.js';
import './nav.js';
import './reveal.js';
```

### Templates de páginas disponíveis
- **List Simples** — documentos para download com filtro
- **List Group** — documentos agrupados em accordion
- **Calendário** — grade mensal + lista de próximos eventos
- **Form** — formulário de contato/cadastro
- **Tabela** — dados tabulares com filtros
- **Show** — conteúdo editorial (texto + imagem)
- **Galeria** — grid de cards com filtro e paginação
