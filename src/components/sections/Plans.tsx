"use client";
import css from "@/styles/sections/Plans.module.css";
import { plans } from "@/constants/plans";
import { Switch, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Plan } from "@/types/PlanData.d";
import { UserData } from "@/types/UserData.d";
import PageHead from "../layout/PageHead";
import PlanCard from "@/components/shared/PlanCard";
import LoadingBubbles from "../shared/LoadingBubbles";

interface PlansProps {
  userData?: UserData | null;
  hasLoader?: boolean;
}

export default function Plans({ userData, hasLoader = false }: PlansProps) {
  const save = 0.4; // Save 40% on Yearly plans
  const { isSignedIn } = useUser();
  const [yearly, setYearly] = useState<boolean>(false);
  const billing = userData?.plan?.billing;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setYearly(event.target.checked);
  };

  useEffect(() => {
    const setBilling = billing === "Yearly" ? true : false;
    setYearly(setBilling);
  }, [billing]);

  const cssMonthly = !yearly ? css.switched : "";
  const cssYearly = yearly ? css.switched : "";

  if (hasLoader && !userData)
    return (
      <div className={css.loader}>
        <LoadingBubbles />
      </div>
    );

  return (
    <div className={css.section}>
      <PageHead
        title={`${isSignedIn ? "Upgrade" : "Choose"} your plan`}
        subtitle="Select the plan that suits your needs!"
      >
        <div className={css.switch}>
          <p className={cssMonthly}>Monthly</p>
          <Switch
            checked={yearly}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p className={cssYearly}>Yearly</p>
          <span className={css.bubble}>Save {save * 100}%</span>
        </div>
      </PageHead>

      <div className={css.plans}>
        {plans.map((plan: Plan) => {
          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              yearly={yearly}
              userData={userData}
              save={save}
            />
          );
        })}
      </div>

      {!isSignedIn && (
        <div className={css.planActions}>
          <Button
            size="large"
            variant="outlined"
            href="/sign-up"
            sx={{ minWidth: 280, marginTop: "1rem" }}
          >
            Subscribe Now
          </Button>
        </div>
      )}
    </div>
  );
}
