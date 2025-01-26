"use client";
import Header from "@/components/layout/Header";
import InnerPage from "@/components/layout/InnerPage";
import ProfileBilling from "@/components/sections/ProfileBilling";
import ProfileHero from "@/components/sections/ProfileHero";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { useAccountContext } from "@/context/AccountContext";

export default function ProfilePage() {
  const { userData } = useAccountContext();

  return (
    <>
      <Header />
      <InnerPage>
        {userData ? (
          <>
            <ProfileHero userData={userData} />
            <ProfileBilling userData={userData} />
          </>
        ) : (
          <div className="flex justify-center items-center h-96">
            <LoadingBubbles />
          </div>
        )}
      </InnerPage>
    </>
  );
}
