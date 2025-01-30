import { useState, useEffect } from "react";

export type ScreenSize = {
  width: number;
  height: number;
};

export type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
  });

  const breakpoints: Breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  };

  const getBreakpointName = (width: number): string | null => {
    if (width <= breakpoints.sm) return "sm";
    if (breakpoints.sm < width && width <= breakpoints.md) return "md";
    if (breakpoints.md < width && width <= breakpoints.lg) return "lg";
    if (breakpoints.lg < width && width <= breakpoints.xl) return "xl";
    if (width > breakpoints.xl) return "xxl";
    return null;
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        const width = window.innerWidth;
        setScreenSize({ width, height: window.innerHeight });

        const breakpoint = getBreakpointName(width);
        setCurrentBreakpoint(breakpoint);
      };

      updateScreenSize();

      window.addEventListener("resize", updateScreenSize);

      return () => {
        window.removeEventListener("resize", updateScreenSize);
      };
    }
  }, []);

  return { screenSize, currentBreakpoint };
}
