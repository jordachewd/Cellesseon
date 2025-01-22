// ====== TRANSACTION Data Types

import { BillingCycle, CheckoutPlanParams, PlanName } from "./PlanData.d";
import { ClerkUserData } from "./TaskData.d";

export interface CreateTransactionParams {
  stripeId: string;
  userId: string;
  clerkId: string;
  createdAt: Date;
  expiresOn: Date;
  amount: number;
  plan: PlanName;
  billing: BillingCycle;
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
  billing: BillingCycle;
}
