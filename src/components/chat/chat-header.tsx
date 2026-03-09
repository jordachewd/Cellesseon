"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TooltipArrow } from "../shared/tooltip-arrow";
import ToggleTheme from "@/components/shared/toggle-theme";
import AvatarMenu from "@/components/shared/avatar-menu";
import Logo from "../shared/app-logo";

interface ChatHeaderProps {
  className?: string;
  isInUse?: boolean;
  setNewTask?: () => void;
}

export default function ChatHeader({
  className: style = "",
  setNewTask,
  isInUse,
}: ChatHeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const currentPath = usePathname();
  const isMainPage = currentPath === "/app";

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(
      "#ChatWrapperContent, #PageWrapperContent > div",
    );

    if (element) {
      const onScroll = () => {
        setScrolled(element.scrollTop > 10);
      };

      element.addEventListener("scroll", onScroll);

      return () => {
        element.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <section
      className={`ChatHeader absolute left-0 right-0 top-0 z-20 flex w-full px-4 transition-all duration-300 ease-in-out ${scrolled ? "bg-lightPrimary-100/50 shadow-sm backdrop-blur-lg dark:bg-darkPrimary-900/50" : ""} ${style}`}
    >
      <div
        className={`mx-auto flex w-full items-center justify-between gap-4 py-3 ${isMainPage ? "pl-8" : ""}`}
      >
        <div className="flex items-center gap-4">
          <Logo />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <TooltipArrow
            title="New Task"
            placement="right"
            className="transition-all"
          >
            <button
              type="button"
              onClick={setNewTask}
              disabled={isInUse}
              className="icon-btn"
              aria-label="Start new task"
            >
              <i className="bi bi-plus-circle-dotted"></i>
            </button>
          </TooltipArrow>
          
          <ToggleTheme />
          <AvatarMenu />
        </div>
      </div>
    </section>
  );
}
