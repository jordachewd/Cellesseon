import { UserRoles } from "@/types/UserData.d";
import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  clerkImg: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  registerAt: Date;
  updatedAt?: Date;
  role: UserRoles;
  roleUpgradeAt?: Date;
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
  avatar: { type: String },
  registerAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: {
    type: String,
    required: true,
    enum: ["lite", "pro", "premium", "admin"],
    default: "lite",
  },
  roleUpgradeAt: { type: Date, default: Date.now },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
