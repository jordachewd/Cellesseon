import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'], 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jwdAqua: {
          100: "#A8EBE9",
          200: "#81E3E1",
          300: "#5ADBD8",
          400: "#33D4CF",
          500: "#26D0CE", // Base color
          600: "#21BAB9",
          700: "#1DA5A4",
          800: "#198F8E",
          900: "#147978",
        },
        jwdMarine: {
          100: "#B0BAD7",
          200: "#8695C0",
          300: "#5D70AA",
          400: "#344B94",
          500: "#1A2980", // Base color
          600: "#172472",
          700: "#141F65",
          800: "#101957",
          900: "#0D144A",
        },
      },
      screens: {
        "2xl": "1440px",
        "3xl": "1600px",
      },
      maxWidth: {
        edge: "96%",
      },
      maxHeight: {
        edge: "92%",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      backgroundImage: {
        jwdHomeGradient: "linear-gradient(to top, #26D0CE, #1A2980)",
        jwdChatGradient: "linear-gradient(to bottom, #26D0CE, #1A2980)",
      },
    },
  },
  plugins: [tailwindcssAnimated],
};

export default config;
