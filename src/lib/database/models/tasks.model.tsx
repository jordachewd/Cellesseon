import { ContentItem, Message } from "@/types";
import { Schema, model, models, Document } from "mongoose";

// Define the Task document interface
export interface ITask extends Document {
  userId: string;
  usage: number;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const ContentItemSchema = new Schema<ContentItem>({
  type: { type: String, required: true },
  text: { type: String },
  image_url: { type: String },
  audio_url: { type: String },
});

const MessageSchema = new Schema<Message>({
  whois: {
    type: String,
    enum: ["user", "assistant", "system", "developer"],
  },
  role: {
    type: String,
    enum: ["user", "assistant", "system", "developer"],
    required: true,
  },
  content: { type: [ContentItemSchema], required: true },
});

const TaskSchema = new Schema<ITask>({
  userId: { type: String, required: true },
  usage: { type: Number, required: true, default: 0 },
  title: { type: String, required: true },
  messages: { type: [MessageSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = models?.Task || model<ITask>("Task", TaskSchema);
export default Task;
