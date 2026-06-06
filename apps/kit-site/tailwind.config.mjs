import { fileURLToPath } from "url";
import { dirname, join } from "path";
import studioPreset from "@studio/tailwind-preset";

// Caminhos absolutos (o CWD do processo não é o diretório do config).
// fast-glob exige "/" como separador mesmo no Windows — normalizamos as barras.
const __dir = dirname(fileURLToPath(import.meta.url));
const glob = (p) => join(__dir, p).replace(/\\/g, "/");

/** @type {import('tailwindcss').Config} */
export default {
  presets: [studioPreset],
  content: [
    glob("src/**/*.{astro,html,js,jsx,ts,tsx}"),
    glob("../../packages/ui/src/**/*.{js,jsx,ts,tsx}"),
  ],
};
