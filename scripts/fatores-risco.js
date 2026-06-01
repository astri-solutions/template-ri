import './topbar.js';
import './nav.js';
import './reveal.js';
import { initAccordion } from './accordion.js';

// ─── Dados ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'macroeconomico',
    label: 'Riscos Macroeconômicos e do Setor',
    count: 4,
    risks: [
      {
        title: 'Instabilidade econômica e política no Brasil',
        body: `O ambiente macroeconômico brasileiro historicamente apresenta volatilidade relevante, com períodos de baixo crescimento do PIB, pressões inflacionárias e incertezas políticas que podem afetar adversamente a demanda por nossos produtos e serviços. Crises fiscais, mudanças na política econômica ou deterioração das contas públicas podem reduzir a confiança dos agentes econômicos e restringir o acesso a crédito e capital.`,
      },
      {
        title: 'Variação das taxas de juros e da inflação',
        body: `Elevações na taxa Selic encarecem o custo de captação da Companhia e podem pressionar as margens operacionais. A inflação persistente impacta os custos de insumos, folha de pagamento e contratos de fornecimento, podendo não ser integralmente repassada aos clientes, o que comprimiria a rentabilidade. Cenários de juros elevados também diminuem o apetite de investidores por ativos de risco, podendo afetar o preço das ações.`,
      },
      {
        title: 'Desvalorização do Real e exposição cambial',
        body: `A Companhia possui contratos e fornecedores com componente em moeda estrangeira. Depreciações significativas do Real frente ao Dólar ou ao Euro podem elevar custos operacionais e de tecnologia, afetando negativamente os resultados. Embora a Companhia adote instrumentos de hedge para mitigar parte dessa exposição, não há garantia de que tais instrumentos serão suficientes em cenários de alta volatilidade cambial.`,
      },
      {
        title: 'Concentração geográfica no mercado brasileiro',
        body: `A quase totalidade da receita da Companhia é gerada no Brasil. Recessões econômicas domésticas, crises setoriais ou eventos sistêmicos que afetem o país de forma desproporcional em relação a outras economias podem impactar significativamente os resultados, sem que a diversificação geográfica atue como amortecedor.`,
      },
    ],
  },
  {
    id: 'operacional',
    label: 'Riscos Operacionais',
    count: 5,
    risks: [
      {
        title: 'Dependência de pessoas-chave e retenção de talentos',
        body: `O sucesso da Companhia depende em grande medida da experiência e competência de sua liderança executiva e de profissionais técnicos especializados. A saída de pessoas-chave sem sucessores preparados ou a incapacidade de atrair e reter talentos em um mercado competitivo pode prejudicar a execução da estratégia, a qualidade dos serviços prestados e o relacionamento com clientes.`,
      },
      {
        title: 'Falhas em sistemas tecnológicos e cibersegurança',
        body: `A Companhia depende de infraestrutura tecnológica robusta para a prestação de seus serviços. Interrupções, falhas sistêmicas, ataques cibernéticos ou violações de segurança de dados podem causar danos reputacionais, perdas financeiras, sanções regulatórias (incluindo nos termos da Lei Geral de Proteção de Dados — LGPD) e rescisão de contratos. Não há garantia de que os mecanismos de proteção adotados serão suficientes diante de ameaças em constante evolução.`,
      },
      {
        title: 'Gestão e integração de aquisições',
        body: `A estratégia de crescimento da Companhia inclui aquisições de empresas e ativos. Falhas no processo de due diligence, dificuldades de integração cultural e operacional, sobreposição de sistemas ou perda de clientes e talentos das empresas adquiridas podem resultar em destruição de valor, impacto negativo nos resultados e desvio de foco da gestão.`,
      },
      {
        title: 'Concentração de clientes',
        body: `Uma parcela relevante da receita da Companhia provém de um número limitado de grandes clientes. A perda de um ou mais desses clientes, a renegociação de contratos em condições desfavoráveis ou a inadimplência de contrapartes relevantes pode impactar materialmente a receita, o fluxo de caixa e os resultados financeiros.`,
      },
      {
        title: 'Interrupções na cadeia de fornecimento',
        body: `A Companhia depende de fornecedores estratégicos de tecnologia, licenças de software e serviços especializados. Interrupções no fornecimento decorrentes de crises geopolíticas, desastres naturais, falências de parceiros ou disputas contratuais podem comprometer a continuidade operacional e elevar custos de substituição de forma imediata.`,
      },
    ],
  },
  {
    id: 'mercado',
    label: 'Riscos de Mercado e Competitivos',
    count: 4,
    risks: [
      {
        title: 'Acirramento da concorrência',
        body: `O setor em que a Companhia atua é altamente competitivo e sujeito à entrada de novos players, incluindo empresas estrangeiras com maior escala e acesso a capital, startups disruptivas e grandes grupos econômicos diversificando suas operações. O aumento da concorrência pode pressionar preços, elevar os custos de aquisição de clientes e reduzir margens, afetando a capacidade de manutenção ou ampliação da participação de mercado.`,
      },
      {
        title: 'Disrupção tecnológica e obsolescência',
        body: `Mudanças rápidas na tecnologia — incluindo a adoção massiva de inteligência artificial, computação em nuvem e automação — podem tornar obsoletos produtos, serviços ou plataformas oferecidos pela Companhia. A incapacidade de acompanhar ou antecipar essas transformações, com investimentos adequados em pesquisa, desenvolvimento e inovação, pode resultar em perda de clientes e deterioração da posição competitiva.`,
      },
      {
        title: 'Sensibilidade ao ciclo econômico dos clientes',
        body: `A demanda pelos serviços da Companhia tende a variar conforme o ciclo econômico de seus clientes corporativos. Em períodos de contração econômica, empresas clientes frequentemente reduzem investimentos em serviços externos, o que pode ocasionar cancelamentos de contrato, redução de escopo e dificuldades de renovação, impactando negativamente a receita recorrente.`,
      },
      {
        title: 'Precificação e pressão sobre margens',
        body: `A necessidade de competir por contratos pode levar a Companhia a ofertar preços menores do que o desejável, comprimindo as margens brutas. Adicionalmente, reajustes contratuais abaixo da inflação ou a impossibilidade de repasse de custos crescentes aos clientes podem deteriorar a rentabilidade ao longo do tempo.`,
      },
    ],
  },
  {
    id: 'regulatorio',
    label: 'Riscos Regulatórios e Legais',
    count: 4,
    risks: [
      {
        title: 'Mudanças regulatórias e tributárias',
        body: `A Companhia opera em um ambiente regulatório sujeito a constantes mudanças, incluindo alterações na legislação tributária, trabalhista, previdenciária e setorial. Reformas fiscais que aumentem a carga tributária efetiva, ou alterações nas regras de aproveitamento de benefícios fiscais e regimes especiais, podem afetar negativamente a lucratividade e o planejamento financeiro da Companhia.`,
      },
      {
        title: 'Conformidade com a LGPD e regulações de dados',
        body: `A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) impõe obrigações relevantes sobre o tratamento de dados pessoais. O descumprimento das normas da ANPD pode resultar em multas de até 2% do faturamento (limitadas a R$ 50 milhões por infração), além de danos reputacionais. A Companhia investe em programas de conformidade, mas não há garantia de plena adequação em todos os cenários de operação.`,
      },
      {
        title: 'Litígios e contingências judiciais',
        body: `A Companhia é parte em processos judiciais e administrativos de natureza trabalhista, cível, tributária e regulatória, inerentes ao curso normal de seus negócios. Decisões desfavoráveis em litígios relevantes, ou a constituição de provisões significativas para contingências, podem impactar os resultados financeiros e o fluxo de caixa da Companhia. As estimativas de perda são revisadas periodicamente, mas envolvem incertezas inerentes ao processo judicial.`,
      },
      {
        title: 'Anticorrupção e conformidade ética',
        body: `As leis anticorrupção brasileiras (Lei nº 12.846/2013) e normas internacionais aplicáveis (como o U.S. Foreign Corrupt Practices Act) impõem responsabilidade objetiva a empresas por atos de seus agentes. O descumprimento pode resultar em multas, restrições contratuais com o setor público e danos reputacionais severos. A Companhia mantém programa de compliance e código de conduta, mas não pode garantir que todos os colaboradores e parceiros aderirão integralmente às políticas estabelecidas.`,
      },
    ],
  },
  {
    id: 'financeiro',
    label: 'Riscos Financeiros',
    count: 4,
    risks: [
      {
        title: 'Endividamento e acesso a capital',
        body: `A Companhia recorre a financiamentos de terceiros para viabilizar sua estratégia de crescimento e expansão. Elevações nas taxas de juros, rebaixamentos de rating de crédito, deterioração das condições de mercado ou descumprimento de covenants financeiros podem restringir o acesso a novas linhas de crédito ou elevar o custo da dívida, afetando a capacidade de execução do plano de negócios.`,
      },
      {
        title: 'Gerenciamento de liquidez e capital de giro',
        body: `A insuficiência de caixa e equivalentes para honrar compromissos de curto prazo — incluindo fornecedores, folha de pagamento e serviço da dívida — representa risco operacional relevante. Ciclos de capital de giro mais longos do que o previsto, atrasos em recebimentos de grandes clientes ou eventos imprevistos de caixa podem exigir captações emergenciais em condições desfavoráveis.`,
      },
      {
        title: 'Risco de crédito de contrapartes',
        body: `A Companhia mantém recebíveis com diversas contrapartes corporativas. A inadimplência de clientes relevantes, especialmente em cenários de deterioração econômica generalizada, pode resultar em perdas por crédito de liquidação duvidosa superiores às provisões constituídas, impactando negativamente o resultado e o balanço patrimonial.`,
      },
      {
        title: 'Distribuição de dividendos e geração de caixa',
        body: `A política de dividendos da Companhia está condicionada à geração de lucro líquido e à disponibilidade de caixa após o atendimento das necessidades operacionais e de investimento. Resultados abaixo do esperado, necessidade de retenção de capital para crescimento ou restrições contratuais em acordos de dívida podem limitar ou impedir a distribuição de proventos aos acionistas.`,
      },
    ],
  },
  {
    id: 'esg',
    label: 'Riscos Socioambientais e de Governança',
    count: 3,
    risks: [
      {
        title: 'Riscos climáticos e de sustentabilidade',
        body: `Eventos climáticos extremos, pressões regulatórias relacionadas à transição para uma economia de baixo carbono e mudanças nas expectativas de stakeholders quanto a práticas ESG podem afetar os negócios da Companhia. A incapacidade de adaptar a estratégia a padrões crescentes de divulgação e desempenho em sustentabilidade pode prejudicar o relacionamento com investidores institucionais, clientes e parceiros comprometidos com agendas ESG.`,
      },
      {
        title: 'Conflito de interesses com o acionista controlador',
        body: `O acionista controlador detém poder para determinar o resultado das deliberações que exigem aprovação em assembleia geral, incluindo eleição de conselheiros, aprovação de transações com partes relacionadas e distribuição de dividendos. Decisões que favoreçam o controlador em detrimento dos acionistas minoritários podem afetar adversamente o valor das ações. A Companhia adota os mecanismos de governança previstos na legislação e em seu Estatuto Social para mitigar conflitos de interesse.`,
      },
      {
        title: 'Danos reputacionais e imagem da marca',
        body: `A reputação da Companhia é um ativo estratégico relevante para a manutenção e conquista de clientes, atração de talentos e relacionamento com investidores. Eventos como falhas operacionais públicas, vazamento de dados, denúncias de conduta inadequada ou cobertura negativa na mídia podem causar danos reputacionais duradouros, com efeitos difíceis de quantificar e reverter no curto prazo.`,
      },
    ],
  },
];

// ─── Render ──────────────────────────────────────────────────────────────────

let _uid = 0;
function uid() { return `acc-fr-${++_uid}`; }

function risksHtml(risks) {
  return risks.map(r => `
    <article class="risk-item">
      <h3 class="risk-item__title">${r.title}</h3>
      <p class="risk-item__body">${r.body}</p>
    </article>
  `).join('');
}

function render() {
  const container = document.querySelector('[data-fr-list]');
  if (!container) return;

  container.innerHTML = `<div data-accordion>
    ${CATEGORIES.map((cat, i) => {
      const contentId = uid();
      return `<div class="accordion__item" data-accordion-item>
        <button class="accordion__trigger" data-accordion-trigger aria-expanded="false" aria-controls="${contentId}">
          <span class="accordion__label">${cat.label}</span>
          <span class="accordion__meta">${cat.risks.length} fator${cat.risks.length !== 1 ? 'es' : ''}</span>
        </button>
        <div class="accordion__content" id="${contentId}" role="region">
          <div class="accordion__body">
            ${risksHtml(cat.risks)}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;

  const accEl = container.querySelector('[data-accordion]');
  if (accEl) {
    accEl.dataset.accordionOpen = '0';
    initAccordion(accEl);
  }
}

render();
