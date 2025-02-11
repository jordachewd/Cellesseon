import { openAiClient } from "@/constants/openai";
import { Message, MessageRole } from "@/types";
import manageErrors from "./manageErrors";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

export async function generateAudio(messages: Message[], role: MessageRole) {
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
