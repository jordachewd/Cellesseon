import Header from "@/components/layout/Header";
import InnerPage from "@/components/layout/InnerPage";
import ProfileBilling from "@/components/sections/ProfileBilling";
import ProfileHero from "@/components/sections/ProfileHero";
import LoadingPage from "@/components/shared/LoadingPage";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return <LoadingPage />;
  }

  const userData: UserData = await getUserById(userId);

  return (
    <>
      <Header />
      <InnerPage>
        <ProfileHero userData={userData} />
        <ProfileBilling userData={userData} />
      </InnerPage>
    </>
  );
}
