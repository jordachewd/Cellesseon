import type { Metadata, Viewport } from "next";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ChatContextProvider } from "@/context/ChatContext";
import PageWrapper from "@/components/layout/PageWrapper";
import LandingPage from "@/components/sections/LandingPage";
import MainPage from "@/components/sections/MainPage";

export const metadata: Metadata = {
  title: "Celeseon Smart Assistent",
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
      {/* Separate Context for the LandingPage if needed */}
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <ChatContextProvider>
        <SignedIn>
          <MainPage />
        </SignedIn>
      </ChatContextProvider>
    </PageWrapper>
  );
}
