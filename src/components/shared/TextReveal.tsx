import { Typography } from "@mui/material";

interface TextRevealProps {
  text: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1";
}

export default function TextReveal({ text, variant }: TextRevealProps) {
  return (
    <div className="flex overflow-hidden">
      <Typography variant={variant || "h3"}>
        {text.match(/./gu)!.map((char, index) => (
          <span
            className="animate-text-reveal inline-block [animation-fill-mode:backwards]"
            key={`${char}-${index}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Typography>
    </div>
  );
}
