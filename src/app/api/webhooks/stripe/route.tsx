import { getExpiresOn } from "@/constants/plans";
import { createTransaction } from "@/lib/actions/transaction.action";
import { updateUser } from "@/lib/actions/user.actions";
import { BillingCycle, PlanName } from "@/types/PlanData.d";
import { CreateTransactionParams } from "@/types/TransactionData.d";
import { UpdateUserParams } from "@/types/UserData.d";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
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

    // Create transaction in database
    const newTransaction = await createTransaction(transaction);

    if (newTransaction) {
      const newUserData: UpdateUserParams = {
        updatedAt: new Date(),
        plan: {
          id: thePlanId,
          name: thePlanName,
          billing: theBillingCycle,
          upgradedAt: new Date(),
          expiresOn: theExpireDate,
          amount: theAmount,
          stripeId: id,
        },
      };

      // Update user in database
      const updatedUser = await updateUser(theClerkId, newUserData);

      // Update Clerk user public metadata
      if (updatedUser) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(theClerkId, {
          publicMetadata: {
            planId: thePlanId,
            planName: thePlanName,
            planExpiresOn: theExpireDate,
            billing: theBillingCycle,
            amount: theAmount,
          },
        });
      } else {
        return NextResponse.json({
          message: "STRIPE: User database update failed!",
          updatedUser,
        });
      }

      return NextResponse.json({ message: "OK", newTransaction, updatedUser });
    } else {
      return NextResponse.json({
        message: "STRIPE: Transaction failed!",
        newTransaction,
      });
    }
  }

  return new Response("STRIPE: Checkout completed!", { status: 200 });
}
