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
    <div
      className={`PageWrapper relative z-10 flex h-dvh w-full flex-col p-0 m-0 ${customCss}`}
      id={pageId}
    >
      {scrollable ? (
        <div className="cellesseon-scrollbar relative z-10 mt-14 flex h-full w-full flex-1 flex-col gap-10 overflow-y-auto pb-10">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
