import css from "@/styles/shared/PlanCard.module.css";
import { getPlanStatus, PlanStatus } from "@/lib/utils/getPlanStatus";
import Checkout from "@/components/shared/Checkout";
import { Plan, PlanName } from "@/types/PlanData.d";
import { Typography } from "@mui/material";
import { UserResource } from "@clerk/types";
import { UserMetadata } from "@/types/UserData.d";

interface PlanCardProps {
  plan: Plan;
  yearly: boolean;
  user: UserResource | null;
  userMeta: UserMetadata;
  showBtn?: boolean;
  save?: number;
}

export default function PlanCard({
  plan,
  yearly,
  user,
  userMeta,
  showBtn = true,
  save = 0,
}: PlanCardProps) {
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

      {showBtn && (
        <div className={css.actions}>
          <Checkout
            plan={{
              id: plan.id as number,
              billing: yearly ? "Yearly" : "Monthly",
              name: plan.name as PlanName,
              price: planFee as number,
            }}
            planStatus={planStatus}
            clerkUser={{
              userId: userMeta.userId as string,
              clerkId: user?.id as string,
              username: user?.username as string,
              firstName: user?.firstName as string,
              lastName: user?.lastName as string,
              email: user?.emailAddresses[0].emailAddress as string,
            }}
          />
        </div>
      )}
    </div>
  );
}
