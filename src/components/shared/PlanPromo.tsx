"use client";
import css from "@/styles/shared/PlanPromo.module.css";
import { Button, Typography } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { getPlanIcon } from "@/constants/plans";
import { PlanName } from "@/types/PlanData.d";
import SpinnerGrow from "./SpinnerGrow";
import { UserMetadata } from "@/types/UserData.d";
import PlanCountDown from "./PlanCountDown";

export default function PlanPromo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div
        className={`${css.wrapper} min-h-[162px] items-center justify-center`}
      >
        <SpinnerGrow />
      </div>
    );
  }

  console.log(user?.publicMetadata);
  const userMeta = user?.publicMetadata as UserMetadata;
  const { planId, planName, planExpiresOn } = userMeta || {};
  const isLitePlan = Number(planId) === 0;

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <div className={css.badge}>
          {isLitePlan && <span className={css.badgeLabel}>Expires in:</span>}
          <span className={`${css.badgeValue} ${isLitePlan && "min-w-[82px]"}`}>
            {isLitePlan ? (
              <PlanCountDown
                endDate={planExpiresOn as Date}
                className="flex justify-center"
              />
            ) : (
              "Your plan"
            )}
          </span>
        </div>

        <Typography
          variant="h5"
          sx={{
            color: "var(--mui-palette-tertiary-contrastText)",
            trasnsition: "all 150ms",
            textTransform: "capitalize",
            alignItems: "center",
            display: "flex",
            gap: "1rem",
          }}
        >
          <i className={`${getPlanIcon(planName as PlanName)} text-4xl`}></i>
          <span>{planName}</span>
        </Typography>

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
      </div>

      <div className={css.background}></div>
    </div>
  );
}
