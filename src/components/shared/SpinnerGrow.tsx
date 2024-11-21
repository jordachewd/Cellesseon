import css from "./SpinnerGrow.module.css";
interface SpinnerGrowProps {
  className?: string;
}

export default function SpinnerGrow({ className }: SpinnerGrowProps) {
  return (
    <div className={`${css.wrapper} ${className}`}>
      <div className={`${css.bubble} w-2 h-2 bg-jwdAqua-500/50`}></div>
      <div
        className={`${css.bubble} w-2.5 h-2.5 bg-jwdAqua-500/35 animate-delay-100`}
      ></div>
      <div
        className={`${css.bubble} w-3 h-3 bg-jwdAqua-500/25 animate-delay-200`}
      ></div>
    </div>
  );
}
