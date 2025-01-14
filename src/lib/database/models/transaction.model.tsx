import { Schema, model, models, ObjectId, Document } from "mongoose";

export interface ITransaction extends Document {
  createdAt?: Date;
  stripeId: string;
  amount: number;
  plan?: string;
  user?: ObjectId | string;
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
