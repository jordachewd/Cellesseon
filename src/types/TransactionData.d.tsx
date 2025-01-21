// ====== TRANSACTION Data Types

import { CheckoutPlanParams, PlanName } from "./PlanData.d";
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
  user: ClerkUserData;
  plan: CheckoutPlanParams;
}

export interface Transaction {
  id: string;
  plan: string;
  amount: number;
  createdAt: string;
}