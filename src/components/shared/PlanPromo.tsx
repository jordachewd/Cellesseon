"use client";
import css from "@/styles/shared/PlanPromo.module.css";
import { Button, Typography } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { getPlanIcon } from "@/constants/plans";
import { PlanName } from "@/types/PlanData.d";
import SpinnerGrow from "./SpinnerGrow";
import { UserMetadata } from "@/types/UserData.d";
import PlanCountDown from "./PlanCountDown";
// import getFormattedDate from "@/lib/utils/getFormattedDate";

export default function PlanPromo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div
        className={`${css.wrapper} min-h-[158px] items-center justify-center`}
      >
        <SpinnerGrow />
      </div>
    );
  }

  const userMeta = user?.publicMetadata as UserMetadata;
  if (!userMeta) return null;
  //  console.log("userMeta: ", userMeta, !userMeta ? true : false);

  const { planId, planName, planExpiresOn } = userMeta || {};
  const isLite = Number(planId) === 0;
  //  const isPro = Number(planId) === 1;
  //  const isProFull = isPro && planName === "Pro";
  const isPremium = Number(planId) === 2;
  const isPremiumFull = isPremium && planName === "Premium";

  /*   const testTime = new Date("2025-01-24T05:40:00.332Z");

  console.log("testTime: ", getFormattedDate(testTime)); */

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <div className={css.badge}>
          {isLite && <span className={css.badgeLabel}>Expires in:</span>}
          <span className={`${css.badgeValue} ${isLite && "min-w-[82px]"}`}>
            {isLite ? (
              <PlanCountDown
                endDate={planExpiresOn as Date}
                //  endDate={testTime as Date}
                className="flex justify-center"
              />
            ) : (
              "Your plan"
            )}
          </span>
        </div>

        <Typography
          variant="h6"
          sx={{
            color: "var(--mui-palette-tertiary-contrastText)",
            textTransform: "capitalize",
            alignItems: "center",
            display: "flex",
            gap: "1rem",
          }}
        >
          <i className={`${getPlanIcon(planName as PlanName)} text-3xl`}></i>
          <span>{planName}</span>
        </Typography>

        {!isPremiumFull && (
          <>
            <div className={css.details}>
              Unlock premium features with an upgrade!
            </div>
            <Button
              size="small"
              href="/plans"
              variant="contained"
              className="sizeSmall"
            >
              Upgrade now
            </Button>
          </>
        )}
      </div>

      <div className={css.background}></div>
    </div>
  );
}
