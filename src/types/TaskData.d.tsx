// ====== Task Data Types
import { Message } from "@/types";

export interface CreateTaskInput {
  usage?: number;
  title: string;
  messages: Message[];
  createdAt?: Date;
}

export interface CreateTaskParams extends CreateTaskInput {
  userId: string;
}

export interface UpdateTaskParams {
  messages: Message[];
  usage?: number;
}
