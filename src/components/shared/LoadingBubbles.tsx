import classNames from "classnames"; // Utility for managing class strings
import css from "@/styles/shared/LoadingBubbles.module.css";

type BubbleSizes = "small" | "medium" | "large";

interface LoadingBubblesProps {
  className?: string;
  size?: BubbleSizes;
  wrapped?: boolean;
}

const sizeMappings = {
  small: ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2"],
  medium: ["w-1.5 h-1.5", "w-2 h-2", "w-2.5 h-2.5"],
  large: ["w-2 h-2", "w-2.5 h-2.5", "w-3 h-3"],
};

export default function LoadingBubbles({
  className,
  size = "medium",
  wrapped = false,
}: LoadingBubblesProps) {
  const bubbles = sizeMappings[size] || sizeMappings.medium;

  const bubbleLoader = (
    <div className={classNames(css.wrapper, className)}>
      {bubbles.map((bubbleSize, index) => (
        <div
          key={index}
          className={classNames(
            css.bubble,
            css[`bubble${index + 1}`],
            bubbleSize
          )}
        />
      ))}
    </div>
  );

  if (wrapped) {
    return <div className={css.isWrapped}>{bubbleLoader}</div>;
  }

  return bubbleLoader;
}
