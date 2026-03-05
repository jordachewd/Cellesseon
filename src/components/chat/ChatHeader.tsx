"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TooltipArrow } from "../shared/TooltipArrow";
import ToggleTheme from "@/components/shared/ToggleTheme";
import AvatarMenu from "@/components/shared/AvatarMenu";
import LogoV2 from "../shared/Logo";

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
  const isMainPage = currentPath === "/";

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
      className={`absolute left-0 right-0 top-0 z-20 flex w-full px-4 transition-all duration-300 ease-in-out ${scrolled ? "bg-lightPrimary-100/50 shadow-sm backdrop-blur-lg dark:bg-darkPrimary-900/50" : ""} ${style}`}
    >
      <div
        className={`mx-auto flex w-full items-center justify-between gap-4 py-3 ${isMainPage ? "pl-8" : ""}`}
      >
        <div className="flex items-center gap-4">
          {!isMainPage && <LogoV2 />}
          {isMainPage && (
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
          )}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ToggleTheme />
          <AvatarMenu />
        </div>
      </div>
    </section>
  );
}
