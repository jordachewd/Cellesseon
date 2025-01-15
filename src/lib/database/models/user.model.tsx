import { UserRoles } from "@/types/UserData.d";
import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  clerkImg: string;
  username: string;
  email: string;
  registerAt: Date;
  role: UserRoles;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

const UserSchema = new Schema<IUser>({
  clerkImg: { type: String },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
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
    enum: ["lite", "pro", "premium", "admin"],
    default: "lite",
  },
  bio: {
    type: String,
    default: "",
  },
  registerAt: { type: Date, default: Date.now },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
