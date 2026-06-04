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
- **Estilo:** Tailwind CSS v4
- **Linguagem:** TypeScript
- **Gerenciador:** pnpm workspaces
- **Registry:** shadcn self-hosted em `kit.carloshps.com.br` (VPS, Docker + Caddy)

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
