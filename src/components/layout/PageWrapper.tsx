import css from "./PageWrapper.module.css";
import { SignedOut } from "@clerk/nextjs";
import { ReactNode } from "react";
import BgAnimation from "../shared/BgAnimation";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className={css.main}>
      {children}
      <SignedOut>
        <BgAnimation />
      </SignedOut>
      <div className={css.background}></div>
    </main>
  );
}
