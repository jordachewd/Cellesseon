"use client";
import css from "./Header.module.css";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@mui/material";
import Logo from "../shared/Logo";
//import Link from "next/link";

export default function Header() {
  const { signOut } = useClerk();
  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <Logo />
{/*         <Link href="/playground" className="text-jwdMarine">
          PlayGround
        </Link> */}
        <Button size="small" onClick={() => signOut({ redirectUrl: "/" })}>
          Logout
        </Button>
      </div>
    </section>
  );
}
