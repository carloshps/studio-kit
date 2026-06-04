FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY ../../package.json ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
COPY . ./apps/kit-site
RUN pnpm install --frozen-lockfile
RUN pnpm --filter kit-site build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/kit-site/dist ./dist
COPY --from=builder /app/registry ./registry
ENV HOST=0.0.0.0 PORT=4321
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
