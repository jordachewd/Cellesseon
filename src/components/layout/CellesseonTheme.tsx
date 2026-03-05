"use client";
import { ThemeProvider, CssBaseline } from "@/components/shared/mui-theme";
import muiTheme from "@/themes/muiTheme";
import { ReactNode } from "react";

interface ThemeProps {
  children: ReactNode;
}

export default function CellesseonTheme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
