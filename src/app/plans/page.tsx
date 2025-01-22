import Faqs from "@/components/sections/Faqs";
import Plans from "@/components/sections/Plans";
import InnerPage from "@/components/layout/InnerPage";
import Header from "@/components/layout/Header";

export default function PlansPage() {
  return (
    <>
      <Header />
      <InnerPage>
        <Plans />
        <Faqs />
      </InnerPage>
    </>
  );
}
