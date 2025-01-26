"use client";
import Faqs from "@/components/sections/Faqs";
import Plans from "@/components/sections/Plans";
import Header from "@/components/layout/Header";
import InnerPage from "@/components/layout/InnerPage";
import { useAccountContext } from "@/context/AccountContext";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

export default function PlansPage() {
  const { userData } = useAccountContext();

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
          <div className="flex justify-center items-center h-96">
            <LoadingBubbles />
          </div>
        )}
      </InnerPage>
    </>
  );
}
