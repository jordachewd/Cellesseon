import css from "@/styles/layout/PageWrapper.module.css"; 
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className={css.main}>
      {children}
      <div className={css.background}></div>
    </main>
  );
}
