"use client";
import css from "@/styles/layout/Footer.module.css";
import { useColorScheme } from "@mui/material/styles";
import lightLogo from "../../../public/images/jwd_light.png";
import darkLogo from "../../..//public/images/jwd_dark.png";
import Image from "next/image";

export default function Footer() {
  const { mode } = useColorScheme();
  return (
    <section className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <div className="flex border-r dark:border-white/10 border-black/25 pr-4">
            <Image
              src={mode !== "dark" ? darkLogo : lightLogo}
              alt="JWD"
              width={32}
              height={32}
              className="z-10"
              priority
            />
          </div>

          <div className="flex flex-col text-xxs leading-3">
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
