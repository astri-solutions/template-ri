import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Raiz
        main:    resolve(__dirname, 'index.html'),
        sumario: resolve(__dirname, 'pages/sumario.html'),

        // A Companhia
        visaoGeral:           resolve(__dirname, 'pages/a-companhia/visao-geral.html'),
        nossaHistoria:        resolve(__dirname, 'pages/a-companhia/nossa-historia.html'),
        estrategiasVantagens: resolve(__dirname, 'pages/a-companhia/estrategias-vantagens.html'),
        portfolio:            resolve(__dirname, 'pages/a-companhia/portfolio.html'),

        // Governança
        composicaoAcionaria: resolve(__dirname, 'pages/governanca/composicao-acionaria.html'),
        diretoriaConselho:   resolve(__dirname, 'pages/governanca/diretoria-conselho.html'),
        estatutoPoliticas:   resolve(__dirname, 'pages/governanca/estatuto-politicas.html'),
        codigoConduta:       resolve(__dirname, 'pages/governanca/codigo-conduta.html'),
        atasAssembleias:     resolve(__dirname, 'pages/governanca/atas-assembleias.html'),
        sustentabilidade:    resolve(__dirname, 'pages/governanca/sustentabilidade.html'),

        // Informações Financeiras
        centralResultados:   resolve(__dirname, 'pages/informacoes-financeiras/central-resultados.html'),
        apresentacoes:       resolve(__dirname, 'pages/informacoes-financeiras/apresentacoes.html'),
        endividamento:       resolve(__dirname, 'pages/informacoes-financeiras/endividamento.html'),
        dividendosRecompra:  resolve(__dirname, 'pages/informacoes-financeiras/dividendos-recompra.html'),

        // Investidores
        documentosCvm:     resolve(__dirname, 'pages/investidores/documentos-cvm.html'),
        calendarioEventos: resolve(__dirname, 'pages/investidores/calendario-eventos.html'),
        ratingsCobertura:  resolve(__dirname, 'pages/investidores/ratings-cobertura.html'),
        comoInvestir:      resolve(__dirname, 'pages/investidores/como-investir.html'),

        // Contato
        glossario:        resolve(__dirname, 'pages/contato/glossario.html'),
        faleComRi:        resolve(__dirname, 'pages/contato/fale-com-ri.html'),
        mailing:          resolve(__dirname, 'pages/contato/mailing.html'),
        fatoresRisco:     resolve(__dirname, 'pages/contato/fatores-risco.html'),
        trabalheConosco:  resolve(__dirname, 'pages/contato/trabalhe-conosco.html'),

        // Legado
        centralResultadosV1: resolve(__dirname, 'pages/central-resultados-v1.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
