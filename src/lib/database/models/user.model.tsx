import { getExpiresOn } from "@/constants/plans";
import { PlanData } from "@/types/PlanData.d";
import { UserRoles } from "@/types/UserData.d";
import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  clerkImg: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRoles;
  registerAt: Date;
  updatedAt?: Date;
  plan: PlanData;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  clerkImg: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["client", "admin"],
    default: "client",
  },
  avatar: { type: String },
  registerAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  plan: {
    id: { type: Number, required: true, default: 0 },
    name: {
      type: String,
      required: true,
      enum: ["Lite", "Pro", "Premium"],
      default: "Lite",
    },
    billing: {
      type: String,
      required: true,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },
    upgradeAt: { type: Date, required: true, default: Date.now },
    expiresOn: { type: Date, required: true, default: getExpiresOn("Lite") },
  },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
