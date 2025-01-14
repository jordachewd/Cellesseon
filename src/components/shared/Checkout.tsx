"use client";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from "@/lib/actions/transaction.action";

const Checkout = ({
  plan,
  amount,
  btnName,
  btnVariant,
  isDisabled,
  // credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  btnName: string;
  btnVariant?: "text" | "outlined" | "contained";
  // credits: number;
  buyerId: string;
  isDisabled?: boolean;
}) => {
  useEffect(() => {
    loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert("Order placed!\nYou will receive an email confirmation");
      /*       toast({
            title: "Order placed!",
            description: "You will receive an email confirmation",
            duration: 5000,
            className: "success-toast",
          }); */
    }

    if (query.get("canceled")) {
      alert(
        "Order canceled!\nContinue to shop around and checkout when you're ready"
      );
      /*       toast({
            title: "Order canceled!",
            description: "Continue to shop around and checkout when you're ready",
            duration: 5000,
            className: "error-toast",
          }); */
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      // credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout}>
      <Button
        role="link"
        type="submit"
        disabled={isDisabled}
        variant={btnVariant || "outlined"}
        sx={{ minWidth: "200px" }}
      >
        {btnName}
      </Button>
    </form>
  );
};

export default Checkout;
