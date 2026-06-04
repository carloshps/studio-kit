# Build context: raiz do monorepo
# docker build -f apps/kit-site/Dockerfile -t kit-site .
#
# Em produção (VPS), o Caddy serve na porta 443 e faz proxy para 4321.

# ── Estágio 1: builder ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

# Manifesto e lockfile primeiro — camada cacheada enquanto dependências não mudam
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/tokens/package.json        ./packages/tokens/package.json
COPY packages/tailwind-preset/package.json ./packages/tailwind-preset/package.json
COPY packages/ui/package.json            ./packages/ui/package.json
COPY apps/kit-site/package.json          ./apps/kit-site/package.json

RUN pnpm install --frozen-lockfile

# Código-fonte
COPY packages/tokens        ./packages/tokens
COPY packages/tailwind-preset ./packages/tailwind-preset
COPY packages/ui            ./packages/ui
COPY apps/kit-site          ./apps/kit-site
COPY registry               ./registry
COPY scripts                ./scripts

# Build dos packages na ordem correta, depois o site
RUN pnpm --filter @studio/tokens build
RUN pnpm --filter @studio/tailwind-preset build
RUN pnpm --filter @studio/ui build
RUN pnpm --filter kit-site build

# Deploy isolado com todas as prod deps resolvidas (flat node_modules, sem workspace refs)
RUN pnpm deploy --filter kit-site --prod /deploy

# ── Estágio 2: runner ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Deploy isolado: node_modules + package.json + dist já prontos
COPY --from=builder /deploy/node_modules ./node_modules
COPY --from=builder /deploy/package.json ./package.json
COPY --from=builder /app/apps/kit-site/dist ./dist
COPY --from=builder /app/registry           ./registry

ENV HOST=0.0.0.0
ENV PORT=4321
ENV REGISTRY_DIR=/app/registry
EXPOSE 4321

CMD ["node", "dist/server/entry.mjs"]
