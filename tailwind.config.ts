import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#111827",
          gold: "#c69a38",
          amber: "#f59e0b",
          ivory: "#f8f7f3",
          dark: "#111827",
          muted: "#64748b",
          offwhite: "#f8f7f3",
        },
        gold: {
          DEFAULT: "#c69a38",
          deep: "#a37a24",
          light: "#faf6ed",
        },
        saffron: {
          DEFAULT: "#f59e0b",
          dark: "#d97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "sans-serif"],
        serif: ["var(--font-roboto)", "Roboto", "sans-serif"],
        mono: ["var(--font-roboto)", "Roboto", "monospace"],
      },
      boxShadow: {
        gold: "0 8px 40px rgba(245, 166, 35, 0.18)",
        card: "0 15px 45px rgba(0, 0, 0, 0.04)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0%, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
