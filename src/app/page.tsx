import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import { SignOutButton } from "@clerk/nextjs";
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
        ) : !userData ? (
          <>
            <AlertMessage
              message={{
                title: "Error getting user data!",
                text: `User does not exist!`,
              }}
            />
            <div className="flex justify-center items-center h-dvh z-10 text-2xl" >
              <SignOutButton />
            </div>
          </>
        ) : (
          <LoadingBubbles wrapped />
        )}
      </SignedIn>
    </>
  );
}
