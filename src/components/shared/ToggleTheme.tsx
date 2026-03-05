import { ButtonGroup, Button } from "@/components/shared/mui";
import { TooltipArrow } from "./TooltipArrow";
import { useEffect } from "react";
import useThemeMode from "@/lib/hooks/use-theme-mode";

export default function ToggleTheme() {
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    if (mode === "system") {
      const defaultMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (defaultMode) {
        setMode("dark");
      } else {
        setMode("light");
      }
    }
  }, [mode, setMode]);

  return (
    <ButtonGroup aria-label="theme-toggle">
      <TooltipArrow title="Light" placement="bottom">
        <Button
          size="small"
          onClick={() => setMode("light")}
          variant={mode === "light" ? "contained" : "outlined"}
          sx={{
            border: "none",
            padding: "4px 7px",
            marginRight: "0.25rem",
            minWidth: "0!important",
            borderRadius: "8px!important",
          }}
        >
          <i className="bi bi-sun text-sm"></i>
        </Button>
      </TooltipArrow>
      <TooltipArrow title="Dark" placement="bottom">
        <Button
          size="small"
          onClick={() => setMode("dark")}
          variant={mode === "dark" ? "contained" : "outlined"}
          sx={{
            border: "none",
            padding: "4px 7px",
            minWidth: "0!important",
            borderRadius: "8px!important",
          }}
        >
          <i className="bi bi-moon-stars text-sm"></i>
        </Button>
      </TooltipArrow>
    </ButtonGroup>
  );
}
