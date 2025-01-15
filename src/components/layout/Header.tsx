"use client";
import css from "@/styles/layout/Header.module.css";
import AvatarMenu from "../shared/AvatarMenu";
import SidebarToggle from "../shared/SidebarToggle";
import { useChatContext } from "@/context/ChatContext";
import { useUser } from "@clerk/nextjs";
import Logo from "../shared/Logo";
import { Button } from "@mui/material";
import ToggleMode from "../shared/ToggleMode";
import SpinnerGrow from "../shared/SpinnerGrow";

export default function Header() {
  const { user, isLoaded } = useUser();
  const { sidebarCtx } = useChatContext();
  return (
    <section className={css.section}>
      {isLoaded ? (
        <>
          <div className={`${css.left} ${sidebarCtx.isSbOpen && "invisible"}`}>
            {user ? (
              <>
                <Logo />
                <SidebarToggle title="Show Menu" icon="bi-layout-sidebar" />
              </>
            ) : (
              <Logo />
            )}
          </div>
          <div className={css.right}>
            <>
              <ToggleMode />
              {user ? (
                <AvatarMenu />
              ) : (
                <Button size="small" href="/sign-in">
                  login
                </Button>
              )}
            </>
          </div>
        </>
      ) : (
        <div className={css.center}>
          <SpinnerGrow />
        </div>
      )}
    </section>
  );
}
