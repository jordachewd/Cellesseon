// ====== USER Data Types

export type UserRoles = "lite" | "pro" | "premium" | "admin";

/* Used by Clerk Webhook ("user.created") */
export interface CreateUserParams {
  clerkId: string;
  clerkImg: string;
  email: string;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
  registerAt?: Date | number;
}

/* Used by Clerk Webhook ("user.updated") */
export interface UpdateUserParams {
  email?: string; 
  clerkImg?: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  updatedAt: Date | number;
  role?: UserRoles | UserRoles[];
  roleUpgradeAt?: Date | number;
}
