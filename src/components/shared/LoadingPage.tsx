import css from "@/styles/shared/LoadingPage.module.css";
import LoadingBubbles from "./LoadingBubbles";

interface LoadingPageProps {
  className?: string;
}

export default function LoadingPage({
  className = css.section,
}: LoadingPageProps) {
  return (
    <section className={className}>
      <div className={css.wrapper}>
        <LoadingBubbles size="large" />
      </div>
    </section>
  );
}
