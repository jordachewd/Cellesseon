import Faqs from "@/components/sections/Faqs";
import Plans from "@/components/sections/Plans";
import Header from "@/components/layout/Header";
import InnerPage from "@/components/layout/InnerPage";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import { auth } from "@clerk/nextjs/server";

export default async function PlansPage() {
  const { userId } = await auth();
  let userData: UserData | undefined = undefined;

  if (userId) {
    userData = await getUserById(userId);
  }

  return (
    <>
      <Header isSignedIn />
      <InnerPage>
        {userData ? (
          <>
            <Plans userData={userData} hasLoader />
            <Faqs />
          </>
        ) : (
          <div className="flex justify-center items-center h-dvh">
            <LoadingBubbles />
          </div>
        )}
      </InnerPage>
    </>
  );
}
