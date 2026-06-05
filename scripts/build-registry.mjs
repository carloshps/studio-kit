/**
 * build-registry.mjs
 *
 * Lê os componentes de packages/ui/src, reescreve os imports para paths
 * padrão shadcn (@/components/ui/*, @/lib/utils) e gera os JSONs em registry/.
 *
 * Uso:
 *   node scripts/build-registry.mjs
 *   node scripts/build-registry.mjs --base-url http://localhost:4321   (dev local)
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");
const UI_SRC = join(ROOT, "packages", "ui", "src");
const REGISTRY_OUT = join(ROOT, "registry");

// Base URL do registry — aponta para produção por padrão.
// Em dev, passe --base-url http://localhost:4321
const args = process.argv.slice(2);
const baseUrlArg = args.indexOf("--base-url");
const BASE_URL =
  baseUrlArg !== -1 ? args[baseUrlArg + 1] : "https://kit.carloshps.com.br";

const registryUrl = (name) => `${BASE_URL}/registry/${name}.json`;

// Reescreve imports relativos para paths shadcn padrão.
// Necessário para que `npx shadcn add` saiba reescrever os imports no projeto alvo.
function rewriteImports(code) {
  return code
    .replace(/from ['"]\.\.\/lib\/utils['"]/g, "from '@/lib/utils'")
    .replace(/from ['"]\.\.\/components\/button['"]/g, "from '@/components/ui/button'")
    .replace(/from ['"]\.\.\/components\/badge['"]/g, "from '@/components/ui/badge'")
    .replace(/from ['"]\.\.\/components\/card['"]/g, "from '@/components/ui/card'")
    .replace(/from ['"]\.\.\/components\/input['"]/g, "from '@/components/ui/input'")
    .replace(/from ['"]\.\.\/components\/navbar['"]/g, "from '@/components/ui/navbar'")
    .replace(/from ['"]\.\.\/components\/dialog['"]/g, "from '@/components/ui/dialog'")
    .replace(/from ['"]\.\.\/components\/tabs['"]/g, "from '@/components/ui/tabs'");
}

function readSrc(relPath) {
  return rewriteImports(readFileSync(join(UI_SRC, relPath), "utf-8"));
}

/**
 * Manifesto — fonte da verdade para o registry.
 * Cada entrada define:
 *   type            : tipo shadcn (registry:ui | registry:block | registry:lib)
 *   srcPath         : caminho relativo dentro de packages/ui/src/
 *   installPath     : onde o arquivo será copiado no projeto alvo
 *   dependencies    : pacotes npm que o componente importa diretamente
 *   registryDeps    : outros itens do NOSSO registry de que este depende
 */
const MANIFEST = {
  // ── Utilitário ────────────────────────────────────────────────────
  utils: {
    type: "registry:lib",
    srcPath: "lib/utils.ts",
    installPath: "lib/utils.ts",
    dependencies: ["clsx", "tailwind-merge"],
    registryDeps: [],
  },

  // ── Componentes base ──────────────────────────────────────────────
  button: {
    type: "registry:ui",
    srcPath: "components/button.tsx",
    installPath: "components/ui/button.tsx",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    registryDeps: ["utils"],
  },
  badge: {
    type: "registry:ui",
    srcPath: "components/badge.tsx",
    installPath: "components/ui/badge.tsx",
    dependencies: ["class-variance-authority"],
    registryDeps: ["utils"],
  },
  card: {
    type: "registry:ui",
    srcPath: "components/card.tsx",
    installPath: "components/ui/card.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  input: {
    type: "registry:ui",
    srcPath: "components/input.tsx",
    installPath: "components/ui/input.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  navbar: {
    type: "registry:ui",
    srcPath: "components/navbar.tsx",
    installPath: "components/ui/navbar.tsx",
    dependencies: [],
    registryDeps: ["utils", "button"],
  },
  dialog: {
    type: "registry:ui",
    srcPath: "components/dialog.tsx",
    installPath: "components/ui/dialog.tsx",
    dependencies: ["@radix-ui/react-dialog"],
    registryDeps: ["utils"],
  },
  tabs: {
    type: "registry:ui",
    srcPath: "components/tabs.tsx",
    installPath: "components/ui/tabs.tsx",
    dependencies: ["@radix-ui/react-tabs"],
    registryDeps: ["utils"],
  },

  // ── Blocos ────────────────────────────────────────────────────────
  hero: {
    type: "registry:block",
    srcPath: "blocks/hero.tsx",
    installPath: "components/blocks/hero.tsx",
    dependencies: [],
    registryDeps: ["utils", "button", "badge"],
  },
  "metric-block": {
    type: "registry:block",
    srcPath: "blocks/metric-block.tsx",
    installPath: "components/blocks/metric-block.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  "pricing-card": {
    type: "registry:block",
    srcPath: "blocks/pricing-card.tsx",
    installPath: "components/blocks/pricing-card.tsx",
    dependencies: [],
    registryDeps: ["utils", "button", "badge"],
  },
  faq: {
    type: "registry:block",
    srcPath: "blocks/faq.tsx",
    installPath: "components/blocks/faq.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  "cta-section": {
    type: "registry:block",
    srcPath: "blocks/cta-section.tsx",
    installPath: "components/blocks/cta-section.tsx",
    dependencies: [],
    registryDeps: ["utils", "button"],
  },
  "lead-form": {
    type: "registry:block",
    srcPath: "blocks/lead-form.tsx",
    installPath: "components/blocks/lead-form.tsx",
    dependencies: [],
    registryDeps: ["utils", "button", "input"],
  },
  testimonial: {
    type: "registry:block",
    srcPath: "blocks/testimonial.tsx",
    installPath: "components/blocks/testimonial.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  footer: {
    type: "registry:block",
    srcPath: "blocks/footer.tsx",
    installPath: "components/blocks/footer.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
};

// Itens de arquivo estático — gerados das fontes em packages/
// Não são componentes .tsx, então ficam fora do MANIFEST de componentes.
const STATIC_ITEMS = {
  tokens: {
    type: "registry:file",
    description:
      "Studio Kit design tokens — CSS custom properties (dark/light). Copy to src/styles/tokens.css and import in global.css.",
    srcPath: join(ROOT, "packages", "tokens", "src", "tokens.css"),
    installPath: "styles/tokens.css",
  },
  "tailwind-preset": {
    type: "registry:file",
    description:
      "Studio Kit Tailwind preset — colors, shadows, fonts and background images mapped to CSS tokens.",
    srcPath: join(ROOT, "packages", "tailwind-preset", "src", "index.js"),
    installPath: "studio-preset.js",
  },
};

mkdirSync(REGISTRY_OUT, { recursive: true });

// ── Gerar itens estáticos (tokens + tailwind-preset) ─────────────────────
for (const [name, meta] of Object.entries(STATIC_ITEMS)) {
  const content = readFileSync(meta.srcPath, "utf-8");
  const json = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: meta.type,
    description: meta.description,
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
    files: [
      {
        path: meta.installPath,
        type: meta.type,
        content,
      },
    ],
  };
  writeFileSync(
    join(REGISTRY_OUT, `${name}.json`),
    JSON.stringify(json, null, 2) + "\n"
  );
  console.log(`✓ ${name}.json  (from source)`);
}

// ── Sincronizar preset no template (evita duplicação manual) ─────────────
const PRESET_SRC = join(ROOT, "packages", "tailwind-preset", "src", "index.js");
const PRESET_DEST = join(ROOT, "templates", "astro-base", "studio-preset.js");
copyFileSync(PRESET_SRC, PRESET_DEST);
console.log(`✓ templates/astro-base/studio-preset.js  (synced from source)`);

// ── Gerar componentes do MANIFEST ─────────────────────────────────────────
let count = 0;
for (const [name, meta] of Object.entries(MANIFEST)) {
  const content = readSrc(meta.srcPath);

  // registryDependencies: URLs completas para itens do nosso registry,
  // exceto "utils" que usa o nome curto (shadcn o resolve nativamente).
  const registryDependencies = meta.registryDeps.map((dep) =>
    dep === "utils" ? "utils" : registryUrl(dep)
  );

  const json = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: meta.type,
    registryDependencies,
    dependencies: meta.dependencies,
    devDependencies: [],
    files: [
      {
        path: meta.installPath,
        content,
        type: meta.type,
        target: "",
      },
    ],
  };

  writeFileSync(
    join(REGISTRY_OUT, `${name}.json`),
    JSON.stringify(json, null, 2) + "\n"
  );
  count++;
  console.log(`✓ ${name}.json`);
}

console.log(`\nRegistry gerado: ${count} itens → ${REGISTRY_OUT}`);
console.log(`Base URL: ${BASE_URL}`);
