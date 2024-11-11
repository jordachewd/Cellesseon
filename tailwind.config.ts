import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jwdAqua: "#26D0CE",
        jwdMarine: "#1A2980",
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
