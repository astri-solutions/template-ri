// Gerador da planilha Excel — execute com: node scripts/generate-excel.cjs
const XLSX = require('xlsx');
const path = require('path');

// ---- Dados de Dividendos e JCP
const dividendos = [
  // Ano | Periodo | Tipo      | ValorPorAcao | DataBase   | DataPagamento | TotalDistribuido
  { Ano: 2022, Periodo: '1T22', Tipo: 'JCP',       ValorPorAcao: 0.25, DataBase: '2022-05-13', DataPagamento: '2022-05-31', TotalDistribuido: 48.8 },
  { Ano: 2022, Periodo: '2T22', Tipo: 'Dividendo',  ValorPorAcao: 0.35, DataBase: '2022-08-12', DataPagamento: '2022-08-31', TotalDistribuido: 68.3 },
  { Ano: 2022, Periodo: '3T22', Tipo: 'JCP',        ValorPorAcao: 0.30, DataBase: '2022-11-11', DataPagamento: '2022-11-30', TotalDistribuido: 58.5 },
  { Ano: 2022, Periodo: '4T22', Tipo: 'Dividendo',  ValorPorAcao: 0.44, DataBase: '2023-02-10', DataPagamento: '2023-02-28', TotalDistribuido: 85.8 },
  { Ano: 2023, Periodo: '1T23', Tipo: 'JCP',        ValorPorAcao: 0.28, DataBase: '2023-05-12', DataPagamento: '2023-05-31', TotalDistribuido: 54.6 },
  { Ano: 2023, Periodo: '2T23', Tipo: 'Dividendo',  ValorPorAcao: 0.38, DataBase: '2023-08-11', DataPagamento: '2023-08-31', TotalDistribuido: 74.1 },
  { Ano: 2023, Periodo: '3T23', Tipo: 'JCP',        ValorPorAcao: 0.33, DataBase: '2023-11-10', DataPagamento: '2023-11-30', TotalDistribuido: 64.4 },
  { Ano: 2023, Periodo: '4T23', Tipo: 'Dividendo',  ValorPorAcao: 0.47, DataBase: '2024-02-14', DataPagamento: '2024-02-29', TotalDistribuido: 91.7 },
  { Ano: 2024, Periodo: '1T24', Tipo: 'JCP',        ValorPorAcao: 0.31, DataBase: '2024-05-10', DataPagamento: '2024-05-31', TotalDistribuido: 60.5 },
  { Ano: 2024, Periodo: '2T24', Tipo: 'Dividendo',  ValorPorAcao: 0.43, DataBase: '2024-08-09', DataPagamento: '2024-08-30', TotalDistribuido: 83.9 },
  { Ano: 2024, Periodo: '3T24', Tipo: 'JCP',        ValorPorAcao: 0.36, DataBase: '2024-11-08', DataPagamento: '2024-11-29', TotalDistribuido: 70.3 },
  { Ano: 2024, Periodo: '4T24', Tipo: 'Dividendo',  ValorPorAcao: 0.52, DataBase: '2025-02-14', DataPagamento: '2025-02-28', TotalDistribuido: 101.5 },
  { Ano: 2025, Periodo: '1T25', Tipo: 'JCP',        ValorPorAcao: 0.35, DataBase: '2025-05-09', DataPagamento: '2025-05-30', TotalDistribuido: 68.3 },
  { Ano: 2025, Periodo: '2T25', Tipo: 'Dividendo',  ValorPorAcao: 0.41, DataBase: '2025-08-08', DataPagamento: '2025-08-29', TotalDistribuido: 80.0 },
  { Ano: 2025, Periodo: '3T25', Tipo: 'JCP',        ValorPorAcao: 0.38, DataBase: '2025-11-07', DataPagamento: '2025-11-28', TotalDistribuido: 74.2 },
  { Ano: 2025, Periodo: '4T25', Tipo: 'Dividendo',  ValorPorAcao: 0.55, DataBase: '2026-02-13', DataPagamento: '2026-02-27', TotalDistribuido: 107.4 },
  { Ano: 2026, Periodo: '1T26', Tipo: 'JCP',        ValorPorAcao: 0.42, DataBase: '2026-05-15', DataPagamento: '2026-05-30', TotalDistribuido: 82.1 },
];

// ---- Dados de Recompra de Ações
const recompra = [
  { Programa: '1º Programa 2026', Inicio: '2026-01-15', Termino: '2026-12-31', QtdAutorizada: 5000000, QtdRecomprada: 1250000, TotalGasto: 32.8, PrecoMedio: 26.24, Status: 'Em andamento' },
  { Programa: '2º Programa 2025', Inicio: '2025-07-01', Termino: '2025-12-31', QtdAutorizada: 3000000, QtdRecomprada: 2987000, TotalGasto: 75.1, PrecoMedio: 25.14, Status: 'Encerrado' },
  { Programa: '1º Programa 2025', Inicio: '2025-01-10', Termino: '2025-06-30', QtdAutorizada: 4000000, QtdRecomprada: 4000000, TotalGasto: 98.8, PrecoMedio: 24.70, Status: 'Encerrado' },
  { Programa: '2º Programa 2024', Inicio: '2024-07-05', Termino: '2024-12-31', QtdAutorizada: 3500000, QtdRecomprada: 3500000, TotalGasto: 82.3, PrecoMedio: 23.51, Status: 'Encerrado' },
  { Programa: '1º Programa 2024', Inicio: '2024-01-12', Termino: '2024-06-30', QtdAutorizada: 3000000, QtdRecomprada: 3000000, TotalGasto: 67.8, PrecoMedio: 22.60, Status: 'Encerrado' },
  { Programa: '2º Programa 2023', Inicio: '2023-07-10', Termino: '2023-12-31', QtdAutorizada: 2500000, QtdRecomprada: 2500000, TotalGasto: 55.0, PrecoMedio: 22.00, Status: 'Encerrado' },
  { Programa: '1º Programa 2023', Inicio: '2023-01-09', Termino: '2023-06-30', QtdAutorizada: 2000000, QtdRecomprada: 2000000, TotalGasto: 42.0, PrecoMedio: 21.00, Status: 'Encerrado' },
];

// ---- Cria a planilha
const wb = XLSX.utils.book_new();

const wsDividendos = XLSX.utils.json_to_sheet(dividendos);
const wsRecompra   = XLSX.utils.json_to_sheet(recompra);

// Larguras de coluna
wsDividendos['!cols'] = [
  { wch: 6 }, { wch: 8 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 14 }, { wch: 20 },
];
wsRecompra['!cols'] = [
  { wch: 22 }, { wch: 12 }, { wch: 12 }, { wch: 16 }, { wch: 16 }, { wch: 14 }, { wch: 12 }, { wch: 14 },
];

XLSX.utils.book_append_sheet(wb, wsDividendos, 'Dividendos');
XLSX.utils.book_append_sheet(wb, wsRecompra,   'Recompra');

const outPath = path.join(__dirname, '../public/documentos/dividendos-recompra.xlsx');
XLSX.writeFile(wb, outPath);

console.log('✓ Planilha gerada:', outPath);
