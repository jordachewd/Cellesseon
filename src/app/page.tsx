import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/sections/LandingPage";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ChatWrapper from "@/components/chat/ChatWrapper";

export default async function Home() {
  const { userId } = await auth();
  let userData: UserData | undefined = undefined;

//  console.log("await auth() : ", await auth());

  if (userId) {
    userData = await getUserById(userId);
  }

 // console.log("Home userId, userData: ", { userId, userData });

  return (
    <>
      <SignedOut>
        <Header />
        <LandingPage />
        <Footer />
      </SignedOut>

      <SignedIn>
        {userId && userData ? (
          <ChatWrapper userData={userData} />
        ) : (
          <LoadingBubbles wrapped />
        )}
      </SignedIn>
    </>
  );
}
