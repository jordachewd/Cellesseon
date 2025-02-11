"use server";
import OpenAI from "openai";
import manageErrors from "@/lib/utils/openai/manageErrors";
import { ContentItem, Message, MessageRole } from "@/types";
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
      temperature: 0.1,
      messages: [...systemMsg, ...messages] as ChatCompletionMessageParam[],
      tools: chatTools as ChatCompletionTool[],
    });

    if (!chatData.choices?.length) {
      throw new Error("No choices returned from Chat Completion API.");
    }

    // console.log("\x1b[36m%s\x1b[0m", "chatData: ", chatData);

    const { message, finish_reason } = chatData.choices[0];
    const toolCalls = message.tool_calls;
    const taskContent: ContentItem[] = [
      { type: "text", text: message.content },
    ];

    const taskData: Message = {
      whois: message.role,
      role: message.role,
      content: taskContent,
    };

    if (finish_reason === "tool_calls" && toolCalls) {
      const { name: fnName, arguments: args } = toolCalls[0].function;
      const fnArgs = JSON.parse(args);

      if (fnName === "generateTitle") {
        console.log("generateTitle fnArgs: ", fnArgs);
      }

      if (fnName === "generateResponse") {
        console.log("generateResponse fnArgs: ", fnArgs);
      }

      if (fnName === "generateImage") {
        return await getImageGenerator(
          fnArgs.prompt as string,
          message.role as MessageRole
        );
      }

      if (fnName === "generateAudio") {
        return await getAudioGenerator(
          Array.isArray(fnArgs) ? fnArgs : ([fnArgs] as Message[]),
          message.role as MessageRole
        );
      }
    }

    const taskUsage = chatData.usage?.total_tokens;

    return { taskData, taskUsage };
  } catch (error) {
    return manageErrors({
      title: "AI chat completion error!",
      error,
    });
  }
}

async function getImageGenerator(prompt: string, role: MessageRole) {
  try {
    const response = await openAiClient.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      prompt,
      n: 1,
    });

    if (!response.data?.length) {
      throw new Error("No images returned from Image API.");
    }

    //   console.log("\x1b[36m%s\x1b[0m", "getImageGenerator data: ", response);

    const respData = response.data[0];
    const content: ContentItem[] = [
      {
        type: "text",
        text: "revised_prompt" in respData ? respData.revised_prompt : "",
      },
      {
        type: "image_url",
        image_url: "url" in respData ? respData.url : "",
      },
    ];

    const taskData: Message = {
      whois: role,
      role,
      content,
    };

    return { taskData };
  } catch (error) {
    return manageErrors({ title: "AI image generator error!", error });
  }
}

async function getAudioGenerator(messages: Message[], role: MessageRole) {
  try {
    const response = await openAiClient.chat.completions.create({
      model: "gpt-4o-audio-preview",
      modalities: ["text", "audio"],
      audio: { voice: "alloy", format: "wav" },
      messages: [...messages] as ChatCompletionMessageParam[],
    });

    const respData = response.choices[0]?.message?.audio;

    if (!respData) {
      throw new Error("No audio data returned from Audio API.");
    }

    const taskData: Message = {
      whois: role,
      role,
      content: [
        {
          type: "text",
          text: "transcript" in respData ? respData.transcript : "",
        },
        {
          type: "audio_url",
          audio_url: respData.data,
        },
      ],
    };

    const taskUsage = response.usage?.total_tokens;

    return { taskData, taskUsage };
  } catch (error) {
    return manageErrors({ title: "AI audio generator error!", error });
  }
}

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
