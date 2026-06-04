import studioPreset from "@studio/tailwind-preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [studioPreset],
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
