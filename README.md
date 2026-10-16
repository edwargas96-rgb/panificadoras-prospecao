# Casa Andina — site + painel (Next.js)

Recriação do site da Casa Andina Panificadora e Confeitaria em **Next.js (App Router) + React + Tailwind**, com efeitos do **React Bits** e um **painel administrativo de demonstração**.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## O que tem

- **Site público (`/`)**: abertura, vitrine em loop, cardápio com 137 itens (busca, categorias, pedido por WhatsApp), encomendas, almoço/feijoada, contato.
- **Painel (`/admin`)**: login de demonstração, visão geral, **produtos** (cadastrar, editar, ativar/desativar, excluir, foto) e **financeiro** (receita, despesas, contas a pagar, canais, exportar CSV).
- Os produtos cadastrados no painel **aparecem no cardápio e na vitrine do site**.

> O painel é só para apresentação: o login é fictício, os números do financeiro são **dados de exemplo** e os produtos ficam salvos **no navegador** (localStorage). Para virar produto de verdade, trocar `src/lib/store.tsx` e `src/lib/finance.ts` por um banco de dados e autenticação reais.

## React Bits

Componentes oficiais copiados (versão TS + Tailwind) para `src/components/reactbits/`: `SplitText`, `ShinyText`, `CountUp`, `BlurText`, `ScrollVelocity`, `SpotlightCard`, `Magnet`, `GlareHover`, `ClickSpark`, `AnimatedContent`.
Fonte: https://github.com/DavidHDev/react-bits (licença MIT + Commons Clause: uso permitido como parte de site/produto). Dependências: `gsap`, `@gsap/react`, `motion`.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Cardápio inicial | `src/lib/menu.ts` |
| Telefone, links, horários | `src/lib/config.ts` |
| Dados fictícios do financeiro | `src/lib/finance.ts` |
