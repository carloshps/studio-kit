/** @type {import('tailwindcss').Config} */
const studioPreset = {
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      // Escala tipográfica explícita do Studio (semântica, além da default do Tailwind).
      // [tamanho, { lineHeight, letterSpacing, fontWeight }]
      fontSize: {
        display:   ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        h1:        ["clamp(2rem, 4vw, 3rem)",   { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "700" }],
        h2:        ["1.875rem",                 { lineHeight: "1.2",  letterSpacing: "-0.01em", fontWeight: "700" }],
        h3:        ["1.375rem",                 { lineHeight: "1.3",  letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem",                 { lineHeight: "1.7" }],
        body:      ["1rem",                     { lineHeight: "1.7" }],
        caption:   ["0.8125rem",                { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      // Ritmo de espaçamento de seção (fundamento documentado em /fundamentos).
      spacing: {
        section:      "6rem",   // 96px — respiro entre seções
        "section-sm": "4rem",   // 64px — seções compactas
        gutter:       "1.5rem", // 24px — padding lateral padrão
      },
      maxWidth: {
        container: "64rem",     // 1024px — largura de leitura padrão do kit
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
      // Theme-aware: os valores reais vivem em tokens.css (:root dark / .light claro).
      boxShadow: {
        hero:   "var(--shadow-hero)",
        card:   "var(--shadow-card)",
        metric: "var(--shadow-metric)",
        glow:   "var(--shadow-glow)",
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
