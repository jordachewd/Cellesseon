import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for Cellesseon",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/");
  }
  return <PageWrapper>{children}</PageWrapper>;
}
