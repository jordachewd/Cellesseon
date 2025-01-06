import { ContentType, Message } from "@/types";
import { ClerkUserData, TokenUsage } from "@/types/TaskData.d";
import { model, models, Schema, Document } from "mongoose";

export interface ITask extends Document {
  user: ClerkUserData;
  title: string;
  content?: Message[];
  usage?: TokenUsage[];
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageContentSchema = new Schema<ContentType>({
  type: { type: String, enum: ["text", "temp", "image_url"], required: true },
  text: {
    type: String,
    required: function () {
      return this.type === "text" || this.type === "temp";
    },
  },
  image_url: {
    url: {
      type: String,
      required: function () {
        return this.type === "image_url";
      },
    },
  },
});

const MessageSchema = new Schema<Message>({
  whois: { type: String, required: true },
  role: { type: String, enum: ["user", "assistant", "system"], required: true },
  content: { type: [MessageContentSchema], required: true },
});

const UsageSchema = new Schema<TokenUsage>({
  completion_tokens: { type: Number },
  prompt_tokens: { type: Number },
  total_tokens: { type: Number },
});

const TaksSchema = new Schema<ITask>({
  user: {
    clerkId: { type: String, ref: "User", required: true },
    username: { type: String, ref: "User", required: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  title: { type: String, required: true },
  content: { type: [MessageSchema] },
  usage: { type: [UsageSchema] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Tasks = models?.Tasks || model<ITask>("Tasks", TaksSchema);

export default Tasks;
