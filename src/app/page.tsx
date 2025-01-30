import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/sections/LandingPage";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWrapper from "@/components/chat/ChatWrapper";
import PageWrapper from "@/components/layout/PageWrapper";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return userId ? (
    <PageWrapper id="ChatPageWrapper" className="!flex-row">
      <ChatSidebar />
      <ChatWrapper />
    </PageWrapper>
  ) : (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
