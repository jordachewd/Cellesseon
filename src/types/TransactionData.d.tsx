// ====== TRANSACTION PARAMS
declare type CheckoutTransactionParams = {
    plan: string;
   // credits: number;
    amount: number;
    buyerId: string;
  };
  
  declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
  //  credits: number;
    plan: string;
    buyerId: string;
    createdAt: Date;
  };
  