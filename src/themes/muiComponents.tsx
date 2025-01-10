import { ThemeOptions } from "@mui/material";
import { dosis } from "./muiBase";
export const muiComponents: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          lineHeight: 1.4,
          fontSize: ".85rem",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
          letterSpacing: "1px",
          fontFamily: dosis.style.fontFamily,
          transition: "all 0.35s ease-in-out",
        },
        text: {
          color: "var(--mui-palette-tertiary-main)",
          "&:hover": {
            color: "var(--mui-palette-tertiary-dark)",
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
          fontSize: "1.5rem",
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
          color: "var(--mui-palette-common-white)",
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
          borderColor: "var(--mui-palette-tertiary-main)",
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
          color: "var(--mui-palette-tertiary-dark)",
        },

        label: {
          padding: "1rem",
          fontSize: "0.875rem",
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

    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: ".875rem",
          padding: ".5rem 1.25rem",
          transition: "all 0.35s ease-in-out",

          "&:hover": {
            color: "var(--mui-palette-common-white)",
            ...theme.applyStyles("dark", {
              color: "var(--mui-palette-background-paper)",
            }),
          },
        }),
      },
    },
  },
};
