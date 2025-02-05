"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { handleError } from "../utils/handleError";
import { connectToDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import {
  CheckoutTransactionParams,
  CreateTransactionParams,
} from "@/types/TransactionData.d";
import { ClerkUserData } from "@/types/TaskData.d";
import { CheckoutPlanParams } from "@/types/PlanData.d";
import getFullName from "../utils/getFullName";

export async function checkoutPlan(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const {
    userId,
    clerkId,
    username,
    email,
    firstName,
    lastName,
  }: ClerkUserData = transaction.user;

  const {
    id: planId,
    billing: planBilling,
    name: planName,
    price: planPrice,
  }: CheckoutPlanParams = transaction.plan;

  const fullName = getFullName({
    firstName: firstName || "",
    lastName: lastName || "",
    username: username || "",
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Number(planPrice) * 100,
          product_data: {
            name: planName,
          },
        },
        quantity: 1,
      },
    ],
    customer_email: email,
    metadata: {
      userId,
      clerkId,
      name: fullName,
      plan: planName,
      billing: planBilling,
      planId,
    },
    success_url: `${BASEURL}/profile`,
    cancel_url: `${BASEURL}/plans`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    const newTransaction = await Transaction.create(transaction);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError({ error, source: "createTransaction" });
  }
}

export async function getAllTransactions(userId: string) {
  try {
    await connectToDatabase();

    const transactions = await Transaction.find({ clerkId: userId }, null, {
      sort: {
        createdAt: -1, //Sort by Date Added DESC
      },
    }).exec();

    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    handleError({ error, source: "getAllTransactions" });
  }
}

export async function deleteAllTransactions(userId: string) {
  try {
    await connectToDatabase();

    await Transaction.deleteMany({ clerkId: userId });

    return { message: "All transactions deleted successfully" };
  } catch (error) {
    handleError({ error, source: "deleteAllTransactions" });
  }
}
