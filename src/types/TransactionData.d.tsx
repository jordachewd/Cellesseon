// ====== TRANSACTION PARAMS
import { PlanName } from "@/constants/plans";
import { ClerkUserData } from "./TaskData.d";

export interface CreateTransactionParams {
  stripeId: string;
  createdAt: Date;
  amount: number;
  plan: PlanName;
  userId: string;
  clerkId: string;
}

export interface CheckoutTransactionParams {
  plan: PlanName;
  amount: number;
  user: ClerkUserData;
}
