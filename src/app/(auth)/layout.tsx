import css from "./layout.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celeseon | Sign In",
  description: "Authentication page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={css.section}>
      <div className={css.wrapper}>{children}</div>
      <div className={css.background}></div>
    </main>
  );
}
