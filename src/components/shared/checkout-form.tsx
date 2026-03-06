"use client";
import { checkoutPlan } from "@/lib/actions/transaction.action";
import { CheckoutTransactionParams } from "@/types/TransactionData.d";
import { CheckoutPlanParams, PlanStatus } from "@/types/PlanData.d";
import { ClerkUserData } from "@/types/UserData.d";

interface CheckoutProps {
  plan: CheckoutPlanParams;
  clerkUser: ClerkUserData;
  planStatus: PlanStatus;
}

const Checkout = ({ plan, planStatus, clerkUser }: CheckoutProps) => {
  const { isIncluded, isCurrent, isPopular } = planStatus as PlanStatus;

  const onCheckout = async () => {
    const transaction: CheckoutTransactionParams = {
      user: clerkUser,
      plan,
    };

    await checkoutPlan(transaction);
  };

  const buttonVariant =
    (isPopular &&
      "btn-outlined border-white text-white hover:text-white/75 hover:border-white/75") ||
    (isIncluded && "btn-text border-transparent") ||
    "btn-outlined";

  const disabledStyle = isIncluded
    ? isCurrent
      ? "disabled:text-darkAccent-1000/50"
      : "disabled:text-lightAccent-700/50 dark:disabled:text-darkAccent-500/50"
    : "";

  return (
    <form action={onCheckout}>
      <button
        type="submit"
        disabled={isIncluded}
        className={`btn btn-md w-full min-w-[12rem] sm:min-w-[220px] ${buttonVariant} ${disabledStyle}`}
      >
        {(isCurrent && "Current") || (isIncluded && "Included") || "Subscribe"}
      </button>
    </form>
  );
};

export default Checkout;
