import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/sections/LandingPage";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWrapper from "@/components/chat/ChatWrapper";
import PageWrapper from "@/components/layout/PageWrapper";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";

export default async function Home() {
  const { userId } = await auth();
  const userData = userId
    ? ((await getUserById(userId)) as UserData | null)
    : null;

  return userId ? (
    <PageWrapper id="ChatPageWrapper" className="flex-row!">
      <ChatSidebar userPlan={userData?.plan || null} />
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
