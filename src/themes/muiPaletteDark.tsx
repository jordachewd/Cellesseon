import { ThemeOptions } from "@mui/material";

export const muiPaletteDark: ThemeOptions = {
  palette: {
    primary: {
      main: "#6A0DAD", // Deep Plum
    },
    secondary: {
      main: "#008080", // Teal Green
    },
    tertiary: {
      light: "#F3CBB3", // Rose Gold (lighter)
      main: "#E8A87C", // Rose Gold
      dark: "#C17B5B", // Rose Gold (dark)
      contrastText: "#5C3B28", // Rose Gold (darker)
    },
    action: {
      active: "#E8A87C", // Rose Gold
      hover: "#C17B5B", // Slightly darker shade
      disabled: "#6A0DAD", // Deep Plum
      disabledBackground: "#6A0DAD", // Deep Plum
    },
    background: {
      default: "#020519", // Marine Dark Blue
      paper: "#020519", // Marine Dark Blue
    },
    text: {
      primary: "#EAEAEA", // Soft White
      secondary: "#BEBEBE", // Muted light gray for secondary text
    },
    divider: "#3A3A3A", // Muted Gray
  },
};
