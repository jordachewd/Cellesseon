import css from "@/styles/sections/LandingPage.module.css";
import { Typography } from "@mui/material";
import Plans from "../shared/Plans";
import Header from "../layout/Header";
import Faqs from "../shared/Faqs";

export default function LandingPage() {
  return (
    <>
      <Header />
      <section className={css.wrapper}>
        <section className={css.hero}>
          <div className={css.intro}>
            <Typography variant="h3">
              Unleash your ideas, simplify tasks, and get more done
              effortlessly.
            </Typography>

            <Typography variant="body1">
              Start chatting with <b>Celeseon</b> to spark creativity, organize
              plans, and learn something new every day.
            </Typography>

            <Typography variant="h6">
              Your smart assistant is here to make it all easy!
            </Typography>
          </div>
        </section>

        <Plans />
        <Faqs />
      </section>
    </>
  );
}
