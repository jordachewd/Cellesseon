// ====== Task Data Types
import { Message } from "@/types";

export interface ClerkUserData {
  clerkId: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface TokenUsage {
  completion_tokens?: number;
  prompt_tokens?: number;
  total_tokens?: number;
}

export interface CreateTaskParams {
  user: ClerkUserData;
  title: string;
  content?: Message[];
  usage?:TokenUsage[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateTaskParams {
  user: ClerkUserData;
  title: string;
  content?: Message[];
  usage?:TokenUsage[];
  updatedAt?: Date;
}
