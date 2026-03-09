import Header from "@/components/layout/app-header";
import Footer from "@/components/layout/app-footer";
import LandingPage from "@/components/sections/landing-page";

export default async function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
