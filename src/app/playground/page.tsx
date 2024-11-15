import css from "./playground.module.css";
import Header from "@/components/layout/Header";
import PageWrapper from "@/components/layout/PageWrapper";
import ImageVariation from "@/components/test/ImageVariation";

export default function PlayGroundPage() {
  return (
    <PageWrapper>
      <Header />

      <section className={css.section}>
        <ImageVariation />
      </section>
    </PageWrapper>
  );
}
