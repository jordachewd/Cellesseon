"use client";
import Logo from "../shared/Logo";
import css from "@/styles/sections/LandingPage.module.css";
import { Button, Typography } from "@mui/material";
import ToggleMode from "../shared/ToggleMode";

export default function LandingPage() {
  return (
    <section className={css.section}>
      <div className={css.head}>
        <Logo width={280} height={70} />
      </div>

      <div className={css.intro}>
        <Typography variant="h3">
          Unleash your ideas, simplify tasks, and get more done effortlessly.
        </Typography>

        <Typography variant="body1">
          Start chatting with <b>Celeseon</b> to spark creativity, organize
          plans, and learn something new every day.
        </Typography>

        <Typography variant="h6">
          Your smart assistant is here to make it all easy!
        </Typography>
      </div>

      <div className={css.actions}>
        <Button
          size="large"
          variant="outlined"
          href="/plans"
          className="!px-16"
        >
          Get Started
        </Button>
        <Button size="small" href="/sign-in" className="!px-10">
          Login
        </Button>
      </div>
      <div className={css.actions}>
        <h4>Theme Mode</h4>
        <ToggleMode />
      </div>
    </section>
  );
}
