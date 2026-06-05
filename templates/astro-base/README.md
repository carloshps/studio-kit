# astro-base — Studio Kit Template

Template Astro standalone para projetos de clientes do CarlosHPS Studio.
Inclui design system completo, tokens da marca configuráveis e acesso ao registry de componentes.

## Pré-requisitos

- Node.js 18+
- pnpm (`npm i -g pnpm`)

## Início rápido

```bash
# 1. Clone apenas esta pasta (sparse checkout) ou copie o diretório
# 2. Instale as dependências
pnpm install

# 3. Inicie o dev server
pnpm dev
# → http://localhost:4321
```

## Adaptando a marca do cliente

Edite **apenas** `src/styles/tokens.css`. O arquivo tem um guia comentado em 4 passos:

| Passo | O que trocar | Onde fica |
|-------|-------------|-----------|
| 1 | Fonte (Google Fonts import + `--font-sans`) | topo do arquivo |
| 2 | Cor de acento (`--primary`, `--accent`, `--border`, `--ring`) | `:root` |
| 3 | Paleta de fundo (`--background`, `--background-secondary`) | `:root` |
| 4 | Radius dos cantos (`--radius`) | `:root` |

Nenhum outro arquivo precisa ser tocado para re-branding.

## Instalando componentes do Studio Kit

```bash
# Componentes base
npx shadcn@latest add "https://kit.carloshps.com.br/registry/button.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/card.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/badge.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/input.json"

# Blocos de página
npx shadcn@latest add "https://kit.carloshps.com.br/registry/hero.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/cta-section.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/faq.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/pricing-card.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/lead-form.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/testimonial.json"
npx shadcn@latest add "https://kit.carloshps.com.br/registry/metric-block.json"
```

Lista completa e docs: [kit.carloshps.com.br/docs](https://kit.carloshps.com.br/docs)

## Scripts

| Comando | O que faz |
|---------|-----------|
| `pnpm dev` | Dev server com hot-reload |
| `pnpm build` | Build de produção (SSR via Node) |
| `pnpm start` | Serve o build (`dist/server/entry.mjs`) |
| `pnpm typecheck` | Checa tipos TypeScript |

## Deploy

O template usa `output: "server"` com `@astrojs/node`. O `Dockerfile` e o `Caddyfile` já estão configurados para deploy em VPS.

```bash
pnpm build
node dist/server/entry.mjs
```

Para deploy em Vercel ou Netlify, troque o adapter em `astro.config.mjs`.
