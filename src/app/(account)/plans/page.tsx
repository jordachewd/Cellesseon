"use client";
import Faqs from "@/components/sections/Faqs";
import Plans from "@/components/sections/Plans";
import Header from "@/components/layout/Header";
import InnerPage from "@/components/layout/InnerPage";
import { useAccountContext } from "@/context/AccountContext";

export default function PlansPage() {
  const { userData } = useAccountContext();

  return (
    <>
      <Header />
      <InnerPage>
        <Plans userData={userData} hasLoader />
        <Faqs />
      </InnerPage>
    </>
  );
}
