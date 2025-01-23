import css from "@/styles/shared/LoadingPage.module.css";
import SpinnerGrow from "./SpinnerGrow";

interface LoadingPageProps {
  className?: string;
}

export default function LoadingPage({
  className = css.section,
}: LoadingPageProps) {
  return (
    <section className={className}>
      <div className={css.wrapper}>
        <SpinnerGrow size="large" />
      </div>
    </section>
  );
}
