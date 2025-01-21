"use client";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutPlan } from "@/lib/actions/transaction.action";
import { CheckoutTransactionParams } from "@/types/TransactionData.d";
import { PlanName } from "@/constants/plans";
import { ClerkUserData } from "@/types/TaskData.d";

interface CheckoutProps {
  plan: PlanName;
  amount: number;
  btnName: string;
  btnVariant?: "text" | "outlined" | "contained";
  isDisabled?: boolean;
  clerkUser: ClerkUserData;
}

const Checkout = ({
  plan,
  amount,
  btnName,
  btnVariant,
  isDisabled,
  clerkUser,
}: CheckoutProps) => {
  useEffect(() => {
    loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY!}`);
  }, []);

  const onCheckout = async () => {
    const transaction: CheckoutTransactionParams = {
      user: clerkUser,
      plan,
      amount,
    };

    await checkoutPlan(transaction);
  };

  return (
    <form action={onCheckout}>
      <Button
        role="link"
        type="submit"
        disabled={isDisabled}
        variant={btnVariant || "outlined"}
        sx={{ minWidth: 220 }}
      >
        {btnName}
      </Button>
    </form>
  );
};

export default Checkout;
