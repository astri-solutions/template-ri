# Regras do projeto

## Após cada pedido
Sempre ao finalizar qualquer alteração:
1. Fazer commit com mensagem descritiva na branch `claude/vigilant-carson-DcJFZ`
2. Mesclar na `main` e fazer push (`git merge` + `git push origin main`) para forçar o deploy no Vercel
3. Retornar para a branch `claude/vigilant-carson-DcJFZ`

Nunca concluir uma tarefa sem commitar, mesclar no main e fazer push.

## Responsividade
Todo elemento deve ser responsivo. Usar sempre os breakpoints do projeto:
- `respond-down(desktop)` → abaixo de 992px (tablet + mobile)
- `respond-down(tablet)` → abaixo de 580px (mobile)

Referência de grids:
- 4 colunas → desktop
- 2 colunas → tablet (`respond-down(desktop)`)
- 1 coluna → mobile (`respond-down(tablet)`)

---

## Templates de páginas

Ao criar uma nova página, usar o template correspondente ao tipo solicitado.
Todos os templates usam os componentes e variáveis padrão do projeto (`.field`, `.btn`, `.select`, `.data-table`, `.accordion`, `.doc-list`, `.page-filter`).
Toda página começa com `page-header` (breadcrumb + título + lede) e usa `page-section` / `page-section__container` para o conteúdo.

---

### List Simples
Página de listagem de documentos para download.

Estrutura:
- `page-header` padrão
- `page-section` com `page-filter` (filtro de ano, tipo)
- Lista usando `.doc-list` / `.doc-list__item` com badge PDF/XLSX, nome, data, tamanho e botão de download
- Dados embutidos no JS da página
- Responsivo por padrão (`.doc-list` já é flexível)

---

### List Group
Página de documentos agrupados por categoria, usando accordion.

Estrutura:
- `page-header` padrão
- `page-section` com `page-filter` (filtro de ano)
- Accordion (`.accordion[data-accordion]`) — um item por grupo/categoria
- Dentro de cada `accordion__body`: uma `.doc-list`
- Inicializar via `initAccordion()` importado de `accordion.js`
- Primeiro item aberto por padrão via `data-accordion-open="0"`
- Dados e renderização dinâmica via JS (igual a `documentos-cvm.js`)

---

### Calendario
Página de calendário de eventos.

Estrutura:
- `page-header` padrão
- `page-section` com `.page-filter` (filtro de ano + trimestre)
- Grade mensal (`.cal-month`) com células de dias e indicadores de evento
- Lista lateral de próximos eventos (`.cal-upcoming`) com botões de exportar para Gmail/Outlook
- Seção de eventos passados (`.events-past`) com filtro de ano
- JS dedicado; dados como array de objetos `{ date, title, category, time }`
- Usar ícones `/assets/Icones/icon-gmail.png` e `/assets/Icones/icon-outlook.png`

---

### Form
Página com texto informativo + formulário de contato/cadastro.

Estrutura:
- `page-header` padrão
- `page-section` com `.contact-grid` (5fr/7fr → 1 coluna no tablet)
- Coluna esquerda: `.contact-info` com `__eyebrow`, `__title`, `__body`, `__items` (ícones SVG + texto)
- Coluna direita: `.contact-form-card` com campos usando `.field` / `.field__input` / `.field__textarea` / `.select` / `.check-group`
- Botão de submit: `.btn.btn--secondary.btn--lg`
- Feedback de sucesso: `.contact-success[data-form-success]` com `.is-visible`
- Handler de submit no `page.js` (preventDefault + show success + reset)

---

### Tabela
Página com tabela de dados.

Estrutura:
- `page-header` padrão
- `page-section` com `page-filter` (filtros relevantes)
- `.data-table > .data-table__scroller > table` com `thead` e `tbody`
- Renderização dinâmica via JS (dados como array de objetos)
- Células numéricas com classe `.mono`
- Badges de status com classes semânticas (ex: `.div-status--active`)
- Responsivo via `overflow-x: auto` no `.data-table__scroller`

---

### Show
Página de conteúdo editorial: texto + imagem.

Estrutura:
- `page-header` padrão
- `page-section` com grid 2 colunas (texto 3fr / imagem 2fr) → 1 coluna no tablet
- Coluna de texto: eyebrow, título h2, parágrafos, lista de destaques, CTA opcional
- Coluna de imagem: `<img>` com `border-radius: $radius-xl`, `object-fit: cover`, `aspect-ratio: 4/3`
- Seções adicionais de texto puro ou cards de estatísticas abaixo se necessário

---

### Galeria
Página de galeria com grid de cards, filtro e paginação.

Estrutura:
- `page-header` padrão
- `page-section` com `.page-filter` (select de ano + select de tipo)
- Grid de cards: `.gallery-grid` — `repeat(3, 1fr)` desktop / `repeat(2, 1fr)` tablet / `1fr` mobile
- Cada card: `.gallery-card` com imagem (`aspect-ratio: 16/9`, `object-fit: cover`), badge de tipo, título, data, link
- Paginação: `.pagination` com botões anterior/próximo e numeração
- JS dedicado: filtragem client-side dos dados, renderização dinâmica, paginação (ex: 9 itens por página)
- Dados como array de objetos `{ year, type, title, date, image, url }`
