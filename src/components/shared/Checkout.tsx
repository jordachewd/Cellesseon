"use client";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutPlan } from "@/lib/actions/transaction.action";
import { CheckoutTransactionParams } from "@/types/TransactionData.d";
import { PlanName } from "@/constants/plans";

const Checkout = ({
  plan,
  amount,
  btnName,
  btnVariant,
  isDisabled,
  userId,
}: {
  plan: PlanName;
  amount: number;
  btnName: string;
  btnVariant?: "text" | "outlined" | "contained";
  userId: string;
  isDisabled?: boolean;
}) => {
  useEffect(() => {
    loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY!}`);
  }, []);

  const onCheckout = async () => {
    const transaction: CheckoutTransactionParams = {
      plan,
      amount,
      userId,
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
