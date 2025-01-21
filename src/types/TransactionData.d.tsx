// ====== TRANSACTION PARAMS
import { PlanName } from "@/constants/plans";

export interface CreateTransactionParams {
  stripeId: string;
  createdAt: Date;
  amount: number;
  plan: PlanName;
  userId: string;
}

export interface CheckoutTransactionParams {
  plan: PlanName;
  amount: number;
  userId: string;
}
