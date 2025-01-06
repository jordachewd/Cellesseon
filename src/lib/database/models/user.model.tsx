import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  clerkImg: string;
  username: string;
  email: string;
  registerAt: Date;
// Optional fields below ...
  firstName?: string;
  lastName?: string;
  userImg?: string;
  coverImg?: string;
  planId?: number;
  creditBalance?: number;
  role: "basic" | "medium" | "premium" | "admin";  
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
  userImg: {
    type: String,
    default: "",
  },
  coverImg: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 10,
  },
  bio: {
    type: String,
    default: "",
  },
  registerAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ["basic", "medium", "premium", "admin"],
    default: "basic",
    required: true,
  },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
