"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ToggleTheme from "@/components/shared/toggle-theme";
import LogoV2 from "../shared/app-logo";

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
    <section
      className={`sticky left-0 right-0 top-0 z-20 flex w-full px-4 transition-all duration-300 ease-in-out ${scrolled ? "bg-lightPrimary-100/50 shadow-sm backdrop-blur-lg dark:bg-darkPrimary-900/50" : ""}`}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-4">
          <LogoV2 />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link className="btn btn-text btn-sm" href="/sign-in">
            login
          </Link>

          <ToggleTheme />
        </div>
      </div>
    </section>
  );
}
