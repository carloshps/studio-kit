/** @type {import('tailwindcss').Config} */
const studioPreset = {
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      colors: {
        background:  "rgb(var(--background) / <alpha-value>)",
        foreground:  "rgb(var(--foreground) / <alpha-value>)",
        card:        "rgb(var(--card) / <alpha-value>)",
        border:      "rgb(var(--border) / <alpha-value>)",
        input:       "rgb(var(--input) / <alpha-value>)",
        ring:        "rgb(var(--ring) / <alpha-value>)",
        accent: {
          DEFAULT:   "rgb(var(--accent) / <alpha-value>)",
          foreground:"rgb(var(--accent-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT:   "rgb(var(--primary) / <alpha-value>)",
          foreground:"rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT:   "rgb(var(--secondary) / <alpha-value>)",
          foreground:"rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:   "rgb(var(--muted) / <alpha-value>)",
          foreground:"rgb(var(--muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:   "rgb(var(--destructive) / <alpha-value>)",
          foreground:"rgb(var(--destructive-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        hero:   "0 0 0 1px rgba(0,173,207,0.06), 0 24px 64px rgba(0,5,14,0.55), inset 0 1px 0 rgba(0,173,207,0.08)",
        card:   "0 8px 32px rgba(0,5,14,0.50), 0 0 0 1px rgba(0,173,207,0.06)",
        metric: "0 8px 24px rgba(0,5,14,0.45)",
        glow:   "0 0 16px rgba(0,173,207,0.40)",
      },
      backgroundImage: {
        "gradient-avatar":  "linear-gradient(145deg, rgba(0,173,207,0.18) 0%, rgba(8,20,36,0.80) 100%)",
        "gradient-result":  "linear-gradient(160deg, rgba(0,80,140,0.45) 0%, rgba(0,30,70,0.70) 100%)",
      },
      borderColor: {
        DEFAULT:    "rgb(var(--border) / 0.18)",
        card:       "rgb(var(--border) / 0.25)",
        subtle:     "rgb(var(--border) / 0.10)",
      },
    },
  },
  plugins: [],
};

export default studioPreset;
