import css from "./Header.module.css";
import Logo from "../shared/Logo";
import { Avatar, Typography } from "@mui/material";

export default function Header() {
  return (
    <section className={css.section}>
      <div className={css.left}>
        <Logo size="h4" />
      </div>
      <div className={css.right}>
        <Typography>Auth User</Typography>
        <Avatar alt="Auth User" sx={{ width: 32, height: 32 }} />
      </div>
    </section>
  );
}
