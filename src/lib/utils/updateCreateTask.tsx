import { Message } from "@/types";
import { CreateTaskParams, TokenUsage } from "@/types/TaskData.d";
import getOpenAiApi from "./getOpenAiApi";

interface StoreChatParams {
  messages: Message[];
  usage: TokenUsage[];
}

export default async function updateCreateTask({
  messages,
  usage,
}: StoreChatParams) {
  const getTitle: Message = {
    whois: "user",
    role: "user",
    content: [
      {
        type: "text",
        text: "Generate title for conversation. Maximum four words.",
      },
    ],
  };

  try {
    const response = await getOpenAiApi({
      messages: [...messages, getTitle],
    });

    if (!response.ok) {
      return {
        error: "API request failed in updateCreateTask!",
        status: response.status,
      };
    }

    const data = await response.json();

    const createNewTask: CreateTaskParams = {
      title: data.taskTitle,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: messages,
      usage: usage,
      user: {
        clerkId: "user.id",
        username: "user.username",
        firstName: "user.firstName",
        lastName: "user.lastName",
      },
    };

    return createNewTask;
  } catch (error) {
    console.error("Error in updateCreateTask:", error);

    return {
      error: "Failed to fetch data from OpenAI API in updateCreateTask!",
      status: 500,
    };
  }
}
