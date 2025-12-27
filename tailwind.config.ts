import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25f4f4",
        "primary-dim": "#1b8a8a",
        "background-light": "#f5f8f8",
        "background-dark": "#102222",
        "surface-dark": "#152a2a",
        "surface-darker": "#0d1818",
        "panel-dark": "#102323",
        "border-color": "#224949",
        "accent-text": "#90cbcb",
        n8n: "#ff6d5a",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Noto Sans", "sans-serif"],
        mono: ["monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #1a2e2e 1px, transparent 1px), linear-gradient(to bottom, #1a2e2e 1px, transparent 1px)",
      },
      boxShadow: {
        neon: "0 0 5px rgba(37, 244, 244, 0.2), 0 0 10px rgba(37, 244, 244, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;

