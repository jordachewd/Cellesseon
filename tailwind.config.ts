import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";
import plugin from "tailwindcss/plugin";

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
        lightPrimary: {
          100: "#FFECEF",
          200: "#FDD6DA",
          300: "#FBC1C6",
          400: "#F9ACB2",
          500: "#FADADD", // Blush Pink
          600: "#E6C5C9",
          700: "#D2B0B4",
          800: "#BE9BA0",
          900: "#AA868C",
        },

        lightSecondary: {
          100: "#F3E9FF",
          200: "#E3D0FF",
          300: "#D3B6FF",
          400: "#C39DFF",
          500: "#D4BFFF", // Levender
          600: "#B39CDB",
          700: "#9281B7",
          800: "#726793",
          900: "#524D6F",
        },

        lightAccent: {
          100: "#E6F7EB",
          200: "#C8EED3",
          300: "#A9E6BB",
          400: "#8BDEA3",
          500: "#50C878", // Emerald Green
          600: "#47B06C",
          700: "#3E995F",
          800: "#357153",
          900: "#2C5946",
        },

        lightBackground: {
          100: "#FFFCFB",
          200: "#FDF7F5",
          300: "#FBF3EF",
          400: "#F9EEEA",
          500: "#F9F5F1", // Soft Beige
          600: "#D4D0CD",
          700: "#B0ACA9",
          800: "#8C8886",
          900: "#686462",
        },

        lightText: {
          100: "#D4D4D4",
          200: "#AAAAAA",
          300: "#808080",
          400: "#565656",
          500: "#4A4A4A", // Charcoal Gray
          600: "#414141",
          700: "#383838",
          800: "#2F2F2F",
          900: "#262626",
        },

        lightBorders: {
          100: "#F5F5F5",
          200: "#EBEBEB",
          300: "#E1E1E1",
          400: "#D7D7D7",
          500: "#D1D1D1", // Cool Gray
          600: "#B9B9B9",
          700: "#A1A1A1",
          800: "#898989",
          900: "#717171",
        },

        darkPrimary: {
          100: "#F0E5F8",
          200: "#D9BFF0",
          300: "#C399E8",
          400: "#AC74E0",
          500: "#6A0DAD", // Deep Plum
          600: "#5F0C9B",
          700: "#540B88",
          800: "#490A76",
          900: "#3F0963",
        },

        darkSecondary: {
          100: "#D4F5F5",
          200: "#A9EBEB",
          300: "#7FE0E0",
          400: "#54D6D6",
          500: "#008080", // Teal Green
          600: "#007373",
          700: "#006666",
          800: "#005959",
          900: "#004C4C",
        },

        darkAccent: {
          100: "#FFF1EB",
          200: "#FFDCCF",
          300: "#FFC6B3",
          400: "#FFB197",
          500: "#E8A87C", // Rose Gold
          600: "#D29A70",
          700: "#BC8B63",
          800: "#A67D57",
          900: "#906E4A",
        },

        darkBackground: {
          100: "#595959",
          200: "#454545",
          300: "#313131",
          400: "#2A2A2A",
          500: "#1E1E1E", // Dark Charcoal
          600: "#1B1B1B",
          700: "#161616",
          800: "#121212",
          900: "#0D0D0D",
        },

        darkText: {
          100: "#FFFFFF",
          200: "#FAFAFA",
          300: "#F4F4F4",
          400: "#EFEFEF",
          500: "#EAEAEA", // Soft White
          600: "#D1D1D1",
          700: "#B9B9B9",
          800: "#A1A1A1",
          900: "#898989",
        },

        darkBorders: {
          100: "#CACACA",
          200: "#B4B4B4",
          300: "#9E9E9E",
          400: "#888888",
          500: "#3A3A3A", // Muted Gray
          600: "#323232",
          700: "#2B2B2B",
          800: "#232323",
          900: "#1C1C1C",
        },

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
          1000: "#020519",
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
  /*   plugins: [
    tailwindcssAnimated,

    // Custom plugin for global CSS variables

    plugin(function ({
      addBase,
      theme,
    }: {
      addBase: Function;
      theme: Function;
    }) {
      const lightThemeVariables = Object.entries(theme("colors") || {}).reduce(
        (acc: Record<string, string>, [colorName, colorShades]) => {
          if (typeof colorShades === "object" && colorShades !== null) {
            Object.entries(colorShades).forEach(([shade, value]) => {
              acc[`--${colorName}-${shade}`] = value as string;
            });
          }
          return acc;
        },
        {}
      );

      const darkThemeVariables = Object.entries(theme("colors") || {}).reduce(
        (acc: Record<string, string>, [colorName, colorShades]) => {
          if (typeof colorShades === "object" && colorShades !== null) {
            Object.entries(colorShades).forEach(([shade, value]) => {
              acc[`--dark-${colorName}-${shade}`] = value as string;
            });
          }
          return acc;
        },
        {}
      );

      addBase({
        ":root": lightThemeVariables,
        ".dark-theme": darkThemeVariables,
      });
    }),
  ], */
};

export default config;
