import { ThemeOptions } from "@mui/material";

export const muiPaletteLight: ThemeOptions = {
  palette: {
    primary: {
      main: "#1A2980", // Marine
      dark: "#0D144A", // Marine Dark (900)
    },
    secondary: {
      main: "#26D0CE", // Aqua
      dark: "#1DA5A4", // Aqua Dark (700)
    },
    tertiary: {
      light: "#A9E6BB", // Emerald Green (300)
      main: "#50C878", // Emerald Green (500)
      dark: "#3E995F", // Emerald Green (700)
      contrastText: "#E6F7EB", // Emerald Green (100)
    },
    action: {
      active: "#50C878", // Emerald Green
      hover: "#74D490", // Slightly lighter
      disabled: "#5D70AA", // Marine (300)
    },
    background: {
      default: "#F9F5F1", // Soft Beige
      paper: "#F9F5F1", // Soft Beige
    },
    text: {
      primary: "#0D144A", // Marine Dark (900)
      secondary: "#6D6D6D", // Slightly lighter
      disabled: "#3E995F", // A gray tone for disabled text
    },
    divider: "#D1D1D1", // Cool Gray for dividers, borders, and lines
  },
};
