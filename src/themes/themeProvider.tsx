"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useMemo } from "react";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";
import { useCeleseonContext } from "@/context/CeleseonContext";

interface CeleseonThemeProviderProps {
  children: ReactNode;
}

export default function CeleseonThemeProvider({
  children,
}: CeleseonThemeProviderProps) {
  const {
    themeCtx: { themeMode },
  } = useCeleseonContext();

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
}
