"use client";
import css from "./Header.module.css";
import AvatarMenu from "../shared/AvatarMenu";
import SidebarToggle from "../shared/SidebarToggle";
import { useChatContext } from "@/context/ChatContext";

export default function Header() {
  const { sidebarCtx } = useChatContext();
  return (
    <section className={css.section}>
      <SidebarToggle
        title="Show Menu"
        icon="bi-layout-sidebar"
        show={sidebarCtx.isSbOpen}
      />
      <AvatarMenu className="ml-auto" />
    </section>
  );
}
