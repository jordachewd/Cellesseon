import css from "./Logo.module.css";
import { Typography } from "@mui/material";

interface LogoProps {
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  noText?: boolean;
}

export default function Logo({ size, noText = false }: LogoProps) {
  return (
    <div className={css.wrapper}>
      <Typography variant={size || "h3"}>
        <i className={`bi bi-robot ${css.logo}`}></i>
      </Typography>
      {!noText && <Typography variant={size || "h3"}>Celeseon</Typography>}
    </div>
  );
}
