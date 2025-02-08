import { ThemeOptions } from "@mui/material";

export const muiPaletteLight: ThemeOptions = {
  palette: {
    primary: {
      main: "#FADADD", // Blush Pink
    },
    secondary: {
      main: "#9A5DFF", // Regal Violet
    },
    tertiary: {
      light: "#A9E6BB", // Emerald Green (lighter)
      main: "#46b86c", // Emerald Green
      dark: "#3E995F", // Emerald Green (darker)
      contrastText: "#ffffff", // White
    },
    action: {
      active: "#50C878", // Emerald Green
      hover: "#3E995F", // Slightly darker shade
      disabled: "#999", // Blush Pink
      //disabledBackground: "#f0c9cd", // Blush Pink
    },
    background: {
      default: "#F9F5F1", // Soft Beige
      paper: "#f5ebe1", // Darker Beige
    },
    text: {
      primary: "#4A4A4A", // Charcoal Gray
      secondary: "#6D6D6D", // Slightly lighter
      disabled: "#3E995F", // A gray tone for disabled text
    },
    divider: "#D1D1D1", // Cool Gray
  },
};
