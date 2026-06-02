import './topbar.js';
import './nav.js';
import './reveal.js';

// ─── Dados ───────────────────────────────────────────────────────────────────

const TERMS = [
  // A
  { l: 'A', term: 'Ação',                    def: 'Menor fração do capital social de uma sociedade anônima. Pode ser ordinária (ON) ou preferencial (PN).' },
  { l: 'A', term: 'Ação Ordinária (ON)',      def: 'Ação que confere ao titular o direito de voto nas assembleias gerais da companhia. Na B3, identificada pelo sufixo 3 no ticker.' },
  { l: 'A', term: 'Ação Preferencial (PN)',   def: 'Ação que oferece prioridade no recebimento de dividendos e no reembolso de capital, geralmente sem direito a voto. Sufixo 4 no ticker.' },
  { l: 'A', term: 'AGE',                      def: 'Assembleia Geral Extraordinária. Reunião convocada para deliberar sobre matérias relevantes fora do calendário ordinário.' },
  { l: 'A', term: 'AGO',                      def: 'Assembleia Geral Ordinária. Realizada anualmente para aprovação das demonstrações financeiras, distribuição de dividendos e eleição de conselheiros.' },
  { l: 'A', term: 'Ativo Total',              def: 'Soma de todos os bens e direitos de uma empresa registrados no balanço patrimonial.' },

  // B
  { l: 'B', term: 'B3',                       def: 'Brasil, Bolsa, Balcão. Principal bolsa de valores do Brasil, resultante da fusão entre BM&FBovespa e Cetip em 2017.' },
  { l: 'B', term: 'Balanço Patrimonial',      def: 'Demonstração contábil que apresenta os ativos, passivos e patrimônio líquido de uma empresa em determinada data.' },
  { l: 'B', term: 'Bovespa',                  def: 'Antigo nome da bolsa de valores de São Paulo, hoje integrada à B3.' },
  { l: 'B', term: 'Buy-side',                 def: 'Segmento do mercado financeiro composto por gestores de fundos e investidores institucionais que compram ativos para suas carteiras.' },

  // C
  { l: 'C', term: 'Capital Social',           def: 'Valor total subscrito pelos acionistas para formar ou ampliar a empresa, representado pelas ações emitidas.' },
  { l: 'C', term: 'CEO',                      def: 'Chief Executive Officer. Diretor-presidente, responsável pela gestão executiva da companhia.' },
  { l: 'C', term: 'CFO',                      def: 'Chief Financial Officer. Diretor financeiro, responsável pela gestão das finanças corporativas.' },
  { l: 'C', term: 'CVM',                      def: 'Comissão de Valores Mobiliários. Autarquia federal brasileira que regula e fiscaliza o mercado de capitais.' },

  // D
  { l: 'D', term: 'Debênture',                def: 'Título de dívida corporativa que confere ao debenturista o direito de crédito contra a companhia emissora.' },
  { l: 'D', term: 'Dividendo',                def: 'Parcela do lucro líquido distribuída aos acionistas proporcionalmente à quantidade de ações detidas.' },
  { l: 'D', term: 'DRE',                      def: 'Demonstração do Resultado do Exercício. Evidencia as receitas, custos, despesas e o lucro ou prejuízo de um período.' },

  // E
  { l: 'E', term: 'EBIT',                     def: 'Earnings Before Interest and Taxes. Lucro antes dos juros e impostos; mede o resultado operacional da empresa.' },
  { l: 'E', term: 'EBITDA',                   def: 'Earnings Before Interest, Taxes, Depreciation and Amortization. Geração de caixa operacional antes de juros, impostos, depreciação e amortização.' },
  { l: 'E', term: 'Emissão Primária',         def: 'Oferta de novas ações ao mercado, em que os recursos captados vão diretamente para a companhia.' },
  { l: 'E', term: 'Emissão Secundária',       def: 'Venda de ações existentes por acionistas vendedores; os recursos não entram no caixa da empresa.' },

  // F
  { l: 'F', term: 'Fato Relevante',           def: 'Comunicado obrigatório ao mercado sobre ato ou fato que possa influenciar significativamente o preço dos valores mobiliários.' },
  { l: 'F', term: 'Free Float',               def: 'Parcela das ações de uma companhia disponível para negociação no mercado, excluídos os blocos de controle e tesouraria.' },

  // G
  { l: 'G', term: 'Governança Corporativa',   def: 'Conjunto de práticas e estruturas que regem as relações entre acionistas, conselho, diretoria e demais partes interessadas.' },
  { l: 'G', term: 'Guidance',                 def: 'Projeções ou orientações divulgadas pela empresa sobre seus resultados futuros esperados.' },

  // H
  { l: 'H', term: 'Hedge',                    def: 'Operação financeira realizada para proteger posições contra variações adversas de preços, taxas ou câmbio.' },
  { l: 'H', term: 'Holding',                  def: 'Empresa cujo objetivo principal é deter participações em outras companhias, controlando ou influenciando sua gestão.' },

  // I
  { l: 'I', term: 'IBrX-100',                 def: 'Índice Brasil 100. Carteira teórica com as 100 ações mais negociadas na B3, ponderadas por free float.' },
  { l: 'I', term: 'IFRS',                     def: 'International Financial Reporting Standards. Normas internacionais de contabilidade adotadas no Brasil desde 2010.' },
  { l: 'I', term: 'IPO',                      def: 'Initial Public Offering. Oferta Pública Inicial de ações — primeiro registro de uma empresa na bolsa.' },
  { l: 'I', term: 'Ibovespa',                 def: 'Índice Bovespa. Principal indicador do desempenho do mercado acionário brasileiro, composto pelas ações mais negociadas na B3.' },

  // J
  { l: 'J', term: 'JCP',                      def: 'Juros sobre Capital Próprio. Remuneração paga aos acionistas dedutível do IRPJ, calculada sobre o patrimônio líquido.' },

  // L
  { l: 'L', term: 'Liquidez',                 def: 'Facilidade com que um ativo pode ser comprado ou vendido no mercado sem afetar significativamente seu preço.' },
  { l: 'L', term: 'LPA',                      def: 'Lucro por Ação. Resultado líquido dividido pelo número de ações em circulação.' },
  { l: 'L', term: 'Lock-up',                  def: 'Período após uma oferta pública durante o qual acionistas vendedores não podem vender suas ações.' },

  // M
  { l: 'M', term: 'Market Cap',               def: 'Capitalização de mercado. Valor total de mercado de uma empresa, calculado multiplicando o preço da ação pelo número total de ações.' },
  { l: 'M', term: 'Múltiplo',                 def: 'Indicador de valuation que relaciona o preço da ação a alguma métrica financeira, como lucro (P/L) ou patrimônio (P/VP).' },

  // N
  { l: 'N', term: 'Novo Mercado',             def: 'Segmento de listagem da B3 com os mais altos padrões de governança corporativa, exigindo 100% de tag along e free float mínimo de 25%.' },
  { l: 'N', term: 'NTN-B',                    def: 'Nota do Tesouro Nacional série B. Título público federal indexado ao IPCA, utilizado como referência de taxa de desconto em valuation.' },

  // O
  { l: 'O', term: 'Oferta Pública',           def: 'Distribuição de valores mobiliários ao público, podendo ser primária (novas ações) ou secundária (ações existentes).' },
  { l: 'O', term: 'Opção de Compra',          def: 'Contrato que dá ao titular o direito, mas não a obrigação, de comprar um ativo a um preço prefixado em data determinada.' },
  { l: 'O', term: 'Outlok',                   def: 'Perspectiva (Positivo, Estável ou Negativo) associada a um rating de crédito, indicando a tendência esperada da classificação.' },

  // P
  { l: 'P', term: 'P/L',                      def: 'Preço sobre Lucro. Múltiplo que divide o preço da ação pelo lucro por ação, indicando quantos anos de lucro o mercado paga pela empresa.' },
  { l: 'P', term: 'P/VP',                     def: 'Preço sobre Valor Patrimonial. Compara o preço de mercado com o valor contábil da ação.' },
  { l: 'P', term: 'Preço-Alvo',               def: 'Estimativa de analistas sobre o valor justo de uma ação em determinado horizonte de tempo, usada como referência de recomendação.' },
  { l: 'P', term: 'Proventos',                def: 'Benefícios distribuídos aos acionistas, incluindo dividendos, juros sobre capital próprio, bonificações e direitos de subscrição.' },

  // R
  { l: 'R', term: 'Rating',                   def: 'Nota de crédito atribuída por agências (Fitch, S&P, Moody\'s) que avalia a capacidade de pagamento de dívidas de uma empresa ou governo.' },
  { l: 'R', term: 'ROE',                      def: 'Return on Equity. Retorno sobre o Patrimônio Líquido — mede a eficiência da empresa em gerar lucro com o capital dos acionistas.' },
  { l: 'R', term: 'ROA',                      def: 'Return on Assets. Retorno sobre os Ativos — indica quanto de lucro a empresa gera para cada real de ativo.' },
  { l: 'R', term: 'Recompra de Ações',        def: 'Programa pelo qual a empresa compra suas próprias ações no mercado, reduzindo o número de ações em circulação.' },

  // S
  { l: 'S', term: 'Selic',                    def: 'Sistema Especial de Liquidação e Custódia. Taxa básica de juros da economia brasileira, definida pelo Copom/Banco Central.' },
  { l: 'S', term: 'Split',                    def: 'Desdobramento de ações. Aumento do número de ações com redução proporcional do preço unitário, sem alterar o capital social.' },
  { l: 'S', term: 'Sell-side',                def: 'Segmento de analistas de bancos e corretoras que produzem relatórios e recomendações de compra ou venda de ativos para investidores.' },

  // T
  { l: 'T', term: 'Tag Along',                def: 'Direito do acionista minoritário de vender suas ações pelo mesmo preço pago ao controlador em caso de mudança de controle.' },
  { l: 'T', term: 'Tesouraria',               def: 'Ações da própria empresa mantidas em seu poder após recompra, sem direito a voto ou dividendos.' },
  { l: 'T', term: 'Ticker',                   def: 'Código de negociação de uma ação na bolsa (ex.: ASTR3, ASTR4). Formado por 4 letras referentes à empresa e 1 dígito para o tipo de ação.' },

  // U
  { l: 'U', term: 'Unit',                     def: 'Certificado de depósito representativo de ações ON e PN emitido pela companhia. Negociado com sufixo 11 no ticker.' },
  { l: 'U', term: 'Underwriting',             def: 'Processo de coordenação e distribuição de uma oferta pública de valores mobiliários por banco de investimento ou corretora.' },

  // V
  { l: 'V', term: 'Valuation',                def: 'Processo de estimativa do valor justo de uma empresa ou ativo, usando métodos como fluxo de caixa descontado (DCF) ou múltiplos comparáveis.' },
  { l: 'V', term: 'Volatilidade',             def: 'Medida estatística da variação do preço de um ativo ao longo do tempo. Ativos com maior volatilidade apresentam oscilações mais intensas.' },
  { l: 'V', term: 'VPA',                      def: 'Valor Patrimonial por Ação. Patrimônio líquido dividido pelo número de ações em circulação.' },

  // Y
  { l: 'Y', term: 'Yield',                    def: 'Rendimento de um ativo em relação ao seu preço. No caso de ações, o dividend yield é o dividendo pago dividido pelo preço da ação.' },
];

// ─── Letras ──────────────────────────────────────────────────────────────────

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ACTIVE_LETTERS = new Set(TERMS.map(t => t.l));

// ─── Render ──────────────────────────────────────────────────────────────────

function renderNav() {
  const nav = document.querySelector('[data-gloss-nav]');
  if (!nav) return;

  nav.innerHTML = ALL_LETTERS.map(l => {
    const active = ACTIVE_LETTERS.has(l);
    return `<button
      class="gloss-nav__btn${active ? '' : ' gloss-nav__btn--empty'}"
      data-gloss-letter="${l}"
      ${active ? `onclick="scrollToLetter('${l}')"` : 'disabled'}
      aria-label="Ir para a letra ${l}"
    >${l}</button>`;
  }).join('');
}

function renderContent() {
  const content = document.querySelector('[data-gloss-content]');
  if (!content) return;

  const groups = ALL_LETTERS.filter(l => ACTIVE_LETTERS.has(l)).map(l => {
    const terms = TERMS.filter(t => t.l === l);
    return `
      <div class="gloss-group" id="gloss-${l}" data-gloss-group="${l}">
        <div class="gloss-group__header">
          <span class="gloss-group__letter">${l}</span>
        </div>
        <dl class="gloss-list">
          ${terms.map(t => `
            <div class="gloss-list__item">
              <dt class="gloss-list__term">${t.term}</dt>
              <dd class="gloss-list__def">${t.def}</dd>
            </div>
          `).join('')}
        </dl>
      </div>
    `;
  });

  content.innerHTML = groups.join('');
}

// ─── Scroll to letter ─────────────────────────────────────────────────────────

window.scrollToLetter = function (l) {
  const target = document.getElementById(`gloss-${l}`);
  if (!target) return;

  const navEl    = document.querySelector('[data-gloss-nav]');
  const navH     = navEl ? navEl.offsetHeight : 0;
  const topbarEl = document.querySelector('.topbar');
  const topbarH  = topbarEl ? topbarEl.offsetHeight : 0;
  const header   = document.querySelector('.site-header');
  const headerH  = header && !header.classList.contains('is-hidden') ? 72 : 0;
  const offset   = topbarH + headerH + navH + 16;

  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

// ─── Active letter on scroll ──────────────────────────────────────────────────

function initScrollSpy() {
  const groups  = document.querySelectorAll('[data-gloss-group]');
  const buttons = document.querySelectorAll('[data-gloss-letter]');

  function setActive(l) {
    buttons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.glossLetter === l);
    });
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.dataset.glossGroup);
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  });

  groups.forEach(g => io.observe(g));
}

// ─── Sync top com header sticky ───────────────────────────────────────────────

function syncNavTop() {
  const header = document.querySelector('.site-header');
  const nav    = document.querySelector('[data-gloss-nav]');
  if (!header || !nav) return;

  const topbarEl = document.querySelector('.topbar');
  const topbarH  = topbarEl ? topbarEl.offsetHeight : 0;
  const headerH  = 72;

  function update() {
    const hidden = header.classList.contains('is-hidden');
    nav.style.top = `${topbarH + (hidden ? 0 : headerH)}px`;
  }

  update();
  new MutationObserver(update).observe(header, { attributeFilter: ['class'] });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

renderNav();
renderContent();
initScrollSpy();
syncNavTop();
