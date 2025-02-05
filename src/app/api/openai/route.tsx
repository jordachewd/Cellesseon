import { getChatCompletion } from "@/lib/actions/openai.actions";
import { NextResponse } from "next/server";
import { Message, Messages } from "@/types";

/* Required for the Edge Runtime */
export const runtime = "edge";

// POST /api/openai
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Messages;
    const messages = body.messages as Message[];

    console.log("\x1b[33m%s\x1b[0m", "OpenAI Route: ", messages);

    const chatResponse = await getChatCompletion(messages as Message[]);

    console.log("\x1b[33m%s\x1b[0m", "-----------------------------------");

    return NextResponse.json(chatResponse);
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "Unexpected OpenAi route.tsx error.";

    return NextResponse.json({
      taskError: {
        title: "Chat completion API Error (/api/openai/route.tsx)",
        error: errMessage,
        status: 500,
      },
    });
  }
}
