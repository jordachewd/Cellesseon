"use client";
import css from "@/styles/layout/Header.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ToggleTheme from "@/components/shared/ToggleTheme";
import LogoV2 from "../shared/LogoV2";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`${css.section} ${scrolled && css.scrolled}`}>
      <div className={css.content}>
        <div className={css.left}>
          <LogoV2 />
        </div>
        <div className={css.right}>
          <Button size="small" href="/sign-in">
            login
          </Button>

          <ToggleTheme />
        </div>
      </div>
    </section>
  );
}
