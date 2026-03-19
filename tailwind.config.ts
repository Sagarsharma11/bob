import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        secondary: "#059669",
        dark: "#0f172a",
        light: "#f8fafc",
        accent: {
          50: "#fff8f0",
          100: "#ffeee0",
          200: "#ffd4b3",
          300: "#ffbb86",
          400: "#ffa359",
          500: "#ff8c42",
          600: "#e67e38",
          700: "#c66d2e",
          800: "#a65c24",
          900: "#7d461a",
        },
        royal: {
          50: "#f0f3ff",
          100: "#e0e6ff",
          200: "#c1ceff",
          300: "#a1b5ff",
          400: "#819dff",
          500: "#4169E1",
          600: "#3c5cc9",
          700: "#354fb1",
          800: "#2e4299",
          900: "#273581",
        },
      },
    },
  },
  plugins: [],
};

export default config;
