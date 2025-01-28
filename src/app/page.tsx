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
  let userId;
  let userData: UserData | undefined = undefined;
  let error: string | null = null;

  try {
    const authResult = await auth();
    userId = authResult.userId;

    if (userId) {
      const getUserData = await getUserById(userId);
      userData = getUserData.user;
    }
  } catch (err) {
    error = String(err);
  }

  return (
    <>
      <SignedOut>
        <Header />
        <LandingPage />
        <Footer />
      </SignedOut>

      <SignedIn>
        {error ? (
          <>
            <AlertMessage
              message={{
                title: error,
                text: "Please try again later.",
              }}
            />
            <div className="flex justify-center items-center h-dvh z-10 text-2xl">
              <SignOutButton />
            </div>
          </>
        ) : userId && userData ? (
          <ChatWrapper userData={userData} />
        ) : (
          <LoadingBubbles wrapped />
        )}
      </SignedIn>
    </>
  );
}
