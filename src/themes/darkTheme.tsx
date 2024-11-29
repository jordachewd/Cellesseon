import { createTheme } from "@mui/material";
import baseTheme, { dosis } from "./baseTheme";

const darkTheme = createTheme({
  ...baseTheme,
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      light: "#ffffff",
      main: "#26D0CE" /* jwdAqua */,
    },
    secondary: {
      main: "#1A2980" /* jwdMarine */,
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#1A2980",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          lineHeight: 1.4,
          fontSize: ".85rem",
          WebkitFontSmoothing: "auto",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
          lineHeight: 1.4,
          fontWeight: 400,
          color: "white",
          letterSpacing: "0.5px",
          fontFamily: dosis.style.fontFamily,
          "&:hover": {
            backgroundColor: "rgb(168 235 233 / 0.15)",
          },
        },
        outlined: {
          borderColor: "white",
          color: "white",
          "&:hover": {
            borderColor: "rgb(168 235 233 / 0.7)",
          },
        },
        contained: {
          color: "#1DA5A4",
          backgroundColor: "white",
          boxShadow: "0px 1px 4px 0px rgba(13, 20, 74, 0.3)",
          "&:hover": {
            color: "white",
            backgroundColor: "rgb(168 235 233 / 0.5)",
            boxShadow: "0px 1px 4px 0px rgba(13, 20, 74, 0.4)",
          },
        },
        sizeMedium: {
          fontSize: "1.125rem",
        },
        sizeLarge: {
          fontSize: "1.35rem",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: ".5rem .75rem",
          transition: "all 0.5s ease",
          color: "rgb(38 208 206 / 0.85)",
          "&:hover": {
            color: "white",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: ".875rem",
          lineHeight: 1.4,
          "&::placeholder": {
            color: "#1DA5A4",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 34,
          height: 34,
          borderWidth: "2px",
          borderStyle: "solid",
          fontSize: "14px",
          color: "white",
          bgcolor: "#1DA5A4",
          borderColor: "#26D0CE",
        },
        circular: {
          boxShadow: "0px 0px 5px 0px rgba(13, 20, 74, 0.3)",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "#0D144A",
        },
        tooltip: {
          backgroundColor: "#0D144A",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "0.375rem",
          borderColor: "#26D0CE",
          color: "#26D0CE",
        },
        icon: {
          paddingLeft: "0.5rem",
          color: "#26D0CE",
        },
        label: {
          padding: "1rem",
          fontSize: "0.875rem",
        },
      },
    },
  },
});

export default darkTheme;
