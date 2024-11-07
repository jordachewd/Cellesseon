"use server";
import { OpenAI } from "openai";
import { Message } from "@/types";

// Get variables from .env file
const OPENAIORG = (process.env.OPENAI_ORG as string) || "";
const OPENAIPRJ = (process.env.OPENAI_PRJ as string) || "";
const OPENAIKEY = (process.env.OPENAI_KEY as string) || "";

// Check if environment variables are set
if (!OPENAIORG || !OPENAIPRJ || !OPENAIKEY) {
  throw new Error("Missing OpenAI environment variables.");
}

const openAiClient = new OpenAI({
  organization: OPENAIORG,
  project: OPENAIPRJ,
  apiKey: OPENAIKEY,
});

export async function getOpenAi(messages: Message[]) {
  const response = await openAiClient.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that answers any question and your replies are under 500 characters." +
          "You are the hero and an inspiration for people. You are kind and your answers are in a wise warm tone",
      },
      ...messages,
    ],
    model: "gpt-4o-mini",  
    temperature: 1,
     // stream: true,
  });

  console.log(response.choices[0].message);

  return response;
}
