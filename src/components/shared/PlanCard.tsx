import css from "@/styles/shared/PlanCard.module.css";
import { getPlanStatus } from "@/lib/utils/getPlanStatus";
import { Plan, PlanData, PlanStatus } from "@/types/PlanData.d";
import { Typography } from "@mui/material";
import { UserData } from "@/types/UserData.d";
import Checkout from "@/components/shared/Checkout";

interface PlanCardProps {
  plan: Plan;
  yearly: boolean;
  userData?: UserData;
  save?: number;
}

export default function PlanCard({
  plan,
  yearly,
  userData,
  save = 0,
}: PlanCardProps) {
  const hasUserData = userData && Object.keys(userData).length > 0;
  
  const { _id, clerkId, username, firstName, lastName, email } = userData || {};

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
    userPlan: userData?.plan as PlanData,
  });

  const { isCurrent, isPopular } = planStatus as PlanStatus;

  return (
    <div
      className={`${css.wrapper} ${
        isCurrent ? css.current : isPopular && css.popular
      }`}
    >
      {(isPopular || isCurrent) && (
        <div className={css.planBadge}>{isCurrent ? "Current" : "Popular"}</div>
      )}

      <div className={css.head}>
        <i className={`${plan.icon} text-7xl`}></i>

        <div className={css.title}>
          <Typography
            variant="h4"
            sx={{
              color:
                isPopular || isCurrent
                  ? isPopular
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
                  ? isPopular
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
        <div className={css.subtitle}>
          <span className="flex">{plan.desc}</span>
          {yearly && plan.price !== 0 && (
            <span className="flex line-through">${plan.price * 12} /Yr</span>
          )}
        </div>
      </div>
      <div className={css.features}>
        {plan.inclusions.map((incl) => (
          <div key={plan.name + incl.label} className={css.feature}>
            <i className={`bi ${incl.isIncluded ? "bi-check2" : "bi-x"}`}></i>
            <p>{incl.label}</p>
          </div>
        ))}
      </div>

      {hasUserData && (
        <div className={css.actions}>
          <Checkout
            plan={{
              id: plan.id,
              billing: yearly ? "Yearly" : "Monthly",
              name: plan.name,
              price: planFee,
            }}
            planStatus={planStatus}
            clerkUser={{
              userId: _id || "",
              clerkId: clerkId || "",
              username: username || "",
              firstName: firstName,
              lastName: lastName,
              email: email,
            }}
          />
        </div>
      )}
    </div>
  );
}
