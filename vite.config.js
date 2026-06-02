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
        main:         resolve(__dirname, 'index.html'),
        homeAtalhos:  resolve(__dirname, 'home-atalhos.html'),
        sumario:      resolve(__dirname, 'sumario.html'),

        // A Companhia
        visaoGeral:           resolve(__dirname, 'visao-geral.html'),
        nossaHistoria:        resolve(__dirname, 'nossa-historia.html'),
        estrategiasVantagens: resolve(__dirname, 'estrategias-vantagens.html'),
        portfolio:            resolve(__dirname, 'portfolio.html'),
        nossoTime:            resolve(__dirname, 'nosso-time.html'),

        // Governança
        composicaoAcionaria: resolve(__dirname, 'composicao-acionaria.html'),
        diretoriaConselho:   resolve(__dirname, 'diretoria-conselho.html'),
        estatutoPoliticas:   resolve(__dirname, 'estatuto-politicas.html'),
        codigoConduta:       resolve(__dirname, 'codigo-conduta.html'),
        atasAssembleias:     resolve(__dirname, 'atas-assembleias.html'),
        sustentabilidade:    resolve(__dirname, 'sustentabilidade.html'),

        // Financeiro
        centralResultados:   resolve(__dirname, 'central-resultados.html'),
        apresentacoes:       resolve(__dirname, 'apresentacoes.html'),
        endividamento:       resolve(__dirname, 'endividamento.html'),
        dividendosRecompra:  resolve(__dirname, 'dividendos-recompra.html'),

        // Investidores
        documentosCvm:     resolve(__dirname, 'documentos-cvm.html'),
        calendarioEventos: resolve(__dirname, 'calendario-eventos.html'),
        ratingsCobertura:  resolve(__dirname, 'ratings-cobertura.html'),
        comoInvestir:      resolve(__dirname, 'como-investir.html'),

        // Contato
        glossario:        resolve(__dirname, 'glossario.html'),
        faleComRi:        resolve(__dirname, 'fale-com-ri.html'),
        mailing:          resolve(__dirname, 'mailing.html'),
        fatoresRisco:     resolve(__dirname, 'fatores-risco.html'),
        trabalheConosco:  resolve(__dirname, 'trabalhe-conosco.html'),

        // Legal
        politicaPrivacidade: resolve(__dirname, 'politica-de-privacidade.html'),
        termosCondicoes:     resolve(__dirname, 'termos-e-condicoes.html'),
        definicaoCookies:    resolve(__dirname, 'definicao-de-cookies.html'),

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
