"use server";
import OpenAI from "openai";
import { ContentType, Message, MessageRole } from "@/types";
import { systemMsg, chatTools } from "@/constants/openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions.mjs";

const openAiClient = new OpenAI({
  organization: process.env.OPENAI_ORG!,
  project: process.env.OPENAI_PRJ!,
  apiKey: process.env.OPENAI_KEY!,
});

export async function getChatCompletion(messages: Message[]) {
  try {
    const chatData = await openAiClient.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      messages: [...systemMsg, ...messages] as ChatCompletionMessageParam[],
      tools: chatTools as ChatCompletionTool[],
    });

    if (!chatData.choices?.length) {
      throw new Error("No choices returned from Chat Completion API.");
    }

    const { message, finish_reason } = chatData.choices[0];
    const toolCalls = message.tool_calls;

    const taskContent: ContentType[] = [
      { type: "text", text: message.content },
    ];

    const taskData: Message = {
      whois: message.role,
      role: message.role,
      content: taskContent,
    };

    if (finish_reason === "tool_calls" && toolCalls) {
      const { name, arguments: args } = toolCalls[0].function;
      const fnArgs = JSON.parse(args);

      if (name === "generateImage") {
        return await handleImageGeneration(fnArgs.prompt, message.role);
      } else if (name === "generateTitle") {
        return { ...chatData, taskTitle: fnArgs.title };
      }
    }

    return { taskData };
  } catch (error) {
    return handleOpenAiError("Chat Completion API Error", error);
  }
}

async function handleImageGeneration(prompt: string, role: MessageRole) {
  try {
    const imageResponse = await getImageGeneration(prompt);

    const imgTaskContent: ContentType[] = [
      {
        type: "text",
        text:
          "revised_prompt" in imageResponse ? imageResponse.revised_prompt : "",
      },
      {
        type: "image_url",
        image_url: { url: "url" in imageResponse ? imageResponse.url : "" },
      },
    ];

    return {
      taskData: { whois: role, role, content: imgTaskContent },
    };
  } catch (error) {
    return handleOpenAiError("Image Generation Error", error);
  }
}

export async function getImageGeneration(prompt: string) {
  try {
    const imageData = await openAiClient.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      n: 1,
    });

    if (!imageData.data?.length) {
      throw new Error("No images returned from Image API.");
    }

    return imageData.data[0];
  } catch (error) {
    return handleOpenAiError("Image Generation API Error", error);
  }
}

function handleOpenAiError(title: string, error: Error | unknown) {
  return {
    taskError: {
      title,
      error:
        error instanceof Error ? error.message : "Unexpected error occurred.",
      status: 500,
    },
  };
}
