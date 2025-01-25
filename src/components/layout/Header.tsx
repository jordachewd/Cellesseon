"use client";
import css from "@/styles/layout/Header.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import { Button } from "@mui/material";
import Logo from "../shared/Logo";
import ToggleTheme from "../shared/ToggleTheme";
import SidebarToggle from "../shared/SidebarToggle";

export default function Header() {
  const { sidebarCtx } = useChatContext();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(
      "section#LandingPageWrapper, div#InnerPageWrapper"
    );
    if (element) {
      element.addEventListener("scroll", () => {
        setScrolled(element.scrollTop > 10);
      });
    }
  }, []);

  return (
    <section className={`${css.section} ${scrolled && css.scrolled}`}>
      <div className={css.content}>
        <div className={`${css.left} ${sidebarCtx.isSbOpen && "invisible"}`}>
          <Logo />
          <SignedIn>
            <SidebarToggle title="Show Menu" icon="bi-layout-sidebar" />
          </SignedIn>
        </div>
        <div className={css.right}>
          <SignedOut>
            <Button size="small" href="/sign-in">
              login
            </Button>
          </SignedOut>
          <ToggleTheme />
        </div>
      </div>
    </section>
  );
}
