import Faqs from "@/components/sections/Faqs";
import Plans from "@/components/sections/Plans";
import InnerPage from "@/components/layout/InnerPage";
import Header from "@/components/layout/Header";
import LoadingPage from "@/components/shared/LoadingPage";
import { UserData } from "@/types/UserData.d";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

export default async function PlansPage() {
  const { userId } = await auth();

  if (!userId) {
    return <LoadingPage />;
  }

  const userData: UserData = await getUserById(userId);

  return (
    <>
      <Header />
      <InnerPage>
        <Plans userData={userData} />
        <Faqs />
      </InnerPage>
    </>
  );
}
