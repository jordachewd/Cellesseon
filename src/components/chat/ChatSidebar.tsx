"use client";
import Link from "next/link";
import css from "@/styles/chat/ChatSidebar.module.css";
import SidebarToggle from "../shared/SidebarToggle";
import { Typography } from "@mui/material";
import { useState } from "react";
import PlanPromo from "@/components/shared/PlanPromo";
import LogoV2 from "../shared/Logo";
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
    <aside className={`${css.wrapper} ${isOpen ? css.show : ""}`}>
      <div className={css.toggle}>
        <SidebarToggle
          icon="bi-layout-sidebar"
          title={`${isOpen ? "Hide menu" : "Show menu"}`}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <div className={css.topbar}>
        <LogoV2 />
      </div>
      <nav className={`${css.navigation}`}>
        <div className={css.history}>
          <Typography variant="body2">History</Typography>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">New Task</span>
          </Link>
        </div>
      </nav>

      {userPlan && (
        <div className={css.promo}>
          <PlanPromo userPlan={userPlan} />
        </div>
      )}
    </aside>
  );
}
