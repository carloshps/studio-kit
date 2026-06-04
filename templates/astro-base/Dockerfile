# Usado apenas no modo server (SSR). Para site estático, não precisa deste arquivo.
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
ENV HOST=0.0.0.0 PORT=4321
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
