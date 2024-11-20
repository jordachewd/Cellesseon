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
      main: "#1A2980",
    },
    secondary: {
      main: "#26D0CE",
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
        sizeSmall: {
          minWidth: 0,
          fontSize: "12px",
          letterSpacing: "0.5px",
          padding: ".125rem .875rem",
          fontFamily: dosis.style.fontFamily,
        },
        sizeMedium: {
          lineHeight: 1.36,
          padding: ".35rem 1.35rem",
          fontFamily: dosis.style.fontFamily,
        },
        sizeLarge: {
          lineHeight: 1.6,
          padding: ".5rem 5rem",
          fontWeight: 500,
          fontSize: "1.25rem",
          fontFamily: dosis.style.fontFamily,
          letterSpacing: "2px",
        },
        text: {
          backgroundColor: "white",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
          "&:hover": {
            backgroundColor: "#26D0CE",
            color: "white",
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
            // backgroundColor: "transparent",
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
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          //  paddingRight: "4em",
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
  },
});

export default theme;
