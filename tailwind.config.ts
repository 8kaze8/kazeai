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
        // Organic Cybernetics palette
        organic: {
          green: "#7FB069",
          "green-dark": "#5A8A4A",
          earth: "#D4A574",
          terracotta: "#C97D60",
          beige: "#F5F1E8",
          "off-white": "#FAF9F6",
        },
        cyber: {
          charcoal: "#2C2C2C",
          "muted-blue": "#6B8FA3",
          gray: "#4A4A4A",
        },
      },
      spacing: {
        // Organic spacing (not round numbers)
        "13": "3.25rem",
        "17": "4.25rem",
        "23": "5.75rem",
        "27": "6.75rem",
      },
      rotate: {
        "1": "1deg",
        "-1": "-1deg",
        "2": "2deg",
        "-2": "-2deg",
      },
      animation: {
        "organic-pulse": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;

