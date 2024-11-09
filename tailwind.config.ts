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
      animation: {
        "text-reveal": "text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s",
      },
      keyframes: {
        "text-reveal": {
          "0%": {
            transform: "translate(0, 100%)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
