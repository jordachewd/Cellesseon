"use client";
import css from "@/styles/layout/Header.module.css";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { TooltipArrow } from "../shared/TooltipArrow";
import ToggleTheme from "@/components/shared/ToggleTheme";
import AvatarMenu from "@/components/shared/AvatarMenu";
import LogoV2 from "../shared/LogoV2";

interface HeaderProps {
  isSignedIn?: boolean;
}

export default function Header({ isSignedIn = false }: HeaderProps) {
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
        <div className={css.left}>
          {!isSignedIn && <LogoV2 />}
          {isSignedIn && (
            <TooltipArrow
              title="New Task"
              placement="right"
              className="!transition-all"
            >
              <IconButton
                size="small"
                sx={{
                  padding: "4px 7px",
                  borderRadius: "8px!important",
                }}
              >
                <i className="bi bi-plus-circle-dotted"></i>
              </IconButton>
            </TooltipArrow>
          )}
        </div>
        <div className={css.right}>
          {!isSignedIn && (
            <Button size="small" href="/sign-in">
              login
            </Button>
          )}

          <ToggleTheme />
          <AvatarMenu />
        </div>
      </div>
    </section>
  );
}
