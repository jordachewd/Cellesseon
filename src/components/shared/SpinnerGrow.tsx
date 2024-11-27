import css from "./SpinnerGrow.module.css";
interface SpinnerGrowProps {
  styles?: string;
  size?: "small" | "medium" | "large";
}

const bubble1 = {
  small: "w-1 h-1",
  medium: "w-1.5 h-1.5",
  large: "w-2 h-2",
};

const bubble2 = {
  small: "w-1.5 h-1.5",
  medium: "w-2 h-2",
  large: "w-2.5 h-2.5",
};

const bubble3 = {
  small: "w-2 h-2",
  medium: "w-2.5 h-2.5",
  large: "w-3 h-3",
};

export default function SpinnerGrow({
  styles,
  size = "medium",
}: SpinnerGrowProps) {
  return (
    <div className={`${css.wrapper} ${styles || ""}`}>
      <div className={`${css.bubble} ${bubble1[size]} bg-jwdAqua-500/50`}></div>
      <div
        className={`${css.bubble} ${bubble2[size]} bg-jwdAqua-500/35 animate-delay-100`}
      ></div>
      <div
        className={`${css.bubble} ${bubble3[size]} bg-jwdAqua-500/25 animate-delay-200`}
      ></div>
    </div>
  );
}
