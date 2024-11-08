import css from "./LoadingSpinner.module.css";

interface SpinnerProps {
  text?: string;
  color?: string;
  iconSize?: string;
  alignment?: "left" | "right" | "center";
  className?: string;
}

export default function LoadingSpinner({
  text = "Processing ...",
  alignment = "center",
  iconSize = "text-base",
  color = "text-white",
  className = "",
}: SpinnerProps) {
  let txtPos = "";
  switch (alignment) {
    case "right":
      txtPos = "flex-row-reverse space-x-reverse";
      break;
    case "center":
      txtPos = "justify-center";
      break;
    default:
      break;
  }

  const wrapperStyle = css.wrapper + " " + txtPos + " " + className;
  const iconStyle = css.icon + " " + color + " " + iconSize;

  return (
    <div className={wrapperStyle}>
      <div className={css.container}>
        <i className={`bi bi-arrow-repeat ${iconStyle}`}></i>
        {text !== undefined && text !== "" && (
          <span className={`text-xs ${color}`}>{text}</span>
        )}
      </div>
    </div>
  );
}
