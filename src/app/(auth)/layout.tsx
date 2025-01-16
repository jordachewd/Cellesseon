import PageWrapper from "@/components/layout/PageWrapper";
import css from "@/styles/sections/MainPage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celeseon | Authentication",
  description: "Authentication page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <div className={css.wrapper}>
        <div className={`${css.section} `}>{children}</div>
      </div>
    </PageWrapper>
  );
}
