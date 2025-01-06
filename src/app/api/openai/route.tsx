import axios from "axios";
import { NextResponse } from "next/server";

import {
  apiHeaders,
  chatPayload,
  createImgPayload,
  systemMsg,
} from "@/constants";
import { Messages } from "@/types";

/* Required for the Edge Runtime */
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: Messages = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({
      title: "OpenAI chatCompletion API Error",
      error: "Invalid or empty messages array.",
      status: 400,
    });
  }

  try {
    const chatResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
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
        try {
          const createImgResp = await axios.post(
            "https://api.openai.com/v1/images/generations",
            { ...createImgPayload, prompt: parsedArgs.prompt },
            apiHeaders
          );

          if (!createImgResp.data) {
            throw new Error("OpenAI Server does not respond.");
          }

          return NextResponse.json({
            ...chatResponse.data,
            dalle: createImgResp.data,
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
