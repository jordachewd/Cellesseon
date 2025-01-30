import css from "@/styles/layout/PageWrapper.module.css";
import { ReactNode } from "react";

interface PageWrapperProps {
  id?: string;
  scrollable?: boolean;
  className?: string;
  children: ReactNode;
}

export default function PageWrapper({
  children,
  scrollable = false,
  className: customCss = "",
  id: pageId = "PageWrapper",
}: PageWrapperProps) {
  return (
    <div className={`${css.wrapper} ${customCss}`} id={pageId}>
      {scrollable ? <div className={css.content}>{children}</div> : children}
    </div>
  );
}
