import { createTheme } from "@mui/material";
import baseTheme, { dosis } from "./baseTheme";

const lightTheme = createTheme({
  ...baseTheme,
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#1A2980", // Marine
      dark: "#0D144A", // Marine Dark (900)
    },
    secondary: {
      main: "#26D0CE", // Aqua
      dark: "#1DA5A4", // Aqua Dark (700)
    },
    action: {
      active: "#50C878", // Emerald Green
      hover: "#74D490", // Slightly lighter
    },
    background: {
      default: "#F9F5F1", // Soft Beige
      paper: "#FFFFFF", // White for surfaces like cards, dialogs, etc.
    },
    text: {
      primary: "#0D144A", // Marine Dark (900)
      secondary: "#6D6D6D", // Slightly lighter
      disabled: "#9E9E9E", // A gray tone for disabled text
    },
    divider: "#D1D1D1", // Cool Gray for dividers, borders, and lines
    tertiary: {
      light: "#A9E6BB", // Emerald Green (300)
      main: "#50C878", // Emerald Green (500)
      dark: "#3E995F", // Emerald Green (700)
      contrastText: "#E6F7EB", // Emerald Green (100)
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
          letterSpacing: "0.5px",
          transition: "all 0.35s ease-in-out",
          fontFamily: dosis.style.fontFamily,
          "&:hover": {
            color: "var(--mui-palette-primary-light)",
          },
        },
        outlined: {
          "&:hover": {
            borderColor: "var(--mui-palette-primary-light)",
          },
        },
        contained: {
          color: "var(--mui-palette-common-white)",
          backgroundColor: "var(--mui-palette-secondary-dark)",
          boxShadow:
            "0px 1px 4px 0px rgba(var(--mui-palette-secondary-darkChannel) / 0.3)",
          "&:hover": {
            color: "var(--mui-palette-common-white)",
            backgroundColor: "var(--mui-palette-secondary-main)",
            boxShadow:
              "0px 1px 4px 0px rgba(var(--mui-palette-secondary-darkChannel) / 0.4)",
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
          transition: "all 0.35s ease-in-out",
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
          fontSize: "1rem",
          lineHeight: 1.1,
          // color: "var(--mui-palette-tertiary-dark)",
           color: "var(--mui-palette-action-active)",
          "&::placeholder": {
            fontSize: ".875rem",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
          borderWidth: "2px",
          borderStyle: "solid",
          fontSize: "14px",
          color: "var(--mui-palette-common-white)",
          backgroundColor: "var(--mui-palette-primary-main)",
          borderColor: "var(--mui-palette-primary-main)",
        },
        circular: {
          boxShadow:
            "0px 0px 5px 0px rgba(var(--mui-palette-secondary-darkChannel) / 0.3)",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "var(--mui-palette-secondary-dark)",
        },
        tooltip: {
          backgroundColor: "var(--mui-palette-secondary-dark)",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          color: "var(--mui-palette-tertiary-dark)",
          borderColor: "var(--mui-palette-tertiary-dark)",
        },

        icon: {
          paddingLeft: "0.5rem",
          transition: "all 0.35s ease-in-out",
          color: "var(--mui-palette-tertiary-dark)",
        },

        label: {
          padding: "1rem",
          fontSize: "0.875rem",
          transition: "all 0.35s ease-in-out",
        },

        clickable: {
          "&:hover": {
            color: "var(--mui-palette-tertiary-contrastText)",
            borderColor: "var(--mui-palette-tertiary-main)",
            backgroundColor: "var(--mui-palette-tertiary-main)!important",
            ".MuiChip-icon": {
              color: "var(--mui-palette-tertiary-contrastText)",
            },
          },
        },
      },
    },
  },
});

export default lightTheme;
