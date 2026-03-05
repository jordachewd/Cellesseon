"use client";

import {
  CellesseonThemeContext,
  ThemeMode,
} from "@/components/layout/CellesseonTheme";
import { useContext } from "react";

export type ThemeModeState = ThemeMode | undefined;

export default function useThemeMode() {
  const context = useContext(CellesseonThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within CellesseonTheme");
  }

  const { mode, resolvedMode, setMode } = context;
  const safeMode: ThemeModeState = mode;

  return { mode: safeMode, resolvedMode, setMode };
}
