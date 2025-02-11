import { NextResponse } from "next/server";
import { Message, Messages } from "@/types";
import { generateResponse } from "@/lib/utils/openai/generateResponse";

/* This route should run on the Edge Runtime. -- it triggers Mogoose errors for child functions */
export const runtime = "edge";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Messages;
    const messages = body.messages as Message[];
    const taskId = body.taskId as string | null;

    const chatResp = await generateResponse({ messages, taskId });

    return NextResponse.json(chatResp);
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "Unexpected AI endpoint route error.";

    return NextResponse.json({
      taskError: {
        title: "AI endpoint route error!",
        error: errMessage,
        status: 500,
      },
    });
  }
}
