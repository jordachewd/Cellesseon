"use client";
import css from "@/styles/chat/ChatHeader.module.css";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { TooltipArrow } from "../shared/TooltipArrow";
import ToggleTheme from "@/components/shared/ToggleTheme";
import AvatarMenu from "@/components/shared/AvatarMenu";
import LogoV2 from "../shared/LogoV2";

export default function ChatHeader() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const element = document.querySelector<HTMLElement>("section#ChatWrapperContent");
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
          <LogoV2 />

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
                lineHeight: 1,
              }}
            >
              <i className="bi bi-plus-circle-dotted"></i>
            </IconButton>
          </TooltipArrow>
        </div>
        <div className={css.right}>
          <ToggleTheme />
          <AvatarMenu />
        </div>
      </div>
    </section>
  );
}
