"use client";
import css from "@/styles/sections/Plans.module.css";
import Checkout from "@/components/shared/Checkout";
import SpinnerGrow from "@/components/shared/SpinnerGrow";
import { plans } from "@/constants/plans";
import { Typography, Switch, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Plan, PlanName } from "@/types/PlanData.d";
import { UserMetadata } from "@/types/UserData.d";
import { getPlanStatus } from "@/lib/utils/getPlanStatus";

export default function Plans() {
  const save = 0.4; // Save 40% on yearly plans
  const [yearly, setYearly] = useState<boolean>(false);
  const { user, isSignedIn, isLoaded } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setYearly(event.target.checked);
  };

  const userMeta = user?.publicMetadata as UserMetadata;
  const { userId, billing } = userMeta || {};

  useEffect(() => {
    const setBillingBtn = billing === "Yearly" ? true : false;
    setYearly(setBillingBtn);
  }, [billing]);

  if (!isLoaded) {
    return (
      <section className={css.section}>
        <div className="flex justify-center items-center min-h-[25vh]">
          <SpinnerGrow size="large" />
        </div>
      </section>
    );
  }

  return (
    <section className={css.section}>
      <div className={css.head}>
        <Typography variant="h2">
          {isSignedIn ? "Upgrade" : "Choose"} your plan
        </Typography>
        <Typography variant="body1">
          Select the plan that suits your needs!
        </Typography>

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
      </div>

      <div className={css.plans}>
        {plans.map((plan: Plan) => {
          const planFee =
            plan.price === 0
              ? plan.price
              : yearly
              ? Math.round(plan.price * 12 * (1 - save))
              : plan.price;

          const planStatus = getPlanStatus({
            plan,
            planFee,
            yearly,
            userMeta,
          });

          const { isIncluded, isCurrent, isPopular } = planStatus;

          return (
            <div
              key={plan.id}
              className={`${css.plan} ${
                isCurrent ? css.current : isPopular && css.highlight
              }`}
            >
              {(isPopular || isCurrent) && (
                <div className={css.planBadge}>
                  {isCurrent ? "Current" : "Popular"}
                </div>
              )}

              <div className={css.planTop}>
                <i className={`${plan.icon} mb-2 text-6xl`}></i>

                <div className={css.planTitle}>
                  <Typography
                    variant="h4"
                    sx={{
                      color:
                        isPopular || isCurrent
                          ? isCurrent
                            ? "var(--mui-palette-common-white)"
                            : "var(--mui-palette-tertiary-contrastText)"
                          : "var(--mui-palette-text-primary)",
                    }}
                  >
                    {plan.name}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1",
                      color:
                        isPopular || isCurrent
                          ? isCurrent
                            ? "var(--mui-palette-common-white)"
                            : "var(--mui-palette-tertiary-contrastText)"
                          : "var(--mui-palette-text-primary)",
                    }}
                  >
                    <span className="flex">
                      {plan.price !== 0 ? "$" + planFee : "Free"}
                    </span>

                    {plan.price !== 0 && (
                      <span className="flex text-sm opacity-80 self-end">
                        {yearly ? "/Yr" : "/Mo"}
                      </span>
                    )}
                  </Typography>
                </div>
                <div className={css.planDesc}>
                  <span className="flex">{plan.desc}</span>
                  {yearly && plan.price !== 0 && (
                    <span className="flex line-through">
                      ${plan.price * 12} /Yr
                    </span>
                  )}
                </div>
              </div>
              <div className={css.planFeatures}>
                {plan.inclusions.map((inclusion) => (
                  <div
                    key={plan.name + inclusion.label}
                    className={css.planFeaturesItem}
                  >
                    <i
                      className={`bi ${
                        inclusion.isIncluded ? "bi-check2" : "bi-x"
                      }`}
                    ></i>

                    <p>{inclusion.label}</p>
                  </div>
                ))}
              </div>

              {isSignedIn && (
                <div className={css.planActions}>
                  <Checkout
                    plan={{
                      id: plan.id as number,
                      billing: yearly ? "Yearly" : "Monthly",
                      name: plan.name as PlanName,
                      price: planFee as number,
                    }}
                    clerkUser={{
                      userId: userId as string,
                      clerkId: user.id as string,
                      username: user.username as string,
                      firstName: user.firstName as string,
                      lastName: user.lastName as string,
                      email: user.emailAddresses[0].emailAddress as string,
                    }}
                    btnName={
                      isIncluded
                        ? isCurrent
                          ? "Current"
                          : "Included"
                        : "Subscribe"
                    }
                    btnVariant={isPopular ? "contained" : "outlined"}
                    isDisabled={isIncluded}
                  />
                </div>
              )}
            </div>
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
            Subscribe now
          </Button>
        </div>
      )}
    </section>
  );
}
