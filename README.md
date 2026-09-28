# Escala — protótipo de front-end

Protótipo da plataforma de troca de plantões médicos (DSW2). Feito em React + Vite + Tailwind CSS v4, seguindo o `DESIGN-airbnb.md`.

```bash
npm install
npm run dev
```

## Telas

| Rota | Tela |
|---|---|
| `/` | Feed de plantões: busca, filtros por especialidade, turno e distância |
| `/plantao/:id` | Detalhe do plantão com mapa estático e candidatura |
| `/publicar` | Formulário em 3 etapas: hospital e data → horário e valor → revisão |
| `/meus-plantoes` | Abas Publicados (aceitar candidatos) e Assumidos |

## Organização

- `src/index.css`: tokens de design (cores, raios, sombra) no `@theme` do Tailwind
- `src/data/mock.js`: dados mock
- `src/store.jsx`: estado em memória (candidaturas, publicações, salvos)
- `src/components/`: layout, card de plantão, ícones e componentes base
- `src/pages/`: as quatro telas
