import css from "./PageWrapper.module.css";
import { ReactNode } from "react";
interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return <section className={css.section}>{children}</section>;
}
