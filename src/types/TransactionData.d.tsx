// ====== TRANSACTION PARAMS
export interface CheckoutTransactionParams {
  plan: string;
  amount: number;
  userId: string;
}

export interface CreateTransactionParams {
  stripeId: string;
  amount: number;
  plan: string;
  userId: string;
  createdAt: Date;
}
