import { getExpiresOn } from "@/constants/plans";
import { createTransaction } from "@/lib/actions/transaction.action";
import { updateUser } from "@/lib/actions/user.actions";
import { PlanName } from "@/types/PlanData.d";
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

    const transaction: CreateTransactionParams = {
      stripeId: id,
      userId: metadata?.userId || "",
      clerkId: metadata?.clerkId || "",
      createdAt: new Date(),
      amount: amount_total ? amount_total / 100 : 0,
      plan: (metadata?.plan as PlanName) || "",
    };

    // Create transaction in database
    const newTransaction = await createTransaction(transaction);

    if (newTransaction) {
      const newUserData: UpdateUserParams = {
        updatedAt: new Date(),
        plan: {
          id: metadata?.planId?.toString() || "0",
          name: transaction.plan,
          upgradedAt: transaction.createdAt,
          expiresOn: getExpiresOn(transaction.plan),
        },
      };

      // Update user in database
      const updatedUser = await updateUser(transaction.clerkId, newUserData);

      // Update Clerk user public metadata
      if (updatedUser) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(transaction.clerkId, {
          publicMetadata: {
            planName: transaction.plan,
            planExpiresOn: getExpiresOn(transaction.plan),
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
