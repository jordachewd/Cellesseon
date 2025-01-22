import Header from "@/components/layout/Header";
import InnerPage from "@/components/layout/InnerPage";
import ProfileBilling from "@/components/sections/ProfileBilling";
import ProfileHero from "@/components/sections/ProfileHero";

export default async function ProfilePage() {
  return (
    <>
      <Header />
      <InnerPage>
        <ProfileHero />
        <ProfileBilling />
      </InnerPage>
    </>
  );
}
