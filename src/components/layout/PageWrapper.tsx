import css from "@/styles/layout/PageWrapper.module.css";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({
  children,
  className: styles = "",
}: PageWrapperProps) {
  return <div className={`${css.section} ${styles}`}>{children}</div>;
}
