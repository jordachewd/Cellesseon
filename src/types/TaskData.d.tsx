// ====== Task Data Types
import { Message } from "@/types";

export interface CreateTaskParams {
  userId: string;
  usage: number;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateTaskParams {
  messages?: Message[];
  usage?: number;
  updatedAt?: Date;
}
