"use client";
import css from "@/styles/chat/ChatHeader.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconButton } from "@mui/material";
import { TooltipArrow } from "../shared/TooltipArrow";
import ToggleTheme from "@/components/shared/ToggleTheme";
import AvatarMenu from "@/components/shared/AvatarMenu";
import LogoV2 from "../shared/LogoV2";

interface ChatHeaderProps {
  className?: string;
}

export default function ChatHeader({ className: style = "" }: ChatHeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const isScrolled = scrolled ? css.scrolled : "";
  const customCss = style ? style : "";
  const currentPath = usePathname();

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(
      "#ChatWrapperContent, #PageWrapperContent > div"
    );
    if (element) {
      element.addEventListener("scroll", () => {
        setScrolled(element.scrollTop > 10);
      });
    }
  }, []);

  return (
    <section className={`${css.section} ${isScrolled} ${customCss}`}>
      <div className={css.content}>
        <div className={css.left}>
          {currentPath !== "/" && <LogoV2 />}
          {currentPath === "/" && (
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
          )}
        </div>
        <div className={css.right}>
          <ToggleTheme />
          <AvatarMenu />
        </div>
      </div>
    </section>
  );
}
