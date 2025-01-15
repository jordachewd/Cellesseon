import { useColorScheme } from "@mui/material/styles";
import { PrefersColorScheme } from "@/types";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { TooltipArrow } from "./TooltipArrow";

export default function ToggleMode() {
  const { mode, setMode } = useColorScheme() as {
    mode: PrefersColorScheme | null;
    setMode: (mode: PrefersColorScheme) => void;
  };

  if (!mode) return null;

  return (
    <ButtonGroup aria-label="theme-toggle">
      <TooltipArrow title="Light Theme" placement="bottom">
        <Button
          size="small"
          sx={{
            minWidth: "0!important",
            border: "none",
            borderRadius: "8px",
            marginRight: "0.25rem",
          }}
          onClick={() => setMode("light" as PrefersColorScheme)}
          variant={mode === "light" ? "contained" : "outlined"}
        >
          <i className="bi bi-sun text-sm"></i>
        </Button>
      </TooltipArrow>
      <TooltipArrow title="Dark Theme" placement="bottom">
        <Button
          size="small"
          sx={{
            minWidth: "0!important",
            border: "none",
            borderRadius: "8px!important",
          }}
          onClick={() => setMode("dark" as PrefersColorScheme)}
          variant={mode === "dark" ? "contained" : "outlined"}
        >
          <i className="bi bi-moon-stars text-sm"></i>
        </Button>
      </TooltipArrow>
    </ButtonGroup>
  );
}
