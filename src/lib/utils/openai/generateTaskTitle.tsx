import { Message } from "@/types";
import manageErrors from "./manageErrors";
import { openAiClient } from "@/constants/openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

export async function generateTaskTitle(messages: Message[]) {
  const systemMsg = [
    {
      role: "system",
      content:
        "Generate a concise, maximum of five words engaging title that captures the essence of the conversation and piques interest.",
    },
  ];

  try {
    const response = await openAiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [...systemMsg, ...messages] as ChatCompletionMessageParam[],
    });

    const title = response.choices[0]?.message.content as string;

    if (!title) {
      throw new Error("No data returned from Title Generator API.");
    }

    return { title, usage: response.usage?.total_tokens };
  } catch (error) {
    return manageErrors({ title: "AI title generator error!", error });
  }
}
