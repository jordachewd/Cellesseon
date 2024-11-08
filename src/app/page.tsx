import { SignedIn, SignedOut } from "@clerk/nextjs";
import PageWrapper from "@/components/layout/PageWrapper";
import LandingPage from "@/components/sections/LandingPage";
import ChatPage from "@/components/sections/ChatPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celeseon Smart Assistent",
};

export default function Home() {
  return (
    <PageWrapper>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <ChatPage />
      </SignedIn>
    </PageWrapper>
  );
}
