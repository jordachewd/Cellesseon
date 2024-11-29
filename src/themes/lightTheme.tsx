import { createTheme } from "@mui/material";
import baseTheme, { dosis } from "./baseTheme";

const lightTheme = createTheme({
  ...baseTheme,
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      light: "#21BAB9",
      main: "#1A2980" /* jwdMarine */,
    },
    secondary: {
      main: "#26D0CE" /* jwdAqua */,
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#141F65",
      secondary: "#5D70AA",
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
          color: "#26D0CE",
          letterSpacing: "0.5px",
          fontFamily: dosis.style.fontFamily,
          "&:hover": {
            color: "#1DA5A4",
            backgroundColor: "rgb(168 235 233 / 0.3)",
          },
        },
        outlined: {
          borderColor: "#26D0CE",
          "&:hover": {
            borderColor: "#1DA5A4",
          },
        },
        contained: {
          color: "white",
          backgroundColor: "#26D0CE",
          boxShadow: "0px 1px 4px 0px rgba(13, 20, 74, 0.3)",
          "&:hover": {
            color: "white",
            backgroundColor: "#21BAB9",
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
            color: "#1A2980",
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
            color: "#5D70AA",
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
          borderColor: "#1A2980",
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

export default lightTheme;
