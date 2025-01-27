import PageWrapper from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for Cellesseon",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper className="flex items-center justify-center">
      {children}
    </PageWrapper>
  );
}
