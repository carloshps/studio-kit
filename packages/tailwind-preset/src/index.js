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
        lift:   "var(--shadow-lift)",
      },
      backgroundImage: {
        "gradient-avatar":    "linear-gradient(145deg, rgba(0,173,207,0.18) 0%, rgba(8,20,36,0.80) 100%)",
        "gradient-result":    "linear-gradient(160deg, rgba(0,80,140,0.45) 0%, rgba(0,30,70,0.70) 100%)",
        // Destaque de título: azul-marca → accent (clip em texto). --primary-deep é themeable.
        "gradient-highlight": "linear-gradient(125deg, rgb(var(--primary-deep)) 0%, rgb(var(--accent)) 100%)",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        reveal: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%":      { opacity: "1" },
        },
      },
      animation: {
        marquee:      "marquee 40s linear infinite",
        reveal:       "reveal 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "glow-pulse": "glow-pulse 2.6s ease-in-out infinite",
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
