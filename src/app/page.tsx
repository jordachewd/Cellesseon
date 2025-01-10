import type { Metadata, Viewport } from "next";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PageWrapper from "@/components/layout/PageWrapper";
import LandingPage from "@/components/sections/LandingPage";
import MainPage from "@/components/sections/MainPage";
import { ChatContextProvider } from "@/context/ChatContext";

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

export default function Home() {
  return (
    <PageWrapper>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <ChatContextProvider>
          <MainPage />
        </ChatContextProvider>
      </SignedIn>
    </PageWrapper>
  );
}
