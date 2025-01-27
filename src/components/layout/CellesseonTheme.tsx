"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
