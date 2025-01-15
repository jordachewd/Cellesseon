import { useColorScheme } from "@mui/material/styles";
import { PrefersColorScheme } from "@/types";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function ToggleMode() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  return (
    <ButtonGroup aria-label="theme-toggle">
      <Button
        size="small"
        onClick={() => setMode("light" as PrefersColorScheme)}
        variant={mode === "light" ? "contained" : "outlined"}
      >
        <i className="bi bi-sun text-sm"></i>
      </Button>
      <Button
        size="small"
        onClick={() => setMode("dark" as PrefersColorScheme)}
        variant={mode === "dark" ? "contained" : "outlined"}
      >
        <i className="bi bi-moon-stars text-sm"></i>
      </Button>
    </ButtonGroup>
  );
}
