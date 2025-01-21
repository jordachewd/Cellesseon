import { PlanName } from "@/types/PlanData.d";
import { Schema, model, models, ObjectId, Document } from "mongoose";

export interface ITransaction extends Document {
  stripeId: string;
  userId: ObjectId | string;
  clerkId: string;
  createdAt: Date;
  amount: number;
  plan: PlanName;
}

const TransactionSchema = new Schema<ITransaction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
