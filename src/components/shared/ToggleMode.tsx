import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useColorScheme } from "@mui/material/styles";
import { PrefersColorScheme } from "@/types";

export default function ToggleMode() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return;

  return (
    <RadioGroup
      row
      value={mode}
      name="theme-toggle"
      aria-labelledby="theme-toggle"
      onChange={(event) => setMode(event.target.value as PrefersColorScheme)}
    >
      <FormControlLabel
        label="System"
        value="system"
        control={<Radio size="small" />}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "1em",
          },
        }}
      />
      <FormControlLabel
        label="Light"
        value="light"
        control={<Radio size="small" />}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "1em",
          },
        }}
      />
      <FormControlLabel
        label="Dark"
        value="dark"
        control={<Radio size="small" />}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "1em",
          },
        }}
      />
    </RadioGroup>
  );
}
