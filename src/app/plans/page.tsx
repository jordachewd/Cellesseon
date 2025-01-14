"use client";
import css from "@/styles/sections/Plans.module.css";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button, IconButton, Switch, Typography } from "@mui/material";
import { plans } from "@/constants/plans";
import { useRouter } from "next/navigation";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { useState } from "react";
import Faqs from "@/components/shared/Faqs";
import Checkout from "@/components/shared/Checkout";
import SpinnerGrow from "@/components/shared/SpinnerGrow";

export default function PlansPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [yearly, setYearly] = useState(false);
  const save = 0.4; // Save 40% on yearly plans
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearly(event.target.checked);
  };

  if (!isLoaded || !user) {
    return (
      <div className="flex">
        <SpinnerGrow />
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <TooltipArrow
        placement="right"
        title="Back to previous page"
        className="!transition-all"
      >
        <IconButton
          size="small"
          onClick={() => router.back()}
          className={css.backBtn}
        >
          <i className="bi bi-arrow-90deg-left"></i>
        </IconButton>
      </TooltipArrow>

      <section className={css.section}>
        <div className={css.head}>
          <Typography variant="h2">Choose a plan</Typography>
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
            <span className={css.bubble}>Save {save * 100}%+</span>
          </div>
        </div>

        <div className={css.plans}>
          {plans.map((plan) => {
            const planFee =
              plan.price === 0
                ? plan.price
                : yearly
                ? Math.round(plan.price * 12 * (1 - save))
                : plan.price;

            return (
              <div
                key={plan._id}
                className={`${css.plan} ${plan.highlight && css.highlight}`}
              >
                {plan.highlight && <div className={css.planBadge}>Popular</div>}

                <div className={css.planTop}>
                  <i
                    className={`bi ${plan.icon} mb-2 ${
                      plan.highlight
                        ? "md:-mt-5 text-6xl md:text-7xl"
                        : "text-5xl"
                    }`}
                  ></i>

                  <div className={css.planTitle}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: plan.highlight
                          ? "var(--mui-palette-tertiary-contrastText)"
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
                        color: plan.highlight
                          ? "var(--mui-palette-tertiary-contrastText)"
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
                <div className={css.planActions}>
                  <SignedOut>
                    <Button
                      href="/sign-up"
                      sx={{ minWidth: "200px" }}
                      variant={plan.highlight ? "contained" : "outlined"}
                    >
                      {plan.price === 0 ? "Try Now" : "Go " + plan.name}
                    </Button>
                  </SignedOut>

                  <SignedIn>
                    <Checkout
                      plan={plan.name}
                      amount={planFee}
                      userId={user.id}
                      isDisabled={plan.price === 0}
                      btnName={plan.price === 0 ? "Current Plan" : "Upgrade"}
                      btnVariant={plan.highlight ? "contained" : "outlined"}
                    />
                  </SignedIn>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Faqs />
    </div>
  );
}
