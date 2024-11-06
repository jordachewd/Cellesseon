"use client";
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
  variable: "--font-jwd-notosans",
  display: "swap",
});

declare module "@mui/material/styles" {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
  }
}

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#f05722",
    },
  },
  typography: {
    fontFamily: albertsans.style.fontFamily,
    h1: {
      fontFamily: dosis.style.fontFamily,
      fontSize: "5rem",
    },
    h2: {
      fontFamily: dosis.style.fontFamily,
      fontSize: "4rem",
      fontWeight: 500,
    },
    h3: {
      fontFamily: dosis.style.fontFamily,
    },
    h4: {
      fontFamily: dosis.style.fontFamily,
    },
    h5: {
      fontFamily: dosis.style.fontFamily,
    },
    h6: {
      fontFamily: dosis.style.fontFamily,
    },
    subtitle1: {
      fontFamily: albertsans.style.fontFamily,
      fontSize: ".75rem",
      fontWeight: 300,
      lineHeight: 1,
      color: "#94a3b8"
    },
    subtitle2: {
      fontFamily: albertsans.style.fontFamily,
      fontSize: "1.125rem",
      fontWeight: 300,
    },
    body1: {
      fontFamily: albertsans.style.fontFamily,
      fontSize: ".825rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          minWidth: 0,
          lineHeight: 1,
          fontSize: "12px",
          padding: ".34rem .44rem",
          textTransform: "capitalize",
        },
        sizeMedium: {
          lineHeight: 1.36,
          padding: ".35rem 1.35rem",
        },
        sizeLarge: {
          lineHeight: 1.6,
          padding: ".725rem 4rem",
        },
        text: {
          backgroundColor: "white",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          "&:hover": {
            backgroundColor: "#f8fafc",
          },
        },
        contained: {
          boxShadow: "0 1px 4px 0 rgb(0 0 0 / 0.25)",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "0 1px 8px 0 rgb(0 0 0 / 0.1)",
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          padding: "10px 16px",
          transition: "all .5s ease-out",
          "&:hover": {
            backgroundColor: "#f8fafc",
            color: "#f05722",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          lineHeight: 1,
          fontSize: "12px",
          textTransform: "capitalize",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.15)",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: ".825rem",
          justifyContent: "flex-start",
          textTransform: "capitalize",
          textAlign: "left",
          minHeight: 0,
        },
      },
    },
  },
});

export default theme;
