import Header from "@/components/layout/app-header";
import Footer from "@/components/layout/app-footer";
import LandingPage from "@/components/sections/landing-page";
import ChatSidebar from "@/components/chat/chat-sidebar";
import ChatWrapper from "@/components/chat/chat-wrapper";
import PageWrapper from "@/components/layout/page-wrapper";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";

export default async function Home() {
  const { userId } = await auth();
  const userData = userId
    ? ((await getUserById(userId)) as UserData | null)
    : null;

  return userId ? (
    <PageWrapper id="ChatPageWrapper" className="!flex-row">
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
