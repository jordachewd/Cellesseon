import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/sections/LandingPage";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ChatWrapper from "@/components/chat/ChatWrapper";
import AlertMessage from "@/components/shared/AlertMessage";

export default async function Home() {
  const { userId } = await auth();
  let userData: UserData | undefined = undefined;

  if (userId) {
    const getUserData = await getUserById(userId);
    userData = getUserData.user;
  }

  // console.log("userData:", userData);

  return (
    <>
      <SignedOut>
        <Header />
        <LandingPage />
        <Footer />
      </SignedOut>

      <SignedIn>
        {!userData && (
          <AlertMessage
            message={{
              title: "Error getting user data!",
              text: `User does not exist!`,
            }}
          />
        )}

        {userId && userData ? (
          <ChatWrapper userData={userData} />
        ) : (
          <LoadingBubbles wrapped />
        )}
      </SignedIn>
    </>
  );
}
