# Regras do projeto

## Após cada pedido
Sempre ao finalizar qualquer alteração:
1. Fazer commit com mensagem descritiva
2. Push para `main` (força deploy no Vercel)

Nunca concluir uma tarefa sem commitar e fazer push.

## Responsividade
Todo elemento deve ser responsivo. Usar sempre os breakpoints do projeto:
- `respond-down(desktop)` → abaixo de 992px (tablet + mobile)
- `respond-down(tablet)` → abaixo de 580px (mobile)

Referência de grids:
- 4 colunas → desktop
- 2 colunas → tablet (`respond-down(desktop)`)
- 1 coluna → mobile (`respond-down(tablet)`)
