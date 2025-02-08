"use server";
import OpenAI from "openai";
import manageErrors from "@/lib/utils/openai/manageErrors";
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
      temperature: 0.1,
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
      const { name: fnName, arguments: args } = toolCalls[0].function;
      const fnArgs = JSON.parse(args);

      console.log("fnName: ", fnName);

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

      if (fnName === "generateTitle") {
        console.log("generateTitle fnArgs: ", fnArgs);
        // return { ...chatData, taskTitle: fnArgs.title };
      }
    }

    return { taskData };
  } catch (error) {
    return manageErrors({
      title: "'getChatCompletion' error",
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

    const respData = response.data[0];
    const respContent: ContentType[] = [
      {
        type: "text",
        text: "revised_prompt" in respData ? respData.revised_prompt : "",
      },
      {
        type: "image_url",
        image_url: { url: "url" in respData ? respData.url : "" },
      },
    ];

    return {
      taskData: { whois: role, role, content: respContent },
    };
  } catch (error) {
    return manageErrors({ title: "'getImageGenerator' error", error });
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

    const respData = response.choices[0]?.message?.audio?.data;

    if (!respData) {
      throw new Error("No audio data returned from Audio API.");
    }

   // console.log("AUDIO respData: ", typeof respData);

    const audioBlob = new Blob([Buffer.from(respData, "base64")], {
      type: "audio/wav",
    });
    const audioUrl = URL.createObjectURL(audioBlob);

    const taskData: Message = {
      whois: role,
      role,
      content: [
        {
          type: "audio_url",
          audio_url: { url: audioUrl },
        },
      ],
    };

    return { taskData };
  } catch (error) {
    return manageErrors({ title: "'getAudioGenerator' error", error });
  }
}
