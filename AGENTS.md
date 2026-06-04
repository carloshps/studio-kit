# Studio Kit — AGENTS.md

Fonte da verdade cross-model (Claude Code, Codex, Cursor, Antigravity).
Qualquer decisão de arquitetura deve ser registrada aqui.

## O que é

Monorepo do design system do CarlosHPS Studio.
- Distribui componentes via registry shadcn em `kit.carloshps.com.br`
- Fornece preset Tailwind com tokens da marca
- Disponibiliza template Astro clonável para sites/apps do Studio e de clientes

## Estrutura

```
packages/
  tokens/          → CSS variables + JSON (fonte da verdade dos tokens)
  tailwind-preset/ → preset Tailwind que lê os tokens
  ui/              → componentes shadcn restilizados na cara do Studio
apps/
  kit-site/        → Astro: showroom dos componentes + serve o registry shadcn
registry/          → JSON files consumidos por `npx shadcn add @studio/...`
templates/
  astro-base/      → template clonável (static → Business / server → VPS)
```

## Stack

- **Framework:** Astro (kit-site + astro-base)
- **Componentes:** shadcn/ui (Tailwind + Radix)
- **Estilo:** Tailwind CSS v3 (3.4.x)
- **Linguagem:** TypeScript
- **Gerenciador:** pnpm workspaces
- **Registry:** shadcn self-hosted em `kit.carloshps.com.br` (VPS, Docker + Caddy)

## Deploy (pipeline atual)

Push na `main` → GitHub Actions (`.github/workflows/deploy.yml`):
1. `node scripts/build-registry.mjs` — regenera `registry/` a partir do MANIFEST
2. `rsync` — sincroniza o código para `/opt/kit-site/source/` na VPS (`72.60.138.174`)
3. `docker compose up -d --build` — rebuilda e reinicia o container

O registry fica disponível em `https://kit.carloshps.com.br` (Caddy + Let's Encrypt, porta 4322 internamente).

**Secrets necessários no repositório GitHub:** `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER`.

## Como adicionar um componente ao registry

1. Escreva o `.tsx` em `packages/ui/src/components/` (base) ou `packages/ui/src/blocks/` (bloco)
2. Adicione a entrada no objeto `MANIFEST` em `scripts/build-registry.mjs`:
   ```js
   "meu-componente": {
     type: "registry:ui",          // ou registry:block
     srcPath: "components/meu-componente.tsx",
     installPath: "components/ui/meu-componente.tsx",
     dependencies: [],             // pacotes npm que o componente importa
     registryDeps: ["utils"],      // outros itens do registry de que depende
   }
   ```
3. `pnpm build:registry` — gera `registry/meu-componente.json`
4. Commit + push — deploy automático em ~2 min

## Decisões arquiteturais

| # | Decisão | Motivo | Revisitar quando |
|---|---------|--------|-----------------|
| 1 | **Tailwind v3** (não v4) | Todo o preset, tokens e sintaxe `rgb(var(--x) / <alpha>)` foram escritos para v3. A v4 muda a sintaxe de configuração, o modelo de plugins e o jeito de registrar tokens. Migrar sem propósito violaria a regra 5 (nada sem propósito). | Quando um recurso específico da v4 for necessário para um projeto ou cliente — por exemplo, `@theme` inline, engine Oxide ou performance de build crítica. Nesse ponto fazer a migração completa: reescrever `tailwind-preset`, `tokens.css` e todos os `tailwind.config.mjs`. |
| 2 | **Docker build context = raiz do monorepo** | `COPY ../../` é inválido no Docker — o daemon não sobe fora do contexto. O `Dockerfile` fica em `apps/kit-site/` mas o build roda a partir da raiz: `docker build -f apps/kit-site/Dockerfile -t kit-site .` | Não há razão para mudar, salvo se o kit-site virar um repositório independente. |
| 3 | **`astro-base` é standalone** | O template não usa `workspace:*` — tem seu próprio `package.json`, `node_modules` e `components.json`. Assim um cliente pode clonar somente essa pasta sem o monorepo inteiro. Instala componentes via `npx shadcn add URL` apontando para o registry em produção. | Se o template crescer a ponto de precisar de um CI próprio, considerar mover para repositório separado. |
| 4 | **Git-push deploy via GitHub Actions** | Deploy manual (tar + scp + docker) era frágil e dependia da máquina local. O CI regenera o registry a partir do MANIFEST (fonte da verdade) antes de sincronizar, garantindo que a VPS nunca fique com JSON desatualizado. | Se a VPS mudar para um provedor com deploy nativo (Railway, Fly.io), o workflow pode ser simplificado. |

## Tokens da marca (imutáveis — só alterar com decisão explícita)

| Token | Valor |
|---|---|
| Fundo principal | `#081424` (navy profundo) |
| Fundo secundário | `#030C17` (navy escuro) |
| Acento / cyan | `#00ADCF` |
| Texto principal | `rgba(232,244,251,0.92)` |
| Texto muted | `rgba(232,244,251,0.45)` |
| Fonte | Manrope (única família — não misturar) |
| Tema principal | dark |

## Regras

1. **Um framework:** Astro. Não introduzir Next.js.
2. **Uma biblioteca de componentes:** shadcn/ui. Não misturar daisyUI/Flowbite/Chakra.
3. **Tokens são CSS variables:** escopo `:root` (dark) e `.light` override. Dark é o padrão.
4. **Componentes são cópias:** shadcn copia o código — nenhum componente é dependência em runtime.
5. **Nada sem propósito:** não adicionar funcionalidade que não existe no requisito atual.
6. **Registry é a fonte:** `npx shadcn add @studio/<name>` é o jeito correto de consumir.
