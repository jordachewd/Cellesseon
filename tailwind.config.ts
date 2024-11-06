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
        jwdOrangeLight: "#f26a3a",
        jwdOrange: "#f05722",
        jwdDarkBlue: "#1b1e50",
        jwdDarkerBlue: "#03062e",
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
        jwdGrayGradient:
          "linear-gradient(290deg, rgba(148,163,184,1) 0%, rgba(203,213,225,1) 40%, rgba(226,232,240,1) 100%)",

        jwdOrangeGradient:
          "linear-gradient(290deg, rgba(240,87,34,1) 0%, rgba(255,100,45,1) 40%, rgba(255,222,0,1) 100%)",
        jwdBlueGradient: "linear-gradient(0deg, rgba(27,30,80,1) 0%, rgba(2,4,36,1) 80%)",
      },
    },
  },
  plugins: [],
};
export default config;
