export type MessageRoles = "user" | "assistant" | "system";

interface TextContent {
  type: "text";
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
  role: MessageRoles;
  content: string | ContentType[]; 
}
