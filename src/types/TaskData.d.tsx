// ====== Task Data Types
import { Message } from "@/types";
import { ClerkUserData } from "./UserData.d";

export interface CreateTaskParams {
  userId: string;
  usage: number;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateTaskParams {
  user: ClerkUserData;
  title: string;
  messages?: Message[];
  usage?: number;
  updatedAt?: Date;
}
