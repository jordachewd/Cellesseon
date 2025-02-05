import { useColorScheme } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { TooltipArrow } from "./TooltipArrow";
import { useEffect } from "react";

type ColorSchemes = "system" | "light" | "dark";

export default function ToggleTheme() {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    if (mode === "system") {
      const defaultMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (defaultMode) {
        setMode("dark" as ColorSchemes);
      } else {
        setMode("light" as ColorSchemes);
      }
    }
  }, [mode, setMode]);

  return (
    <ButtonGroup aria-label="theme-toggle">
      <TooltipArrow title="Light" placement="bottom">
        <Button
          size="small"
          onClick={() => setMode("light" as ColorSchemes)}
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
          onClick={() => setMode("dark" as ColorSchemes)}
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
