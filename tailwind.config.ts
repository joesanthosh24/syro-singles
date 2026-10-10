import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue sampled from the Syro-Malabar logo
        brand: {
          50: "#eff6fc",
          100: "#dbeaf7",
          200: "#bdd9f0",
          300: "#90c0e5",
          400: "#5c9fd6",
          500: "#3781c5",
          600: "#2566a8",
          700: "#1f5289",
          800: "#1e4671",
          900: "#1d3c5f",
          950: "#13273f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
