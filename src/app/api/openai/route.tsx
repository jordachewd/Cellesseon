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
    const response = await openAiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers questions kindly in a wise," +
            "warm tone and keeps replies under 500 characters." +
            "You provide a detailed explanation for each question and format the answer" +
            "using a title and subtitles (when necessary).",
        },
        ...messages,
      ],
      model: "gpt-4o-mini",
      temperature: 1,
    });

    // Return the OpenAI response as JSON
    return NextResponse.json(response);
  } catch (error) {
    console.error("OpenAI API Error:", error);

    // Return an error response in case of failure
    return NextResponse.json(
      { message: "Failed to fetch response from OpenAI API.", error },
      { status: 500 }
    );
  }
}
