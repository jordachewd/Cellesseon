import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// Get variables from .env file
const OPENAIORG = process.env.OPENAI_ORG;
const OPENAIPRJ = process.env.OPENAI_PRJ;
const OPENAIKEY = process.env.OPENAI_KEY;

// Check if environment variables are set
if (!OPENAIORG || !OPENAIPRJ || !OPENAIKEY) {
  throw new Error("Missing OpenAI environment variables.");
}

// Configure the OpenAI client
const openAiClient = new OpenAI({
  organization: OPENAIORG,
  project: OPENAIPRJ,
  apiKey: OPENAIKEY,
});

// The API call function
export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // Create request payload for GPT-4 Turbo with Vision
    const response = await openAiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers questions kindly in a wise warm tone. Use the supplied tools to assist the user." +
            "Provide expert-level writing explanation for each question and format the answer using a title and subtitles (when necessary).",
        },
        ...messages,
      ],
      model: "gpt-4o",
      temperature: 1,
    });

    return NextResponse.json(response);
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({
      error: "OpenAiClient Error: " + errorMsg,
      status: 500,
    });
  }
}
