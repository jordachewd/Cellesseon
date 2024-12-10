"use client";
import css from "@/styles/layout/Header.module.css";
import AvatarMenu from "../shared/AvatarMenu";
import SidebarToggle from "../shared/SidebarToggle";
import { useChatContext } from "@/context/ChatContext";
import Logo from "../shared/Logo";

export default function Header() {
  const { sidebarCtx } = useChatContext();
  return (
    <section className={css.section}>
      <div className={`${css.left} ${sidebarCtx.isSbOpen && "invisible"}`}>
        <Logo />
        <SidebarToggle title="Show Menu" icon="bi-layout-sidebar" />
      </div>
      <div className={css.right}>
        <AvatarMenu />
      </div>
    </section>
  );
}
