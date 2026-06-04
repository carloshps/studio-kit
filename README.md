# Studio Kit

Design system do CarlosHPS Studio. Distribui componentes via registry shadcn em produção.

## Consumir componentes

Em qualquer projeto Astro/Next com shadcn configurado:

```bash
# Tokens e preset (uma vez por projeto)
npx shadcn@latest add https://kit.carloshps.com.br/registry/tokens
npx shadcn@latest add https://kit.carloshps.com.br/registry/tailwind-preset

# Componentes base
npx shadcn@latest add https://kit.carloshps.com.br/registry/button
npx shadcn@latest add https://kit.carloshps.com.br/registry/card
npx shadcn@latest add https://kit.carloshps.com.br/registry/badge
npx shadcn@latest add https://kit.carloshps.com.br/registry/input

# Blocos prontos (puxam dependências automaticamente)
npx shadcn@latest add https://kit.carloshps.com.br/registry/hero
npx shadcn@latest add https://kit.carloshps.com.br/registry/lead-form
npx shadcn@latest add https://kit.carloshps.com.br/registry/pricing-card
npx shadcn@latest add https://kit.carloshps.com.br/registry/cta-section
npx shadcn@latest add https://kit.carloshps.com.br/registry/metric-block
npx shadcn@latest add https://kit.carloshps.com.br/registry/testimonial
npx shadcn@latest add https://kit.carloshps.com.br/registry/faq
```

Lista completa: `https://kit.carloshps.com.br/registry.json`

## Novo projeto a partir do template

```bash
cp -r templates/astro-base meu-projeto
cd meu-projeto
pnpm install
```

Consulte `templates/astro-base/components.json` para configuração do shadcn.

## Desenvolver localmente

```bash
pnpm install
pnpm dev                    # kit-site em http://localhost:4321
pnpm build:registry         # regenera registry/ a partir do MANIFEST
pnpm build:registry:dev     # idem, com base URL apontando para localhost
```

## Adicionar um componente

1. Escreva o `.tsx` em `packages/ui/src/components/` (ou `blocks/`)
2. Adicione a entrada no `MANIFEST` em `scripts/build-registry.mjs`
3. Rode `pnpm build:registry` — o JSON é gerado em `registry/`
4. Commit + push na `main` → deploy automático na VPS em ~2 min

## Deploy

Push na `main` dispara `.github/workflows/deploy.yml`:
- regenera o registry
- sincroniza via rsync para `/opt/kit-site/source/` na VPS
- executa `docker compose up -d --build`

**Secrets necessários no repositório:**

| Secret | Valor |
|---|---|
| `VPS_SSH_KEY` | chave privada ed25519 com acesso SSH à VPS |
| `VPS_HOST` | IP ou hostname da VPS |
| `VPS_USER` | usuário SSH (ex: `root`) |
