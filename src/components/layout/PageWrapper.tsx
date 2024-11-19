import css from "./PageWrapper.module.css";
import { ReactNode } from "react";
interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className={css.main}>
      <div className={css.content}>{children}</div>
    </main>
  );
}
