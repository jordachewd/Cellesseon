import { ContentItem, Message } from "@/types";
import { Schema, model, models, Document } from "mongoose";

interface ITask extends Document {
  userId: string;
  title: string;
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
  usage?: number;
}

const ContentItemSchema = new Schema<ContentItem>({
  type: { type: String, required: true },
  text: { type: String },
  image_url: {
    url: { type: String, default: null },
  },
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
  title: { type: String, required: true },
  messages: { type: [MessageSchema], required: true },
  usage: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = models?.Task || model<ITask>("Task", TaskSchema);
export default Task;
