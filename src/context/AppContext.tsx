"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
interface ThemeContextType {
  themeMode: "light" | "dark";
  toggleThemeMode: () => void;
  setThemeMode: (mode: "light" | "dark") => void;
}
interface AppContextType {
  themeCtx: ThemeContextType;
}
const defaultContextValue: AppContextType = {
  themeCtx: {
    themeMode: "light",
    toggleThemeMode: () => {},
    setThemeMode: () => {},
  },
};
const AppContext = createContext<AppContextType>(defaultContextValue);
interface AppContextProviderProps {
  children: ReactNode;
}
export function AppContextProvider({ children }: AppContextProviderProps) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("themeMode");
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeMode(savedTheme);
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        setThemeMode(prefersDarkMode ? "dark" : "light");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", themeMode);
      document.documentElement.setAttribute("data-mode", themeMode);
    }
  }, [themeMode]);

  const context: AppContextType = {
    themeCtx: {
      themeMode,
      toggleThemeMode: () =>
        setThemeMode((prev) => (prev === "light" ? "dark" : "light")),
      setThemeMode,
    },
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
export const useAppContext = () => useContext(AppContext);
export default AppContext;
