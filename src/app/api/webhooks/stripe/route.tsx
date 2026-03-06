/**
 * This file contains the route handler for Stripe webhooks.
 * It listens for POST requests from Stripe and processes events such as "checkout.session.completed".
 *
 * Params:
 * - request: The incoming HTTP request object containing the Stripe event payload and headers.
 *
 * Returns:
 * - A JSON response indicating the result of the webhook processing.
 * - In case of a successful "checkout.session.completed" event, it returns the created transaction and updated user data.
 * - In case of an error, it returns a JSON response with an error message.
 */

import { getExpiresOn } from "@/constants/plans";
import { createTransaction } from "@/lib/actions/transaction.action";
import { updateUser } from "@/lib/actions/user.actions";
import { connectToDatabase } from "@/lib/database/mongoose";
import Transaction from "@/lib/database/models/transaction.model";
import { BillingCycle, PlanData, PlanName } from "@/types/PlanData.d";
import { CreateTransactionParams } from "@/types/TransactionData.d";
import { UpdateUserParams } from "@/types/UserData.d";
import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig) {
    return NextResponse.json(
      { message: "Webhook error", error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  if (!endpointSecret) {
    return NextResponse.json(
      { message: "Webhook error", error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { message: "Webhook error", error: err },
      { status: 400 },
    );
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    const theAmount = amount_total ? amount_total / 100 : 0;
    const theUserId = metadata?.userId || "-";
    const theClerkId = metadata?.clerkId || "-";
    const thePlanId = metadata?.planId?.toString() || "0";
    const thePlanName = (metadata?.plan as PlanName) || "Lite";
    const theBillingCycle = (metadata?.billing || "Monthly") as BillingCycle;
    const theExpireDate = getExpiresOn(thePlanName, theBillingCycle);

    const transaction: CreateTransactionParams = {
      stripeId: id,
      userId: theUserId,
      clerkId: theClerkId,
      createdAt: new Date(),
      expiresOn: theExpireDate,
      amount: theAmount,
      plan: thePlanName,
      billing: theBillingCycle,
    };

    // Idempotency: check if this Stripe event was already processed
    await connectToDatabase();
    const existingTransaction = await Transaction.findOne({ stripeId: id });
    if (existingTransaction) {
      return NextResponse.json(
        { message: "Already processed" },
        { status: 200 },
      );
    }

    // Create transaction in database
    const newTransaction = await createTransaction(transaction);

    if (newTransaction) {
      const newUserData: UpdateUserParams = {
        updatedAt: new Date(),
        plan: {
          id: thePlanId,
          name: thePlanName,
          billing: theBillingCycle,
          startedOn: new Date(),
          expiresOn: theExpireDate,
          amount: theAmount,
          stripeId: id,
        } as PlanData,
      };

      // Update user in database
      const updatedUser = await updateUser(theClerkId, newUserData);

      return NextResponse.json({ message: "OK", newTransaction, updatedUser });
    } else {
      return NextResponse.json(
        {
          message: "STRIPE: Transaction failed!",
          newTransaction,
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: `STRIPE: Unhandled event type: ${eventType}` },
    { status: 200 },
  );
}
