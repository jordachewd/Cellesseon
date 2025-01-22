// ====== USER Data Types
import { BillingCycle, PlanData } from "./PlanData.d";

export type UserRoles = "client" | "admin";

/* Used by Clerk Webhook ("user.created") */
export interface CreateUserParams {
  clerkId: string;
  clerkImg: string;
  email: string;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
  registerAt: Date | number;
}

/* Used by Clerk Webhook ("user.updated") */
export interface UpdateUserParams {
  email?: string;
  clerkImg?: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  updatedAt: Date | number;
  plan?: PlanData;
  billing?: BillingCycle
}

export interface UserMetadata {
  billing?: BillingCycle;
  planExpiresOn?: Date;
  planId?: string;
  planName?: string;
  role?: UserRoles;
  userId?: string;
}