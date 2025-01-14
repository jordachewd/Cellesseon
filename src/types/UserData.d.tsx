// ====== USER Data Types

export interface UserParams {
  clerkId: string;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

export type UserRoles = "lite" | "pro" | "premium" | "admin";

export interface UserRoleColors {
  basic: "default";
  medium: "success";
  premium: "warning";
  admin: "secondary";
}

/* Used by local Add User Form */
export interface CreateClerkUserParams {
  _id?: string;
  clerkId?: string;
  clerkImg?: string | undefined;
  role: UserRoles | UserRoles[];
  registerAt: Date | number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

/* Used by Clerk Webhook ("user.created") */
export interface CreateUserParams {
  clerkId: string;
  email: string;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
  clerkImg?: string | undefined;
  registerAt?: Date | number;
}

/* Used by local Edit User Form */
export interface UpdateUserParams {
  firstName?: string | undefined;
  lastName?: string | undefined;
  username?: string;
  email?: string;
  clerkImg?: string | undefined;
  userImg?: string | undefined;
  coverImg?: string | undefined;
  planId?: number;
  creditBalance?: number;
  role?: UserRoles | UserRoles[];
  bio?: string;
}

export interface UpdateHeroParams {
  firstName?: string | undefined;
  lastName?: string | undefined;
  username?: string;
}

export interface GetUserParams {
  _id: string;
  clerkId: string;
  clerkImg: string | undefined;
  email: string;
  username: string;
  role: UserRoles | UserRoles[];
  registerAt: Date | number;
  firstName?: string | undefined;
  lastName?: string | undefined;
  userImg?: string | undefined;
  coverImg?: string | undefined;
  planId?: number;
  creditBalance?: number;
  bio?: string;
}
