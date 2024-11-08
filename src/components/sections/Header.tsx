"use client";
import css from "./Header.module.css";
import Logo from "../shared/Logo";
import { useClerk } from "@clerk/nextjs";

import { Button } from "@mui/material";

export default function Header() {
  const { signOut } = useClerk();
  return (
    <section className={css.section}>
      <Logo size="h4" />
      <Button size="small" onClick={() => signOut({ redirectUrl: "/" })}>
        Logout
      </Button>
    </section>
  );
}
