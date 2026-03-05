"use client";
import css from "@/styles/layout/Footer.module.css";
import lightLogo from "../../../public/images/jwd_light.png";
import darkLogo from "../../../public/images/jwd_dark.png";
import Image from "next/image";
import useThemeMode from "@/lib/hooks/use-theme-mode";

export default function Footer() {
  const { mode } = useThemeMode();

  return (
    <section className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <div className={css.jwdlogo}>
            <Image
              src={mode !== "dark" ? darkLogo : lightLogo}
              alt="JWD"
              width={32}
              height={32}
              className="z-10"
              priority
            />
          </div>

          <div className={css.jwdinfo}>
            <span>© {new Date().getFullYear()} JordacheWD.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
        <div className={css.right}>
          <span>Privacy & Cookie Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </section>
  );
}
