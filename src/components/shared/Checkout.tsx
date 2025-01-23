"use client";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutPlan } from "@/lib/actions/transaction.action";
import { CheckoutTransactionParams } from "@/types/TransactionData.d";
import { ClerkUserData } from "@/types/TaskData.d";
import { CheckoutPlanParams } from "@/types/PlanData.d";
import { PlanStatus } from "@/lib/utils/getPlanStatus";

interface CheckoutProps {
  plan: CheckoutPlanParams;
  clerkUser: ClerkUserData;
  planStatus: PlanStatus;
}

const Checkout = ({
  plan,

  planStatus,
  clerkUser,
}: CheckoutProps) => {
  useEffect(() => {
    loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY!}`);
  }, []);

  const { isIncluded, isCurrent, isPopular } = planStatus as PlanStatus;

  const onCheckout = async () => {
    const transaction: CheckoutTransactionParams = {
      user: clerkUser,
      plan,
    };

    await checkoutPlan(transaction);
  };

  return (
    <form action={onCheckout}>
      <Button
        role="link"
        type="submit"
        disabled={isIncluded}
        sx={{
          minWidth: 220,
          ...(isPopular
            ? {
                color: "var(--mui-palette-common-white)",
                borderColor: "var(--mui-palette-common-white)",
                "&:hover": {
                  color: "rgba(var(--mui-palette-error-contrastTextChannel) / 0.75)!important",
                  borderColor:
                    "rgba(var(--mui-palette-error-contrastTextChannel) / 0.75)",
                },
              }
            : {}),
          "&.Mui-disabled": {
            color: isCurrent
              ? "rgba(var(--mui-palette-tertiary-contrastTextChannel) / 0.5)"
              : "rgba(var(--mui-palette-tertiary-mainChannel) / 0.5)",
          },
        }}
        variant={
          (isPopular && "outlined") || (isIncluded && "text") || "outlined"
        }
      >
        {(isCurrent && "Current") || (isIncluded && "Included") || "Subscribe"}
      </Button>
    </form>
  );
};

export default Checkout;
