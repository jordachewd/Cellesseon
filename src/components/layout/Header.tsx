"use client";
import css from "./Header.module.css";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@mui/material";
import Logo from "../shared/Logo";

export default function Header() {
  const { signOut } = useClerk();
  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <Logo />
        <Button size="small" onClick={() => signOut({ redirectUrl: "/" })}>
          Logout
        </Button>
      </div>
    </section>
  );
}
