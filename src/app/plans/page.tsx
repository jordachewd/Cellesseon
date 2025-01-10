"use client";
import css from "@/styles/pages/plans.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button, IconButton, Switch, Typography } from "@mui/material";
import { plans } from "@/constants/plans";
import { useRouter } from "next/navigation";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { useState } from "react";
import ToggleMode from "@/components/shared/ToggleMode";

export default function PlansPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const save = 0.3; // Save 30%
  const oddpricing = 0.99;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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

      <div className={css.section}>
        <div className={css.head}>
          <Typography variant="h3">Choose a plan</Typography>
          <Typography variant="body1">
            Select the plan that suits your needs!
          </Typography>

          <div className={css.switch}>
            <p className={`${!checked && css.switched}`}>Monthly</p>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={`${checked && css.switched}`}>Yearly</p>
            <span className={css.bubble}>Save {save * 100}%+</span>
          </div>
        </div>

        <div className={css.plans}>
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`${css.plan} ${plan.highlight && css.highlight}`}
            >
              <div className={css.planHead}>
                <Typography variant="h5">{plan.name}</Typography>
                <i className={`bi ${plan.icon} text-4xl`}></i>
                <Typography variant="h6">
                  $
                  {plan.price === 0
                    ? plan.price
                    : checked
                    ? Math.round(plan.price * 12 * (1 - save)) +
                      oddpricing +
                      " /yr"
                    : plan.price + oddpricing + " /mo"}
                </Typography>
              </div>

              <div className={css.inclusions}>
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <i
                      className={`bi ${
                        inclusion.isIncluded ? "bi-check2" : "bi-x"
                      }`}
                    ></i>

                    <p>{inclusion.label}</p>
                  </li>
                ))}
              </div>
              <SignedOut>
                <Button size="large" variant="contained" href="/sign-up">
                  Go {plan.name}
                </Button>
              </SignedOut>
              <SignedIn>
                {plan.name === "Free" ? (
                  <Button size="large" variant="outlined" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button size="large" variant="contained">
                    Get Started
                  </Button>
                )}
              </SignedIn>
            </div>
          ))}
        </div>
        <ToggleMode />
      </div>
    </div>
  );
}
