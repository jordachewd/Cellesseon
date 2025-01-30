import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/sections/LandingPage";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import { auth } from "@clerk/nextjs/server";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWrapper from "@/components/chat/ChatWrapper";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function Home() {
  const { userId } = await auth();
  let userData: UserData | null = null;

  if (userId) {
    userData = await getUserById(userId);
  }

  return userId && userData ? (
    <PageWrapper id="ChatPageWrapper" className="!flex-row">
      <ChatSidebar userData={userData} />
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
