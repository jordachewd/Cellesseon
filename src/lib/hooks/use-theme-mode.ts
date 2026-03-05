"use client";

import { useColorScheme } from "@/components/shared/mui-theme";

export type ThemeMode = "system" | "light" | "dark";
export type ThemeModeState = ThemeMode | undefined;

export default function useThemeMode() {
  const { mode, setMode } = useColorScheme();
  const safeMode: ThemeModeState =
    mode === "light" || mode === "dark" || mode === "system" ? mode : undefined;

  return {
    mode: safeMode,
    setMode: (nextMode: ThemeMode) => setMode(nextMode),
  };
}
