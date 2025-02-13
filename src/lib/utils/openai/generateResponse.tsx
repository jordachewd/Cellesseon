import { chatTools, openAiClient, chatSystemMsg } from "@/constants/openai";
import { ContentItem, Message, MessageRole } from "@/types";
import { generateImage } from "./generateImage";
import { generateAudio } from "./generateAudio";

import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions.mjs";
import { handleError } from "../handleError";

/* This route should run on the Edge Runtime.*/
//export const runtime = "edge";

interface GenerateResponseParams {
  messages: Message[];
  taskId: string | null;
}
export async function generateResponse({
  messages,
  taskId,
}: GenerateResponseParams) {
  try {
    const chatData = await openAiClient.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.1,
      messages: [...chatSystemMsg, ...messages] as ChatCompletionMessageParam[],
      tools: chatTools as ChatCompletionTool[],
    });

    console.log("\x1b[33m%s\x1b[0m", "chatData: ", chatData);
    console.log("\x1b[33m%s\x1b[0m", "chatSystemMsg: ", chatSystemMsg);
    console.log("\x1b[33m%s\x1b[0m", "messages: ", messages);

    if (!chatData.choices?.length) {
      throw new Error("No choices returned from Chat Completion API.");
    }

    const { message, finish_reason } = chatData.choices[0];
    const toolCalls = message.tool_calls;

    if (finish_reason === "tool_calls" && toolCalls) {
      const { name: fnName, arguments: args } = toolCalls[0].function;
      const fnArgs = JSON.parse(args);

      console.log("\x1b[32m%s\x1b[0m", "fnName: ", fnName);

      if (fnName === "getGeneratedImage") {
        return await generateImage({
          prompt: fnArgs.prompt as string,
          role: message.role as MessageRole,
          taskId: taskId as string | null,
        });
      }

      if (fnName === "getGeneratedAudio") {
        return await generateAudio({
          messages: Array.isArray(fnArgs) ? fnArgs : ([fnArgs] as Message[]),
          role: message.role as MessageRole,
          taskId: taskId as string | null,
        });
      }
    }

    const taskUsage = chatData.usage?.total_tokens ?? 0;
    const taskData: Message = {
      whois: message.role,
      role: message.role,
      content: [{ type: "text", text: message.content }] as ContentItem[],
    };

    return JSON.stringify({ taskData, taskUsage });
  } catch (error) {
    handleError({ error, source: "generateResponse" });
  }
}
