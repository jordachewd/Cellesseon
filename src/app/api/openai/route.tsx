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
  const { messages, model = "gpt-4o" } = await req.json();

  try {
    if (model === "dall-e-3") {
      // DALL-E 3 image generation request
      const response = await openAiClient.images.generate({
        prompt: messages[0].content,
        model: "dall-e-3",
        size: "1024x1024",
        quality: "standard",
        n: 1,
      });
      return NextResponse.json(response);
    } else {
      const response = await openAiClient.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that answers questions kindly in a wise warm tone. " +
              "Provide a detailed explanation for each question and format the answer " +
              "using a title and subtitles (when necessary).",
          },
          ...messages,
        ],
        model: model,
        temperature: 1,
      });
      return NextResponse.json(response);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
