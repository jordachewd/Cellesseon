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
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clerkId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
