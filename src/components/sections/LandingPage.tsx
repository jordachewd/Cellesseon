import css from "@/styles/sections/LandingPage.module.css";
import { Button, Typography } from "@mui/material";
import Plans from "./Plans";
import Faqs from "./Faqs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <section className={css.wrapper} id="LandingPageWrapper">
      <div className={css.hero}>
        <div className={css.heroContent}>
          <div className={css.heroLeft}>
            <Typography variant="h2">
              Simplify tasks and boost productivity
            </Typography>

            <Typography variant="h6">
              Spark creativity, organize plans, and learn something new every
              day
            </Typography>

            <Button
              size="large"
              variant="outlined"
              href="/sign-up"
              sx={{ minWidth: 300 }}
            >
              Try it for free
            </Button>
          </div>

          <div className={css.heroRight}>
            <Image
              src="/images/lp-hero-image.png"
              alt="hero"
              width={700}
              height={700}
              priority
              className="z-10"
            />

            <div className={css.heroShadow}>&nbsp;</div>
          </div>
        </div>
      </div>

      <Plans />
      <Faqs />
    </section>
  );
}
