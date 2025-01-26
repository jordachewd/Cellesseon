import PageWrapper from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cellesseon | Authentication",
  description: "Authentication page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper className="flex items-center justify-center">
      {children}
    </PageWrapper>
  );
}
