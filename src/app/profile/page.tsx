import InnerPage from "@/components/layout/InnerPage";
import ProfileBilling from "@/components/sections/ProfileBilling";
import ProfileHero from "@/components/sections/ProfileHero";

export default async function ProfilePage() {
  return (
    <InnerPage>
      <ProfileHero />
      <ProfileBilling />
    </InnerPage>
  );
}
