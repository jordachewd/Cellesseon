import { Message } from "@/types";
import { openAiClient, titleSystemMsg } from "@/constants/openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

export async function generateTitle(messages: Message[]) {
  try {
    const response = await openAiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        ...titleSystemMsg,
        ...messages,
      ] as ChatCompletionMessageParam[],
    });

    const title = response.choices[0]?.message.content as string;

    if (!title) {
      throw new Error("No data returned from Title Generator API.");
    }

    const usage: number = response.usage?.total_tokens ?? 0;

    return JSON.stringify({ title, usage });
  } catch (error) {
    const errMsg = error instanceof Error && error.message;
    const aiError = {
      title: "AI Title Generator error!",
      error: errMsg || "Unexpected error occurred.",
      status: 500,
    };

    return JSON.stringify({ aiError });
  }
}
