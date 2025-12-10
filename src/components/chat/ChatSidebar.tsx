"use client";
import Link from "next/link";
import css from "@/styles/chat/ChatSidebar.module.css";
import SidebarToggle from "../shared/SidebarToggle";
import { Typography } from "@mui/material";
import { UserData } from "@/types/UserData.d";
import { useEffect, useState } from "react";
import PlanPromo from "@/components/shared/PlanPromo";
import LogoV2 from "../shared/Logo";
import { useUser } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import useScreenSize from "@/lib/hooks/useScreenSize";

export default function ChatSidebar() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { screenSize } = useScreenSize();
  const screenWidth = screenSize.width;
  const { user } = useUser();

  useEffect(() => {
    if (screenWidth <= 1024) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (user?.id) {
      const getUserData = async (userId: string) => {
        const response = await getUserById(userId);
        if (response) {
          setUserData(response);
        }
      };
      getUserData(user.id);
    }
  }, [user?.id]);

  return (
    <aside className={`${css.wrapper} ${isOpen ? css.show : ""}`}>
      <div className={css.toggle}>
        <SidebarToggle
          icon="bi-layout-sidebar"
          title={`${isOpen ? "Hide menu" : "Show menu"}`}
          toggleSidebar={() => setIsOpen(!isOpen)}
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

      {userData && (
        <div className={css.promo}>
          <PlanPromo userPlan={userData.plan} />
        </div>
      )}
    </aside>
  );
}
