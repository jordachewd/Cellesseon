import { chatTools, openAiClient, chatSystemMsg } from "@/constants/openai";
import { ContentItem, Message, MessageRole } from "@/types";
import { generateImage } from "./generateImage";
import { generateAudio } from "./generateAudio";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions.mjs";
import { handleError } from "../handleError";

interface GenerateResponseParams {
  messages: Message[];
  taskId: string;
}

export async function generateResponse({
  messages,
  taskId,
}: GenerateResponseParams) {
  try {
    const chatData = await openAiClient.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.5,
      messages: [...chatSystemMsg, ...messages] as ChatCompletionMessageParam[],
      tools: chatTools as ChatCompletionTool[],
    });

    if (!chatData?.choices?.length) {
      throw new Error("No valid response from Chat Completion API.");
    }

    const { message } = chatData.choices[0];
    const toolCall = message.tool_calls?.[0];

    if (toolCall && toolCall.type === "function" && toolCall.function) {
      const functionName = toolCall.function.name;
      const argsStr = toolCall.function.arguments ?? "{}";
      const parsedArgs = (() => {
        try {
          return JSON.parse(argsStr);
        } catch {
          return {};
        }
      })();

      if (functionName === "getGeneratedImage") {
        return await generateImage({
          prompt: parsedArgs.prompt,
          role: message.role as MessageRole,
          taskId,
        });
      }

      if (functionName === "getGeneratedAudio") {
        return await generateAudio({
          messages: Array.isArray(parsedArgs) ? parsedArgs : [parsedArgs],
          role: message.role as MessageRole,
          taskId,
        });
      }
    }

    return JSON.stringify({
      taskData: {
        whois: message.role,
        role: message.role,
        content: [{ type: "text", text: message.content }] as ContentItem[],
      },
      taskUsage: chatData.usage?.total_tokens ?? 0,
    });
  } catch (error) {
    handleError({ error, source: "generateResponse" });
  }
}
