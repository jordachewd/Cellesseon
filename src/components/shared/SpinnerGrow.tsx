import css from "@/styles/shared/SpinnerGrow.module.css";

type BubbleSizes = "small" | "medium" | "large";

interface SpinnerGrowProps {
  className?: string;
  size?: BubbleSizes;
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
  className: style = css.wrapper,
  size = "medium",
}: SpinnerGrowProps) {
  return (
    <div className={style}>
      <div className={`${css.bubble} ${css.bubble1} ${bubble1[size]}`}></div>
      <div className={`${css.bubble} ${css.bubble2} ${bubble2[size]}`}></div>
      <div className={`${css.bubble} ${css.bubble3} ${bubble3[size]}`}></div>
    </div>
  );
}
