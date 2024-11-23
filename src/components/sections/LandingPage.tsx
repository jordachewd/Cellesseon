"use client";
import theme from "@/theme";
import Logo from "../shared/Logo";
import css from "./LandingPage.module.css";
import { Button, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LandingPage() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <section className={css.section}>
        <div className={css.head}>
          <Logo width={280} height={70} />
        </div>

        <div className={css.intro}>
          <Typography variant={`${isMobile ? "h5" : "h4"}`}>
            Unleash your ideas, simplify tasks, and get more done effortlessly.
          </Typography>

          <Typography variant="subtitle2">
            Start chatting with <b>Celeseon</b> to spark creativity, organize
            plans, and learn something new every day. Your smart assistant is
            here to make it all easy!
          </Typography>
        </div>

        <div className={css.actions}>
          <Button size="large" href="/sign-in">
            Login
          </Button>
        </div>
      </section>
      <div className={css.background}></div>
    </>
  );
}
