interface TextContent {
  type: "text" | "temp";
  text: string | null | undefined;
}

interface ImageContent {
  type: "image_url";
  image_url: {
    url: string | undefined;
  };
}

interface AudioContent {
  id: string;
  expires_at: Date | number;
  data: string;
  transcript: string;
}

export type MessageRole = "user" | "assistant" | "system" | "developer";

export type ContentType = TextContent | ImageContent;

export interface Message {
  whois?: MessageRole;
  role: MessageRole;
  content: ContentType[] | string | null;
  audio?: AudioContent | string | null;
}

export interface Messages {
  taskId?: string;
  taskTitle?: string;
  messages: Message[];
}

export interface GenerateImage {
  prompt: string;
}

type ChipOptions = {
  id: number;
  label: string;
};

export type Chip = {
  id: number;
  label: string;
  icon: string;
  options: ChipOptions[];
};
