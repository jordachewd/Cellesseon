import { PaletteColorOptions } from "@mui/material";

// Extend the MUI Palette and PaletteOptions interfaces
declare module "@mui/material/styles" {
  interface Palette {
    // primary: PaletteColorOptions; (default) --- Primary Color: Use for key interactive elements (buttons, highlights).
    // secondary: PaletteColorOptions; (default) --- Secondary Color: Use for hover states, secondary buttons, or less prominent UI elements.
    tertiary?: PaletteColorOptions; // --- Accent Color: Apply sparingly for call-to-actions or to emphasize certain sections.
    quaternary?: PaletteColorOptions; // --- Background and Text Color: Ensure a strong contrast for accessibility.
    quinary?: PaletteColorOptions; // --- Borders and Lines: Use minimally to maintain a clean and modern look.
  }

  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    quaternary?: PaletteColorOptions;
    quinary?: PaletteColorOptions;
  }
}
