import { Message, Messages } from "@/types";
import { TokenUsage } from "@/types/TaskData.d";
import getOpenAiApi from "./getOpenAiApi";
import updateCreateTask from "./updateCreateTask";

export default async function getAiCompletition({ messages }: Messages) {
  try {
    const response = await getOpenAiApi({ messages });

    if (!response.ok) {
      return {
        data: {
          error: "API request failed in getAiCompletition!",
          status: response.status,
        },
      };
    }

    const data = await response.json();

    if (data.choices && data.choices[0]?.message) {
      const gpt4o = data.choices[0].message;
      const dalle = data.dalle?.data[0];
      const newContent: Message["content"] = [
        {
          type: "text",
          text: gpt4o.content || dalle?.revised_prompt || "",
        },
      ];

      if (dalle) {
        newContent.push({
          type: "image_url",
          image_url: {
            url: dalle.url,
          },
        });
      }

      const openai: Message = {
        whois: gpt4o.role,
        role: dalle ? "user" : gpt4o.role,
        content: newContent,
      };

      const store = await updateCreateTask({
        messages: [...messages, openai],
        usage: [
          {
            completion_tokens: data.usage.completion_tokens,
            prompt_tokens: data.usage.prompt_tokens,
            total_tokens: data.usage.total_tokens,
          } as TokenUsage,
        ],
      });

      return { data, openai, store };
    }

    return { data };
  } catch (error) {
    console.error("Error in getAiCompletition:", error);

    return {
      data: {
        error: "Failed to fetch data from OpenAI API in getAiCompletition",
        status: 500,
      },
    };
  }
}
