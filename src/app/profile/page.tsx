"use client";
import css from "@/styles/shared/Plans.module.css";
import InnerPage from "@/components/layout/InnerPage";
import { useUser } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import SpinnerGrow from "@/components/shared/SpinnerGrow";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();


  return (
    <InnerPage>
      <section className={css.section}>
        {isLoaded ? (
          <>
            <div className={css.head}>
              <Typography variant="h2">My profile</Typography>
            </div>
            <div className="flex w-full">
              <Typography variant="h6"> {user?.username}</Typography>
            </div>
          </>
        ) : (
          <div className={css.head}>
            <SpinnerGrow />
          </div>
        )}
      </section>
    </InnerPage>
  );
}
