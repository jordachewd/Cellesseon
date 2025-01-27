import { SignedIn, SignedOut } from "@clerk/nextjs";
import MainWrapper from "@/components/layout/MainWrapper";
import LandingPage from "@/components/sections/LandingPage";
import MainPage from "@/components/sections/MainPage";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  let userData: UserData | undefined = undefined;

  if (userId) {
    userData = await getUserById(userId);
  }

  return (
    <MainWrapper>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        {userData ? (
          <MainPage userData={userData} />
        ) : (
          <div className="flex justify-center items-center h-dvh">
            <LoadingBubbles />
          </div>
        )}
      </SignedIn>
    </MainWrapper>
  );
}
