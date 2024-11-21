import { Uploadable } from "openai/uploads.mjs";

export type MessageRole = "user" | "assistant" | "system";

interface TextContent {
  type: "text" | "temp";
  text: string;
}

interface ImageContent {
  type: "image_url";
  image_url: {
    url: string;
  };
}

export type ContentType = TextContent | ImageContent;

export interface Message {
  whois: string;
  role: MessageRole;
  content: string | ContentType[];
}

export interface Messages {
  messages: Message[];
}

export interface GenerateImage {
  prompt: string;
}

export interface VariateImage {
  image: Uploadable;
}
