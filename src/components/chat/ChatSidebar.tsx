"use client";
import Link from "next/link";
import css from "@/styles/chat/ChatSidebar.module.css";
import SidebarToggle from "../shared/SidebarToggle";
import { Typography } from "@mui/material";
import { UserData } from "@/types/UserData.d";
import { useState } from "react";
import PlanPromo from "@/components/shared/PlanPromo";
import Logo from "../shared/Logo";
import LogoV2 from "../shared/LogoV2";

interface ChatSidebarProps {
  userData: UserData | undefined;
}

export default function ChatSidebar({ userData }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <aside className={`${css.wrapper} ${!isOpen && css.isOpen}`}>
      <div className={css.topbar}>
        <Logo symbol />
        <LogoV2 className={isOpen ? "hidden" : ""} />
      </div>
      <nav className={`${css.navigation} mt-12`}>
        <div className={css.history}>
          <Typography variant="body2">History</Typography>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Task #1</span>
          </Link>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Task #2</span>
          </Link>
          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Task #3</span>
          </Link>
        </div>
      </nav>
      <div className="p-2">
        <SidebarToggle
          icon="bi-layout-sidebar"
          title={`${isOpen ? "Hide menu" : "Show menu"}`}
          toggleSidebar={() => setIsOpen(!isOpen)}
        />
      </div>
      {userData && (
        <div className={css.promo}>
          <PlanPromo userPlan={userData.plan} />
        </div>
      )}
    </aside>
  );
}
