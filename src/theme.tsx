"use client";
import { outlinedInputClasses } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Dosis, Albert_Sans } from "next/font/google";

const dosis = Dosis({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-jwd-dosis",
  display: "swap",
});

const albertsans = Albert_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jwd-albertsans",
  display: "swap",
});

const theme = createTheme({
  cssVariables: true,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#5D70AA",
      main: "#1A2980",
      dark: "#0D144A",
    },
    secondary: {
      light: "#5ADBD8",
      main: "#26D0CE",
      dark: "#1DA5A4",
    },
  },
  typography: {
    fontFamily: albertsans.style.fontFamily,
    h1: {
      fontFamily: dosis.style.fontFamily,
      fontSize: "5rem",
      fontWeight: 400,
    },
    h2: {
      fontFamily: dosis.style.fontFamily,
      fontSize: "4rem",
    },
    h3: {
      fontFamily: dosis.style.fontFamily,
      fontWeight: 400,
    },
    h4: {
      fontFamily: dosis.style.fontFamily,
    },
    h5: {
      fontFamily: dosis.style.fontFamily,
      fontSize: "1.25rem",
      lineHeight: 1,
      margin: ".3rem 0 .5rem",
    },
    h6: {
      fontFamily: dosis.style.fontFamily,
      fontSize: "1rem",
      lineHeight: 1.5,
      margin: ".4rem 0 .5rem",
    },
    subtitle1: {
      fontFamily: albertsans.style.fontFamily,
      fontSize: ".8rem",
      fontWeight: 300,
    },
    subtitle2: {
      fontFamily: albertsans.style.fontFamily,
      fontSize: "1rem",
      fontWeight: 300,
    },
    body1: {
      fontFamily: albertsans.style.fontFamily,
      fontSize: ".85rem",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 0,
          minWidth: 0,
          fontFamily: dosis.style.fontFamily,
          color: "#26D0CE",
          letterSpacing: "1px",
          transition: "all 500ms ease",
          "&:hover": {
            color: "white",
          },
        },
        sizeSmall: {
          fontSize: "12px",
          padding: ".35rem .75rem",
          lineHeight: 1,
        },
        sizeMedium: {
          fontSize: "16px",
          padding: ".6rem 1rem",
          lineHeight: 1.2,
        },
        sizeLarge: {
          fontSize: "24px",
          lineHeight: 1.4,
          padding: ".5rem 1.5rem",
        },

        contained: {
          color: "white",
          backgroundColor: "#147978",
          "&:hover": {
            backgroundColor: "#26D0CE",
          },
        },

        outlined: {
          borderColor: "#1DA5A4",
          borderRadius: "0.375rem",
          color: "#26D0CE",
          "&:hover": {
            borderColor: "white",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: ".5rem .75rem",
          fontSize: "0.75rem",
          backgroundColor: "transparent",
          transition: "all 0.25s ease",
          color: "rgb(38 208 206 / 0.85)",
          "&:hover": {
            color: "white",
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "rgb(38 208 206 / 0.5)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "transparent",
          "--TextField-brandBorderHoverColor": "transparent",
          "--TextField-brandBorderFocusedColor": "rgb(38 208 206 / 0.75)",
          "--TextField-brandBackgroundColor": "rgb(38 208 206 / 0.15)",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
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

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          backgroundColor: "var(--TextField-brandBackgroundColor)",
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 30,
          height: 30,
          bgcolor: "#1DA5A4",
          color: "white",
          border: "2px solid #5ADBD8",
          fontSize: "14px",
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
          borderColor: "#5ADBD8",
          color: "#5ADBD8",
        },

        icon: {
          color: "#5ADBD8",
          paddingLeft: "0.5rem",
        },
        label: {
          padding: "1rem",
          fontSize: "0.875rem",
        },
      },
    },
  },
});

export default theme;
