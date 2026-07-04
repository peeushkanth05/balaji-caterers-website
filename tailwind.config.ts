import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#f5a623",
          deep: "#e08a00",
          light: "#fff8ee",
        },
        saffron: {
          DEFAULT: "#ff6b2b",
          dark: "#e55a1b",
        },
        brand: {
          dark: "#1a1a1a",
          muted: "#666666",
          offwhite: "#fffdf8",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-nunito)", "Nunito", "sans-serif"],
      },
      boxShadow: {
        gold: "0 8px 40px rgba(245, 166, 35, 0.18)",
        card: "0 15px 45px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
