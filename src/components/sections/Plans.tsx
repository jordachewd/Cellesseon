"use client";
import css from "@/styles/sections/Plans.module.css";
import { plans } from "@/constants/plans";
import { Switch, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Plan } from "@/types/PlanData.d";
import { UserMetadata } from "@/types/UserData.d";
import LoadingPage from "../shared/LoadingPage";
import PageHead from "../layout/PageHead";
import PlanCard from "@/components/shared/PlanCard";

export default function Plans() {
  const save = 0.4; // Save 40% on Yearly plans
  const [yearly, setYearly] = useState<boolean>(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const userMeta = user?.publicMetadata as UserMetadata;
  const { billing } = userMeta || {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setYearly(event.target.checked);
  };

  useEffect(() => {
    const setBilling = billing === "Yearly" ? true : false;
    setYearly(setBilling);
  }, [billing]);

  if (!isLoaded) {
    return <LoadingPage />;
  }

  return (
    <section className={css.section}>
      <PageHead
        title={`${isSignedIn ? "Upgrade" : "Choose"} your plan`}
        subtitle="Select the plan that suits your needs!"
      >
        <div className={css.switch}>
          <p className={`${!yearly && css.switched}`}>Monthly</p>
          <Switch
            checked={yearly}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p className={`${yearly && css.switched}`}>Yearly</p>
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
              user={user}
              userMeta={userMeta}
              showBtn={isSignedIn}
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
    </section>
  );
}
