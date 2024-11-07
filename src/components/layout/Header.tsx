import css from "./Header.module.css";
import Logo from "../shared/Logo";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <section className={css.section}>
      <div className={css.left}>
        <Logo size="h4" />
      </div>
      <div className={css.right}>
      <UserButton showName />
      </div>
    </section>
  );
}
