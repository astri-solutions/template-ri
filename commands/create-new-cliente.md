# Create New Cliente RI

Cria um novo site de Relações com Investidores completo baseado no Template RI,
do repositório ao deploy, com identidade visual e estrutura personalizadas.

## Como invocar

```
/create-new-cliente
```

O comando é interativo: faz perguntas ao longo do processo e aguarda as
respostas antes de avançar.

---

## Passo 1 — Criar projeto no Claude Code

Informe o usuário:

> Para começar, crie um novo projeto no Claude Code:
> 1. Acesse **claude.ai/code** → botão **"New Project"**
> 2. Nome do projeto: **`<nome-cliente>`** (ex: `xyz-ri`)
> 3. Deixe o campo de repositório em branco por enquanto — vamos criar o repo
>    no próximo passo e conectar depois.

Aguarde confirmação de que o projeto foi criado antes de continuar.

---

## Passo 2 — Criar repositório no GitHub

Use a ferramenta `mcp__github__create_repository` para criar o repositório:

```json
{
  "owner": "astri-solutions",
  "name": "<nome-cliente>",
  "private": true,
  "description": "Site RI — <Nome Completo do Cliente>"
}
```

Após criar, anote a URL do repositório (`https://github.com/astri-solutions/<nome-cliente>`).

Informe o usuário para conectar o projeto Claude ao repositório recém-criado:
> No projeto Claude que você criou, vá em **Settings → Repository** e conecte
> ao repositório `astri-solutions/<nome-cliente>`.

---

## Passo 3 — Duplicar o Template RI

Clone o template e reaponte o remote:

```bash
cd /tmp
git clone https://github.com/astri-solutions/template-ri <nome-cliente>
cd <nome-cliente>
git remote remove origin
git remote add origin https://github.com/astri-solutions/<nome-cliente>.git
git checkout -b main
```

Copiar também o `CLAUDE.md` ajustando o nome da branch de trabalho:

```bash
sed -i 's/claude\/vigilant-carson-DcJFZ/claude\/setup-<nome-cliente>/g' CLAUDE.md
```

---

## Passo 4 — Conectar ao Vercel

Tente criar o projeto no Vercel usando a ferramenta `mcp__dc1ef743__deploy_to_vercel`
ou `mcp__dc1ef743__get_project`.

Se as ferramentas Vercel estiverem disponíveis, crie o projeto com:
- **Nome:** `<nome-cliente>`
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Repositório:** `astri-solutions/<nome-cliente>`

Se **não** for possível criar automaticamente, instrua o usuário:

> 1. Acesse **vercel.com** → "Add New Project"
> 2. Importe `astri-solutions/<nome-cliente>` do GitHub
> 3. Framework Preset: **Vite** | Build: `npm run build` | Output: `dist`
> 4. Clique em **Deploy**
> 5. Após o deploy inicial, copie a **URL do projeto Vercel** e me envie para
>    eu registrar nos metadados do projeto.

---

## Passo 5 — Solicitar PDF de diretrizes

Pergunte ao usuário:

> Por favor, envie o **PDF com as diretrizes visuais** do cliente contendo:
> - Cores primária, secundária e terciária (hex ou RGB)
> - Família(s) tipográficas
> - Árvore de canais (sitemap) — quais páginas o cliente precisa

Após receber o PDF, use a ferramenta **Read** para extrair:
- `--primary-500`: cor principal
- `--secondary-500`: cor secundária
- `--tertiary-500`: cor terciária (se houver; caso contrário manter a padrão)
- `font-family-display`: fonte de títulos
- `font-family-base`: fonte de texto
- Lista de páginas necessárias

---

## Passo 6 — Remover páginas fora do sitemap

Compare a lista do PDF com as páginas do template. Para cada página **ausente**
no sitemap do cliente:

1. Deletar o `.html` da raiz
2. Remover a entrada em `vite.config.js`
3. Remover links no nav de todos os HTMLs restantes
4. Remover links no rodapé

**Mapa completo de páginas do template:**

| Arquivo | Seção |
|---------|-------|
| `index.html` | Home |
| `home-atalhos.html` | Home — variante atalhos |
| `sumario.html` | Sumário Executivo |
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

---

## Passo 7 — Substituir cores (escala 100–900)

No arquivo `styles/abstracts/_colors.scss`, gerar a escala completa para cada
cor extraída do PDF. A cor 500 vem do documento; as demais são interpolações:

| Tom | Geração |
|-----|---------|
| 100 | base + 92% branco |
| 200 | base + 80% branco |
| 300 | base + 65% branco |
| 400 | base + 45% branco |
| **500** | **cor base do PDF** |
| 600 | base + 20% preto |
| 700 | base + 35% preto (hover) |
| 800 | base + 50% preto |
| 900 | base + 65% preto (pressed) |

Exemplo — cor primária `#1A73E8`:

```scss
// Primary
$color-primary-light-100: #e8f0fd;
$color-primary-light-200: #d2e3fb;
$color-primary-light-300: #aecbf8;
$color-primary-light-400: #7baaf4;
$color-primary-light-500: #1a73e8;   // ← PDF
$color-primary-light-600: #1560c5;
$color-primary-light-700: #1050a0;
$color-primary-light-800: #0b3d7a;
$color-primary-light-900: #072b55;

$color-on-primary: #ffffff; // ajustar para #000 se a cor 500 for muito clara
```

Repetir para `secondary` e `tertiary`. Se o cliente não tiver cor terciária,
manter a padrão do template.

---

## Passo 8 — Substituir fontes

Em `styles/abstracts/_typography.scss`:

```scss
$font-family-base:    '<FonteBody>', system-ui, sans-serif;
$font-family-display: '<FonteDisplay>', system-ui, sans-serif;
```

Em **todos** os HTMLs, trocar o `<link>` do Google Fonts:

```html
<!-- Remover -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

<!-- Adicionar -->
<link href="https://fonts.googleapis.com/css2?family=<NovaFonte>:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

```bash
# Substituição em lote
find . -name "*.html" -exec sed -i \
  's|Plus+Jakarta+Sans.*display=swap|<URL_NOVA_FONTE>|g' {} +
```

---

## Passo 9 — Selecionar variantes de página

Pergunte ao usuário quais variantes serão usadas para as seções com múltiplas
opções. Exemplo:

> Algumas seções do RI têm variantes de layout. Confirme qual usar para cada uma:
>
> **Home:**
> - `home-atalhos.html` — grade de atalhos rápidos para as principais seções
> - _(variantes adicionais podem ser criadas conforme briefing)_
>
> **Central de Resultados:**
> - Layout padrão (tabela de releases + downloads)
> - _(variante com cards visuais pode ser criada se preferir)_
>
> Há alguma página que precisa de um layout diferente do template padrão?

Com base nas respostas, ajustar ou criar as variantes necessárias antes de
prosseguir.

---

## Passo 10 — Substituir identidade (logos, tickers, rodapé, favicon)

### Logos
Solicitar ao cliente os SVGs nas três variantes e colocar em `assets/logotipo/`:

| Arquivo | Uso |
|---------|-----|
| `logotipo-original.svg` | Header fundo claro |
| `logotipo-negative.svg` | Header dark, drawer, rodapé, "Powered by" |
| `logotipo-black.svg` | Alternativa para fundos neutros |

### Tickers
```bash
find . -name "*.html" -exec sed -i \
  -e 's/ASTR3/<TICKER3>/g' \
  -e 's/ASTR4/<TICKER4>/g' {} +
```
Atualizar também os valores de cotação iniciais (`R$ 26,27`, `R$ 22,15`) com
valores reais ou substituir por `--` até o feed ao vivo ser conectado.

### Rodapé (todos os HTMLs)

| Campo atual | Substituir por |
|-------------|----------------|
| `Avenida Brigadeiro Faria Lima, nº 2.277…` | Endereço do cliente |
| `comercial@astri.solutions` | E-mail RI do cliente |
| `+55 (11) 98444-7855` | Telefone do cliente |
| `©Copyright Astri 2026` | Nome do cliente + ano atual |
| Links sociais `href="#"` | URLs reais do cliente |

### Favicon
Substituir `public/favicon.svg` pelo ícone do cliente.

---

## Passo 11 — Configurar analytics

Pergunte ao usuário:

> Qual provedor de analytics o cliente usa?
> - **Google Tag Manager** (recomendado — gerencia GA4, pixels, etc.)
> - **Google Analytics 4** direto
> - **Outro** (especifique)
> - **Nenhum por enquanto**

### Google Tag Manager (GTM)
Adicionar no `<head>` de todos os HTMLs, logo após o `<meta charset>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

E logo após o `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Substituir `GTM-XXXXXXX` pelo ID real do cliente.

### Google Analytics 4 (direto)
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Adicionar no `<head>` de todos os HTMLs com o ID real.

---

## Passo 12 — Build e verificação

```bash
npm install
npm run build
```

Verificar que o build passa sem erros e nenhum asset está quebrado.

---

## Passo 13 — Commit e push

```bash
git add -A
git commit -m "chore: inicializa <nome-cliente> baseado no Template RI"
git push -u origin main
```

---

## Passo 14 — Checklist final

Confirme cada item antes de declarar o projeto pronto:

### Identidade visual
- [ ] Cores primária, secundária e terciária substituídas (escala 100–900)
- [ ] `$color-on-primary` / `$color-on-secondary` corretos para contraste
- [ ] Fontes atualizadas em `_typography.scss` e em todos os `<link>` HTML
- [ ] Logos substituídos (original, negative, black)
- [ ] Favicon atualizado

### Estrutura
- [ ] Apenas as páginas do sitemap do cliente estão presentes
- [ ] `vite.config.js` sem entradas de páginas removidas
- [ ] Nav e rodapé sem links para páginas removidas
- [ ] Variantes de página selecionadas e implementadas (Home, Central de Resultados…)

### Dados da empresa
- [ ] Tickers atualizados em todos os HTMLs
- [ ] Endereço, e-mail, telefone e copyright no rodapé corretos
- [ ] Links de redes sociais do rodapé preenchidos
- [ ] `<title>` e `<meta description>` de todas as páginas atualizados

### Infraestrutura
- [ ] Repositório GitHub criado e acessível
- [ ] Projeto Vercel criado e deploy automático configurado
- [ ] Analytics instalado e ID correto

### Qualidade
- [ ] `npm run build` passa sem erros
- [ ] Todas as páginas carregam sem 404
- [ ] Responsivo verificado (mobile, tablet, desktop)
- [ ] Modo alto contraste funcional
- [ ] Acessibilidade de fonte (aumentar/reduzir) funcional
- [ ] Nenhum link apontando para "Astri Solutions" ou template

---

## Referência rápida — Arquitetura do Template RI

### SCSS
```
styles/
  abstracts/
    _colors.scss      ← paleta (EDITAR: primary, secondary, tertiary)
    _typography.scss  ← fontes (EDITAR: font-family-base, font-family-display)
    _spacing.scss     ← escala 4px ($spacing-1…$spacing-32, sem $spacing-7)
    _tokens.scss      ← radius, shadows, transitions, z-index
    _breakpoints.scss ← tablet: 580px | desktop: 992px | large: 1541px
    _mixins.scss      ← respond-down(desktop|tablet|large), container
  base/               ← reset, tipografia, root vars, a11y
  components/         ← button, card, form, accordion, data-table, doc-list…
  layouts/            ← header, footer, page, topbar
  pages/              ← estilos específicos de cada página
  main.scss           ← entry point
```

### Breakpoints
- `@include respond-down(desktop)` → abaixo de 992px (tablet + mobile)
- `@include respond-down(tablet)` → abaixo de 580px (mobile)

### Grids padrão
- 4 colunas → desktop
- 2 colunas → `respond-down(desktop)`
- 1 coluna → `respond-down(tablet)`

### Templates de página disponíveis
| Template | Uso |
|----------|-----|
| **Show** | Conteúdo editorial — texto + imagem alternados |
| **List Simples** | Documentos para download com filtro |
| **List Group** | Documentos agrupados em accordion |
| **Tabela** | Dados tabulares com filtros |
| **Calendário** | Grade mensal + próximos eventos |
| **Form** | Formulário de contato/cadastro |
| **Galeria** | Grid de cards com filtro e paginação |
