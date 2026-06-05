import studioPreset from "./studio-preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [studioPreset],
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
};
