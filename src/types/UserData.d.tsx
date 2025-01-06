/* eslint-disable @typescript-eslint/no-unused-vars */

// ====== USER Data Types

export interface UserParams {
  clerkId: string;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

/*-----------*/

export type UserRoles = "basic" | "medium" | "premium" | "admin";

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

// ====== IMAGE PARAMS
/* declare type AddImageParams = {
  image: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

declare type UpdateImageParams = {
  image: {
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

declare type Transformations = {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
}; */

// ====== TRANSACTION PARAMS
/* declare type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
  buyerId: string;
};

declare type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: Date;
};

declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground"; */

// ====== URL QUERY PARAMS
/* declare type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

declare type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

declare type RemoveUrlQueryParams = {
  searchParams: string;
  keysToRemove: string[];
};

declare type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type TransformationFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: TransformationTypeKey;
  creditBalance: number;
  data?: IImage | null;
  config?: Transformations | null;
};

declare type TransformedImageProps = {
  image: any;
  type: string;
  title: string;
  transformationConfig: Transformations | null;
  isTransforming: boolean;
  hasDownload?: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};
 */
