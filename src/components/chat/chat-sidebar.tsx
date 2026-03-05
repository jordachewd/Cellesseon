"use client";
import Link from "next/link";
import SidebarToggle from "../shared/sidebar-toggle";
import { useState } from "react";
import PlanPromo from "@/components/shared/plan-promo";
import LogoV2 from "../shared/app-logo";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { PlanData } from "@/types/PlanData.d";

interface ChatSidebarProps {
  userPlan: PlanData | null;
}

export default function ChatSidebar({ userPlan }: ChatSidebarProps) {
  const [desktopCollapsed, setDesktopCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { screenSize } = useScreenSize();
  const isDesktop = screenSize.width > 1024;
  const isOpen = isDesktop ? !desktopCollapsed : mobileOpen;

  const toggleSidebar = () => {
    if (isDesktop) {
      setDesktopCollapsed((prevState) => !prevState);
      return;
    }

    setMobileOpen((prevState) => !prevState);
  };

  return (
    <aside
      className={`fixed bottom-0 left-0 top-0 z-10 flex w-96 -ml-96 flex-col justify-between bg-lightBackground-200 shadow transition-all duration-300 lg:relative lg:w-64 lg:-ml-64 dark:bg-jwdMarine-1000 ${isOpen ? "ml-0" : ""}`}
    >
      <div
        className={`absolute top-2.5 -right-12 flex rounded-md p-1 transition-all duration-300 ${isOpen ? "right-2 lg:-right-12" : ""}`}
      >
        <SidebarToggle
          icon="bi-layout-sidebar"
          title={`${isOpen ? "Hide menu" : "Show menu"}`}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <div className="flex w-full items-center gap-3 bg-lightPrimary-100 p-4 dark:bg-darkPrimary-1000">
        <LogoV2 />
      </div>
      <nav className="mb-auto flex flex-col gap-8 px-4 py-6">
        <div className="flex w-full flex-col gap-1">
          <p className="body-2 text-sm">History</p>

          <Link href="/" className="flex items-center py-1.5">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">New Task</span>
          </Link>
        </div>
      </nav>

      {userPlan && (
        <div className="flex p-4">
          <PlanPromo userPlan={userPlan} />
        </div>
      )}
    </aside>
  );
}
