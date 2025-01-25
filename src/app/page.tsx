import type { Metadata, Viewport } from "next";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PageWrapper from "@/components/layout/PageWrapper";
import LandingPage from "@/components/sections/LandingPage";
import MainPage from "@/components/sections/MainPage";

export const metadata: Metadata = {
  title: "Cellesseon",
  description: "Cellesseon Smart Assistent",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function Home() {
  return (
    <PageWrapper>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <MainPage />
      </SignedIn>
    </PageWrapper>
  );
}
