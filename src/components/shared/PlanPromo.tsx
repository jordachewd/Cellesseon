import css from "@/styles/shared/PlanPromo.module.css";
import { Button, Typography } from "@mui/material";
import { getPlanIcon } from "@/constants/plans";
import { PlanData, PlanName } from "@/types/PlanData.d";

import PlanCountDown from "./PlanCountDown";

// import getFormattedDate from "@/lib/utils/getFormattedDate";

interface PlanPromoProps {
  userPlan: PlanData;
}

export default function PlanPromo({ userPlan }: PlanPromoProps) {
  if (!userPlan) return null;

  const { id, name, expiresOn, billing } = userPlan;
  const isLite = Number(id) === 0;
  //  const isPro = Number(id) === 1;
  //  const isProFull = isPro && name === "Pro";
  const isPremium = Number(id) === 2 && billing === "Yearly";
  const isPremiumFull = isPremium && name === "Premium";

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
                endDate={expiresOn as Date}
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
          <i className={`${getPlanIcon(name as PlanName)} text-3xl`}></i>
          <span>{name}</span>
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
