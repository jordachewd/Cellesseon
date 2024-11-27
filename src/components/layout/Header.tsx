"use client";
import css from "./Header.module.css";
import Logo from "../shared/Logo";
import AvatarMenu from "../shared/AvatarMenu";

export default function Header() {
  return (
    <section className={css.section}>
      <Logo />
      <AvatarMenu />
    </section>
  );
}
