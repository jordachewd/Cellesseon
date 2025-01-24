import css from "@/styles/layout/InnerPage.module.css";
import { ReactNode } from "react";

interface InnerPageProps {
  children: ReactNode;
}

export default function InnerPage({ children }: InnerPageProps) {
  return (
    <div id="InnerPageWrapper" className={css.wrapper}>
      {children}
    </div>
  );
}
