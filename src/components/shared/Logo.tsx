import { Typography } from "@mui/material";

interface LogoProps {
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  noText?: boolean;
}

export default function Logo({
  size,

  noText = false,
}: LogoProps) {
  return (
    <Typography variant={size || "h3"}>
      {!noText && <span className="mr-3">wisea</span>}
      <i className="bi bi-chat-quote"></i>
    </Typography>
  );
}
