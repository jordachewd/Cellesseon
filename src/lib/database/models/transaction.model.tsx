import { PlanName } from "@/constants/plans";
import { Schema, model, models, ObjectId, Document } from "mongoose";

export interface ITransaction extends Document {
  stripeId: string;
  createdAt: Date;
  amount: number;
  plan: PlanName;
  userId: ObjectId | string;
}

const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
