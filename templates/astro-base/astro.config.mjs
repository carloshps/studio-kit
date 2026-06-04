import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Modos de deploy:
//   static (default) → `astro build` gera /dist estático → Hospedagem Business
//   server           → `astro build` + adapter Node → Docker na VPS
//
// Para trocar pro modo server:
//   1. Descomente o import do adapter abaixo
//   2. Troque output para "server"
//   3. Rode `pnpm add @astrojs/node`

// import node from "@astrojs/node";

export default defineConfig({
  output: "static",           // trocar para "server" ao fazer app SSR
  // adapter: node({ mode: "standalone" }),
  integrations: [react()],
  site: "https://seudominio.com.br", // atualizar por projeto
});
