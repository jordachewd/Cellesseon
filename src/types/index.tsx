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
  type: "audio_url";
  audio_url: {
    url: string | undefined | null;
  };
}

export type MessageRole = "user" | "assistant" | "system" | "developer";
export type ContentType = TextContent | ImageContent | AudioContent;

export interface Message {
  whois?: MessageRole;
  role: MessageRole;
  content: ContentType[] | string | null;
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
