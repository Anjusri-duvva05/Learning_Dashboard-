import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#111118",
        surfaceHover: "#16161f",
        border: "#1e1e2e",
        accent: "#6c63ff",
        accentGlow: "#8b83ff",
        muted: "#3a3a5c",
        textPrimary: "#e2e2f0",
        textSecondary: "#8888aa",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-purple": "radial-gradient(circle at center, rgba(108,99,255,0.15), transparent 70%)",
        "glow-blue": "radial-gradient(circle at center, rgba(59,130,246,0.12), transparent 70%)",
        "glow-green": "radial-gradient(circle at center, rgba(34,197,94,0.10), transparent 70%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(108,99,255,0.3), 0 0 60px rgba(108,99,255,0.1)",
        "glow-sm": "0 0 10px rgba(108,99,255,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(108,99,255,0.15)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
