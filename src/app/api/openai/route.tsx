import axios from "axios";
import { NextResponse } from "next/server";
import { Messages } from "@/types";
import {
  apiHeaders,
  chatPayload,
  createImgPayload,
  systemMsg,
} from "@/constants";

/* Required for the Edge Runtime */
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: Messages = await req.json();

  const CHAT_COMPLETIONS_API = process.env.OPENAI_CHAT_COMPLETIONS_API_URL;
  const IMAGE_GENERATION_API = process.env.OPENAI_IMAGE_GENERATION_API_URL;

  if (!CHAT_COMPLETIONS_API) {
    return NextResponse.json({
      title: "OpenAI chatCompletion API Error",
      error: "CHAT_COMPLETIONS_API is not defined.",
      status: 500,
    });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({
      title: "OpenAI chatCompletion API Error",
      error: "Invalid or empty messages array.",
      status: 400,
    });
  }

  try {
    const chatResponse = await axios.post(
      CHAT_COMPLETIONS_API,
      { ...chatPayload, messages: [...systemMsg, ...messages] },
      apiHeaders
    );

    if (!chatResponse.data) {
      throw new Error("OpenAI Server does not respond.");
    }

    const choices = chatResponse.data.choices[0];
    const stopReason = choices.finish_reason;
    const toolCalls = choices.message.tool_calls;

    if (stopReason === "tool_calls" && toolCalls) {
      const fnName = toolCalls[0].function.name;
      const parsedArgs = JSON.parse(toolCalls[0].function.arguments);
      if (fnName === "generateImage") {
        if (!IMAGE_GENERATION_API) {
          return NextResponse.json({
            title: "OpenAI imageGeneration API Error",
            error: "IMAGE_GENERATION_API is not defined.",
            status: 500,
          });
        }
        try {
          const imageResponse = await axios.post(
            IMAGE_GENERATION_API,
            { ...createImgPayload, prompt: parsedArgs.prompt },
            apiHeaders
          );

          if (!imageResponse.data) {
            throw new Error("OpenAI Server does not respond.");
          }

          return NextResponse.json({
            ...chatResponse.data,
            dalle: imageResponse.data,
          });
        } catch (error) {
          const defaultErr = "An unexpected createImage API error occurred.";
          const errMsg = error instanceof Error ? error.message : defaultErr;

          return NextResponse.json({
            title: "createImage Error!",
            error: errMsg,
            status: 500,
          });
        }
      } else if (fnName === "generateTitle") {
        return NextResponse.json({
          ...chatResponse.data,
          taskTitle: parsedArgs.title,
        });
      } else {
        return NextResponse.json(chatResponse.data);
      }
    }

    return NextResponse.json(chatResponse.data);
  } catch (error) {
    const defaultErr = "An unexpected chatCompletion API error occurred.";
    const errMsg = error instanceof Error ? error.message : defaultErr;

    return NextResponse.json({
      title: "Chat completion API Error",
      error: errMsg,
      status: 500,
    });
  }
}
