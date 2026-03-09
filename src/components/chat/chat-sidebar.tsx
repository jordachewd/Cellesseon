"use client";

import Link from "next/link";
import SidebarToggle from "../shared/sidebar-toggle";
import { useEffect, useState } from "react";
import PlanPromo from "@/components/shared/plan-promo";
import LogoV2 from "../shared/app-logo";
import { PlanData } from "@/types/PlanData.d";

interface ChatSidebarProps {
  userPlan: PlanData | null;
}

export default function ChatSidebar({ userPlan }: ChatSidebarProps) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isOpen = isDesktop ? !desktopCollapsed : mobileOpen;
  const sidebarPosition = isOpen ? "ml-0 lg:ml-0" : "-ml-80 lg:-ml-64";

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncDesktopState = (event?: MediaQueryListEvent) => {
      setIsDesktop(event?.matches ?? desktopMediaQuery.matches);
    };

    syncDesktopState();
    desktopMediaQuery.addEventListener("change", syncDesktopState);

    return () => {
      desktopMediaQuery.removeEventListener("change", syncDesktopState);
    };
  }, []);

  const handleToggleSidebar = () => {
    if (isDesktop) {
      setDesktopCollapsed((prevState) => !prevState);
      return;
    }

    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <aside
        className={`ChatSidebar fixed bottom-0 left-0 top-0 z-10 flex w-80 max-w-[85vw] flex-col justify-between bg-lightBackground-200 shadow transition-all duration-300 lg:relative lg:w-64 lg:max-w-64 dark:bg-jwdMarine-1000 ${sidebarPosition}`}
      >
        <div className="ChatSidebarHead flex w-full items-center gap-3 bg-lightPrimary-100 p-4 dark:bg-darkPrimary-1000">
          <LogoV2 />

          <div className="fixed left-52 top-2.5 z-30 flex rounded-md p-1">
            <SidebarToggle
              icon="bi-layout-sidebar"
              title={`${isOpen ? "Hide menu" : "Show menu"}`}
              toggleSidebar={handleToggleSidebar}
            />
          </div>
        </div>

        <nav className="ChatSidebarNav mb-auto flex flex-col gap-8 px-4 py-6">
          <div className="flex w-full flex-col gap-1">
            <p className="body-2 text-sm">History</p>

            <Link href="/" className="flex items-center py-1.5">
              <i className="bi bi-chat-dots text-lg"></i>
              <span className="ml-3">New Task</span>
            </Link>
          </div>
        </nav>

        {userPlan && (
          <div className="ChatSidebarPromo flex p-4">
            <PlanPromo userPlan={userPlan} />
          </div>
        )}
      </aside>
    </>
  );
}
