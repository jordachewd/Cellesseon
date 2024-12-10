import muiBase from "./muiBase";
import { createTheme } from "@mui/material/styles";
import { muiComponents } from "./muiComponents";
import { muiPaletteDark } from "./muiPaletteDark";
import { muiPaletteLight } from "./muiPaletteLight";

const muiTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-celeseon-theme",
  },
  colorSchemes: {
    light: muiPaletteLight,
    dark: muiPaletteDark,
  },
  ...muiBase,
  ...muiComponents,
});

export default muiTheme;
