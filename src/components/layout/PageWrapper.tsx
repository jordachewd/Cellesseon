import css from "./PageWrapper.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
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
        <div className={css.lpBackground}></div>
      </SignedOut>
      <SignedIn>
        <div className={css.chatBackground}></div>
      </SignedIn>
    </main>
  );
}
