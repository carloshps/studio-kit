import type { APIRoute } from "astro";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const REGISTRY_DIR = join(process.cwd(), "..", "..", "registry");

export const GET: APIRoute = ({ params }) => {
  const name = params.name;
  const file = join(REGISTRY_DIR, `${name}.json`);

  if (!existsSync(file)) {
    return new Response(JSON.stringify({ error: "Component not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const content = readFileSync(file, "utf-8");
  return new Response(content, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
