import css from "./LoadingSpinner.module.css";

interface SpinnerProps {
  text?: string;
  iconColor?: string;
  iconSize?: string;
  textColor?: string;
  alignment?: "left" | "right" | "center";
  className?: string;
}

export default function LoadingSpinner({
  text = "Loading ...",
  alignment = "center",
  iconColor = "text-jwdOrange",
  iconSize = "text-base",
  textColor = "text-slate-400",
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
  const iconStyle = css.icon + " " + iconColor + " " + iconSize;

  return (
    <div className={wrapperStyle}>
      <i className={`bi bi-arrow-repeat ${iconStyle}`}></i>
      {text !== undefined && text !== "" && (
        <span className={`text-xs ${textColor}`}>{text}</span>
      )}
    </div>
  );
}
