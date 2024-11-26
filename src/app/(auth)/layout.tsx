import PageWrapper from "@/components/layout/PageWrapper";
import css from "./layout.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celeseon | Authentication",
  description: "Authentication page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <section className={css.section}>{children}</section>
    </PageWrapper>
  );
}
