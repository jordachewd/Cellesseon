"use client";
import Logo from "../shared/Logo";
import css from "./LandingPage.module.css";
import { Button, Typography } from "@mui/material";
import ThemeSwitch from "../shared/ThemeSwitch";

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

{/*       <div className={`${css.actions} !flex-row space-x-6 justify-center`}>
        <Button size="small">Login</Button>
        <Button>Login</Button>
        <Button size="large">Login</Button>
      </div>

      <div className={`${css.actions} !flex-row space-x-6 justify-center`}>
        <Button size="small" variant="outlined">
          Login
        </Button>
        <Button variant="outlined">Login</Button>
        <Button size="large" variant="outlined">
          Login
        </Button>
      </div>
      <div className={`${css.actions} !flex-row space-x-6 justify-center`}>
        <Button size="small" variant="contained">
          Login
        </Button>
        <Button variant="contained">Login</Button>
        <Button size="large" variant="contained">
          Login
        </Button>
      </div> */}

      <div className={css.actions}>
        <Button
          size="large"
          variant="contained"
          href="/sign-in"
          className="!px-20"
        >
          Login
        </Button>
      </div>

      <div className={`${css.actions} !animate-delay-[900ms]`}>
        <ThemeSwitch />
      </div>
    </section>
  );
}
