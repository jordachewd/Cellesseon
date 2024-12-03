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

interface CeleseonContextType {
  themeCtx: ThemeContextType;
}

const defaultContextValue: CeleseonContextType = {
  themeCtx: {
    themeMode: "light",
    toggleThemeMode: () => {},
    setThemeMode: () => {},
  },
};

const CeleseonContext = createContext<CeleseonContextType>(defaultContextValue);

interface CeleseonContextProviderProps {
  children: ReactNode;
}

export function CeleseonContextProvider({
  children,
}: CeleseonContextProviderProps) {
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
      /* for Tailwind CSS */
      document.documentElement.setAttribute("data-mode", themeMode);
    }
  }, [themeMode]);

  const context: CeleseonContextType = {
    themeCtx: {
      themeMode,
      toggleThemeMode: () =>
        setThemeMode((prev) => (prev === "light" ? "dark" : "light")),
      setThemeMode,
    },
  };
  return (
    <CeleseonContext.Provider value={context}>
      {children}
    </CeleseonContext.Provider>
  );
}

export const useCeleseonContext = () => useContext(CeleseonContext);
export default CeleseonContext;
