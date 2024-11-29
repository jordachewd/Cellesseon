"use client";
import { useAppContext } from "@/context/AppContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { FC, ReactNode, useMemo } from "react";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

interface CeleseonThemeProviderProps {
  children: ReactNode;
}

const CeleseonThemeProvider: FC<CeleseonThemeProviderProps> = ({
  children,
}) => {
  const {
    themeCtx: { themeMode },
  } = useAppContext();

  const theme = useMemo(
    () => (themeMode === "dark" ? darkTheme : lightTheme),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CeleseonThemeProvider;
