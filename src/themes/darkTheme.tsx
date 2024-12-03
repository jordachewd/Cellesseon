import { createTheme } from "@mui/material";
import baseTheme, { dosis } from "./baseTheme";

const darkTheme = createTheme({
  ...baseTheme,
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#26D0CE", // Aqua
      dark: "#198F8E", // Aqua Dark (800)
    },
    secondary: {
      main: "#1A2980", // Marine
      dark: "#0D144A", // Marine Dark (900)
    },
    action: {
      active: "#E8A87C", // Rose Gold
      hover: "#F1B99C", // Slightly lighter shade
    },
    background: {
      default: "#020519", // Marine Dark (2000)
      paper: "#0D144A", // Marine Dark (900)
    },
    text: {
      primary: "#EAEAEA", // Soft White for main text
      secondary: "#BEBEBE", // Muted light gray for secondary text
    },
    divider: "#3A3A3A", // Muted Gray for dividers, borders, and lines
    tertiary: {
      light: "#FFC6B3", // Rose Gold (300)
      main: "#E8A87C", // Rose Gold (500)
      dark: "#BC8B63", // Rose Gold (700)
      contrastText: "#5C3B28", // Rose Gold (1200)
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
          backgroundColor: "var(--mui-palette-primary-dark)",
          boxShadow:
            "0px 1px 4px 0px rgba(var(--mui-palette-secondary-darkChannel) / 0.3)",

          "&:hover": {
            color: "var(--mui-palette-common-white)",
            backgroundColor: "var(--mui-palette-primary-main)",
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

export default darkTheme;
