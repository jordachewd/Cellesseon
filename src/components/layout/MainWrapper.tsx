import css from "@/styles/layout/MainWrapper.module.css";
import { ReactNode } from "react";

interface MainWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function MainWrapper({
  children,
  className: styles = "",
}: MainWrapperProps) {
  return (
    <main className={`${css.main} ${styles}`}>
      {children}
      <div className={css.background}></div>
    </main>
  );
}
