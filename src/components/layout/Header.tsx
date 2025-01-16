"use client";
import css from "@/styles/layout/Header.module.css";
import { useEffect, useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@mui/material";
import Logo from "../shared/Logo";
import ToggleMode from "../shared/ToggleMode";
import SpinnerGrow from "../shared/SpinnerGrow";
import SidebarToggle from "../shared/SidebarToggle";

export default function Header() {
  const { user, isLoaded } = useUser();
  const { sidebarCtx } = useChatContext();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(
      "section#LandingPageWrapper"
    );
    if (element) {
      element.addEventListener("scroll", () => {
        setScrolled(element.scrollTop > 10);
      });
    }
  }, []);

  return (
    <section className={`${css.section} ${scrolled ? css.scrolled : ""}`}>

      <div className={`${css.content} ${!user && "max-w-screen-2xl"}`}>
        {isLoaded ? (
          <>
            <div
              className={`${css.left} ${sidebarCtx.isSbOpen && "invisible"}`}
            >
              {user ? (
                <>
                  <Logo />
                  <SidebarToggle title="Show Menu" icon="bi-layout-sidebar" />
                </>
              ) : (
                <Logo />
              )}
            </div>
            <div className={css.right}>
              {user ? (
                <ToggleMode />
              ) : (
                <>
                  <Button size="small" href="/sign-in">
                    login
                  </Button>
                  <ToggleMode />
                </>
              )}
            </div>
          </>
        ) : (
          <div className={css.center}>
            <SpinnerGrow />
          </div>
        )}
      </div>
    </section>
  );
}
