import { openAiClient } from "@/constants/openai";
import { Message, MessageRole } from "@/types";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

interface GenerateAudioParams {
  messages: Message[];
  role: MessageRole;
  taskId?: string | null;
}

export async function generateAudio({
  messages,
  role,
  taskId,
}: GenerateAudioParams) {
  try {
    const response = await openAiClient.chat.completions.create({
      model: "gpt-4o-audio-preview",
      modalities: ["text", "audio"],
      audio: { voice: "alloy", format: "wav" },
      messages: [...messages] as ChatCompletionMessageParam[],
    });

    const respData = response.choices[0]?.message?.audio;

    if (!respData) {
      throw new Error("No audio data returned from Audio Generator API.");
    }

    console.log("\x1b[36m%s\x1b[0m", "generateAudio taskId: ", taskId);

    const taskData: Message = {
      whois: role,
      role,
      content: [
        {
          type: "text",
          text: "transcript" in respData ? respData.transcript : null,
        },
        {
          type: "audio_url",
          audio_url: respData.data,
        },
      ],
    };

    const taskUsage = response.usage?.total_tokens;

    return JSON.stringify({ taskData, taskUsage });
  } catch (error) {
    const errMsg = error instanceof Error && error.message;
    const aiError = {
      title: "AI Audio Generator error!",
      error: errMsg || "Unexpected error occurred.",
      status: 500,
    };

    return JSON.stringify({ aiError });
  }
}
