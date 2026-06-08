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
    .replace(/from ['"]\.\/button['"]/g, "from '@/components/ui/button'")
    .replace(/from ['"]\.\.\/components\/badge['"]/g, "from '@/components/ui/badge'")
    .replace(/from ['"]\.\.\/components\/card['"]/g, "from '@/components/ui/card'")
    .replace(/from ['"]\.\.\/components\/avatar['"]/g, "from '@/components/ui/avatar'")
    .replace(/from ['"]\.\.\/components\/table['"]/g, "from '@/components/ui/table'")
    .replace(/from ['"]\.\.\/components\/accordion['"]/g, "from '@/components/ui/accordion'")
    .replace(/from ['"]\.\.\/components\/input['"]/g, "from '@/components/ui/input'")
    .replace(/from ['"]\.\.\/components\/label['"]/g, "from '@/components/ui/label'")
    .replace(/from ['"]\.\.\/components\/textarea['"]/g, "from '@/components/ui/textarea'")
    .replace(/from ['"]\.\.\/components\/checkbox['"]/g, "from '@/components/ui/checkbox'")
    .replace(/from ['"]\.\.\/components\/radio['"]/g, "from '@/components/ui/radio'")
    .replace(/from ['"]\.\.\/components\/select['"]/g, "from '@/components/ui/select'")
    .replace(/from ['"]\.\.\/components\/navbar['"]/g, "from '@/components/ui/navbar'")
    .replace(/from ['"]\.\.\/components\/dialog['"]/g, "from '@/components/ui/dialog'")
    .replace(/from ['"]\.\.\/components\/tabs['"]/g, "from '@/components/ui/tabs'")
    .replace(/from ['"]\.\/toast['"]/g, "from '@/components/ui/toast'")
    .replace(/from ['"]\.\/alert['"]/g, "from '@/components/ui/alert'")
    .replace(/from ['"]\.\/skeleton['"]/g, "from '@/components/ui/skeleton'")
    .replace(/from ['"]\.\/tooltip['"]/g, "from '@/components/ui/tooltip'")
    .replace(/from ['"]\.\.\/components\/breadcrumb['"]/g, "from '@/components/ui/breadcrumb'")
    .replace(/from ['"]\.\.\/components\/pagination['"]/g, "from '@/components/ui/pagination'")
    .replace(/from ['"]\.\.\/components\/dropdown['"]/g, "from '@/components/ui/dropdown'")
    .replace(/from ['"]\.\.\/components\/drawer['"]/g, "from '@/components/ui/drawer'");
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
  avatar: {
    type: "registry:ui",
    srcPath: "components/avatar.tsx",
    installPath: "components/ui/avatar.tsx",
    dependencies: ["@radix-ui/react-avatar"],
    registryDeps: ["utils"],
  },
  table: {
    type: "registry:ui",
    srcPath: "components/table.tsx",
    installPath: "components/ui/table.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  accordion: {
    type: "registry:ui",
    srcPath: "components/accordion.tsx",
    installPath: "components/ui/accordion.tsx",
    dependencies: ["@radix-ui/react-accordion"],
    registryDeps: ["utils"],
  },
  input: {
    type: "registry:ui",
    srcPath: "components/input.tsx",
    installPath: "components/ui/input.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  label: {
    type: "registry:ui",
    srcPath: "components/label.tsx",
    installPath: "components/ui/label.tsx",
    dependencies: ["@radix-ui/react-label"],
    registryDeps: ["utils"],
  },
  textarea: {
    type: "registry:ui",
    srcPath: "components/textarea.tsx",
    installPath: "components/ui/textarea.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  checkbox: {
    type: "registry:ui",
    srcPath: "components/checkbox.tsx",
    installPath: "components/ui/checkbox.tsx",
    dependencies: ["@radix-ui/react-checkbox"],
    registryDeps: ["utils"],
  },
  radio: {
    type: "registry:ui",
    srcPath: "components/radio.tsx",
    installPath: "components/ui/radio.tsx",
    dependencies: ["@radix-ui/react-radio-group"],
    registryDeps: ["utils"],
  },
  select: {
    type: "registry:ui",
    srcPath: "components/select.tsx",
    installPath: "components/ui/select.tsx",
    dependencies: ["@radix-ui/react-select"],
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
  breadcrumb: {
    type: "registry:ui",
    srcPath: "components/breadcrumb.tsx",
    installPath: "components/ui/breadcrumb.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  pagination: {
    type: "registry:ui",
    srcPath: "components/pagination.tsx",
    installPath: "components/ui/pagination.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  dropdown: {
    type: "registry:ui",
    srcPath: "components/dropdown.tsx",
    installPath: "components/ui/dropdown.tsx",
    dependencies: ["@radix-ui/react-dropdown-menu"],
    registryDeps: ["utils"],
  },
  drawer: {
    type: "registry:ui",
    srcPath: "components/drawer.tsx",
    installPath: "components/ui/drawer.tsx",
    dependencies: ["@radix-ui/react-dialog"],
    registryDeps: ["utils"],
  },
  carousel: {
    type: "registry:ui",
    srcPath: "components/carousel.tsx",
    installPath: "components/ui/carousel.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  calendar: {
    type: "registry:ui",
    srcPath: "components/calendar.tsx",
    installPath: "components/ui/calendar.tsx",
    dependencies: ["react-day-picker@8.10.1", "lucide-react"],
    registryDeps: ["utils", "button"],
  },
  separator: {
    type: "registry:ui",
    srcPath: "components/separator.tsx",
    installPath: "components/ui/separator.tsx",
    dependencies: ["@radix-ui/react-separator"],
    registryDeps: ["utils"],
  },
  progress: {
    type: "registry:ui",
    srcPath: "components/progress.tsx",
    installPath: "components/ui/progress.tsx",
    dependencies: ["@radix-ui/react-progress"],
    registryDeps: ["utils"],
  },
  switch: {
    type: "registry:ui",
    srcPath: "components/switch.tsx",
    installPath: "components/ui/switch.tsx",
    dependencies: ["@radix-ui/react-switch"],
    registryDeps: ["utils"],
  },
  spinner: {
    type: "registry:ui",
    srcPath: "components/spinner.tsx",
    installPath: "components/ui/spinner.tsx",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDeps: ["utils"],
  },
  sonner: {
    type: "registry:ui",
    srcPath: "components/sonner.tsx",
    installPath: "components/ui/sonner.tsx",
    dependencies: ["sonner"],
    registryDeps: [],
  },
  sidebar: {
    type: "registry:ui",
    srcPath: "components/sidebar.tsx",
    installPath: "components/ui/sidebar.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  alert: {
    type: "registry:ui",
    srcPath: "components/alert.tsx",
    installPath: "components/ui/alert.tsx",
    dependencies: ["class-variance-authority"],
    registryDeps: ["utils"],
  },
  skeleton: {
    type: "registry:ui",
    srcPath: "components/skeleton.tsx",
    installPath: "components/ui/skeleton.tsx",
    dependencies: [],
    registryDeps: ["utils"],
  },
  tooltip: {
    type: "registry:ui",
    srcPath: "components/tooltip.tsx",
    installPath: "components/ui/tooltip.tsx",
    dependencies: ["@radix-ui/react-tooltip"],
    registryDeps: ["utils"],
  },
  toast: {
    type: "registry:ui",
    srcPath: "components/toast.tsx",
    installPath: "components/ui/toast.tsx",
    dependencies: ["@radix-ui/react-toast", "class-variance-authority"],
    registryDeps: ["utils"],
  },
  "use-toast": {
    type: "registry:lib",
    srcPath: "components/use-toast.ts",
    installPath: "hooks/use-toast.ts",
    dependencies: [],
    registryDeps: ["toast"],
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
  modal: {
    type: "registry:block",
    srcPath: "blocks/modal.tsx",
    installPath: "components/blocks/modal.tsx",
    dependencies: ["@radix-ui/react-dialog"],
    registryDeps: ["utils", "button", "dialog"],
  },
  login: {
    type: "registry:block",
    srcPath: "blocks/login.tsx",
    installPath: "components/blocks/login.tsx",
    dependencies: [],
    registryDeps: ["utils", "button", "input", "label"],
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
