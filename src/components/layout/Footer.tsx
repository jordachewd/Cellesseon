"use client";
import css from "@/styles/layout/Footer.module.css";
import { useColorScheme } from "@mui/material/styles";
import Image from "next/image";

export default function Footer() {
  const { mode } = useColorScheme();
  return (
    <section className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <div className="flex border-r dark:border-white/10 border-black/25 pr-4">
            <Image
              src={`/images/${
                mode !== "dark" ? "jwd_dark.png" : "jwd_light.png"
              }`}
              alt="JWD"
              width={32}
              height={32}
              priority
              className="z-10"
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
