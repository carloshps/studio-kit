import type { APIRoute } from "astro";
import { readdirSync } from "fs";
import { join } from "path";

const REGISTRY_DIR = process.env.REGISTRY_DIR ?? join(process.cwd(), "..", "..", "registry");

export const GET: APIRoute = () => {
  const files = readdirSync(REGISTRY_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));

  return new Response(JSON.stringify({ components: files }), {
    headers: { "Content-Type": "application/json" },
  });
};
