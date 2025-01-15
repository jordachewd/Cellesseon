import css from "@/styles/sections/LandingPage.module.css";
import { Button, Typography } from "@mui/material";
import Plans from "../shared/Plans";
import Header from "../layout/Header";
import Faqs from "../shared/Faqs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <Header />
      <section className={css.wrapper}>
        <section className={css.hero}>
          <div className={css.heroContent}>
            <div className={css.heroLeft}>
              <Typography variant="h2">
                Simplify tasks and boost productivity.
              </Typography>

              <Typography variant="subtitle2">
                Spark creativity, organize plans, and learn something new every
                day.
              </Typography>

              <Typography variant="h6">
                Your smart assistant is here to make it all easy!
              </Typography>

              <Button size="large" variant="outlined" href="/sign-up" sx={{ minWidth: 300 }}>
                Try it for free
              </Button>
            </div>

            <div className={css.heroRight}>
              <Image
                src="/images/lp-hero-image.png"
                alt="hero"
                layout="responsive"
                width={700}
                height={475}
                priority
              />
            </div>
          </div>
        </section>

        <Plans />
        <Faqs />
      </section>
    </>
  );
}
