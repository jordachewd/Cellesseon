import css from "@/styles/layout/PageWrapper.module.css";
import { ReactNode } from "react";
//import { SignedOut } from "@clerk/nextjs";
//import BgAnimation from "../shared/BgAnimation";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className={css.main}>
      {children}
      <div className={css.background}></div>
{/*       <SignedOut>
        <BgAnimation />
      </SignedOut> */}
    </main>
  );
}
