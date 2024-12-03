import { ThemeOptions } from "@mui/material";
import { Dosis, Albert_Sans } from "next/font/google";

export const dosis = Dosis({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-jwd-dosis",
  display: "swap",
});

export const albertsans = Albert_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jwd-albertsans",
  display: "swap",
});

const baseTheme: ThemeOptions = {
  
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  typography: {
    fontFamily: albertsans.style.fontFamily,
    
    h1: {
      fontSize: "4rem",
      fontFamily: dosis.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "4.5rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "5rem",
      },
    },

    h2: {
      fontSize: "3rem",
      fontFamily: dosis.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "3.5rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "4rem",
      },
    },

    h3: {
      fontSize: "2.5rem",
      fontFamily: dosis.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "2.75rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "3rem",
      },
    },

    h4: {
      fontSize: "2rem",
      fontFamily: dosis.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "2.25rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "2.5rem",
      },
    },

    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      fontFamily: dosis.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "1.75rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "2rem",
      },
    },

    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      fontFamily: dosis.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "1.5rem",
      },
    },

    subtitle1: {
      fontSize: "2rem",
      lineHeight: 1.4,
      fontFamily: albertsans.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "3rem",
      },
    },

    subtitle2: {
      fontSize: "1.5rem",
      lineHeight: 1.4,
      fontFamily: albertsans.style.fontFamily,
      "@media (min-width:768px)": {
        fontSize: "1.75rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "2rem",
      },
    },

    body1: {
      fontSize: "1.25rem",
      fontFamily: albertsans.style.fontFamily,
    },

    body2: {
      fontSize: ".85rem",
      fontFamily: albertsans.style.fontFamily,
    },
  },
};

export default baseTheme;
