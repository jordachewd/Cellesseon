"use client";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import MainWrapper from "@/components/layout/MainWrapper";
import LandingPage from "@/components/sections/LandingPage";
import MainPage from "@/components/sections/MainPage";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import { useState, useEffect } from "react";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

export default function Home() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const getUserData = async (userId: string) => {
    if (!userId) return;
    const userData: UserData = await getUserById(userId);
    setUserData(userData);
  };

  useEffect(() => {
    if (user) {
      getUserData(user.id);
    }
  }, [user]);

  return (
    <MainWrapper>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        {userData ? (
          <MainPage userData={userData} />
        ) : (
          <div className="flex justify-center items-center h-dvh">
            <LoadingBubbles />
          </div>
        )}
      </SignedIn>
    </MainWrapper>
  );
}
