import { ThemeOptions } from "@mui/material";

export const muiPaletteDark: ThemeOptions = {
  palette: {
    primary: {
      main: "#26D0CE", // Aqua
      dark: "#198F8E", // Aqua Dark (800)
    },
    secondary: {
      main: "#1A2980", // Marine
      dark: "#0D144A", // Marine Dark (900)
    },
    tertiary: {
      light: "#FFC6B3", // Rose Gold (300)
      main: "#E8A87C", // Rose Gold (500)
      dark: "#BC8B63", // Rose Gold (700)
      contrastText: "#5C3B28", // Rose Gold (1200)
    },
    action: {
      active: "#E8A87C", // Rose Gold
      hover: "#F1B99C", // Slightly lighter shade
      disabled: "#5D70AA", // Marine (300)
    },
    background: {
      default: "#020519", // Marine Dark (1000)
      paper: "#020519", // Marine Dark (1000)
    },
    text: {
      primary: "#EAEAEA", // Soft White for main text
      secondary: "#BEBEBE", // Muted light gray for secondary text
    },
    divider: "#3A3A3A", // Muted Gray for dividers, borders, and lines
  },
};
