"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { updateCredits } from "./user.actions";
import { handleError } from "../utils/handleError";
import { connectToDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import { CheckoutTransactionParams, CreateTransactionParams } from "@/types/TransactionData.d";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      userId: transaction.userId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/plans`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    const newTransaction = await Transaction.create({
      ...transaction,
      user: transaction.userId,
    });

    await updateCredits(transaction.userId, transaction.plan);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}
