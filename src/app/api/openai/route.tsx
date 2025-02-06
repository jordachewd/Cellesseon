/**
 * This file defines the API route for handling OpenAI chat completions.
 * It uses the Edge Runtime and handles POST requests to the /api/openai endpoint.
 * The route expects a JSON body containing an array of messages and returns the chat completion response.
 */

import { getChatCompletion } from "@/lib/actions/openai.actions";
import { NextResponse } from "next/server";
import { Message, Messages } from "@/types";

/**
 * This route should run on the Edge Runtime.
 */
export const runtime = "edge";

/**
 * Handles POST requests to the /api/openai endpoint.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing the chat completion result or an error message.
 * @throws Will return a JSON response with an error message and status code 500 if an error occurs.
 */

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Messages;
    const messages = body.messages as Message[];

    console.log("\x1b[33m%s\x1b[0m", "OpenAI Route: ", messages);
    console.log("\x1b[33m%s\x1b[0m", "-----------------------------------");

    const chatResponse = await getChatCompletion(messages as Message[]);

    return NextResponse.json(chatResponse);
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "Unexpected OpenAi route.tsx error.";

    return NextResponse.json({
      taskError: {
        title: "'/api/openai' endpoint error",
        error: errMessage,
        status: 500,
      },
    });
  }
}
