import axios from "axios";
import { GenerateImage } from "@/types";
import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_KEY;

// Required for the Edge Runtime
export const runtime = "edge";
/* export const config = {
  runtime: "edge",
}; */

export async function POST(req: Request) {
  console.log("\x1b[42m ------------------ \x1b[0m");
  console.log("\x1b[42m API createImage \x1b[0m");

  const { prompt }: GenerateImage = await req.json();

  if (!prompt) {
    return NextResponse.json({
      title: "OpenAI createImage API Error",
      error: "Invalid or null prompt.",
      status: 400,
    });
  }

  try {
    const payload = {
      prompt: prompt,
      user: "celeseon_user",
      model: "dall-e-3",
      size: "1024x1024",
      style: "natural",
      n: 1,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("OpenAI Server does not respond.");
    }

    console.log("\x1b[42m ------------------ \x1b[0m");
    return NextResponse.json(response.data);
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "An unexpected OpenAI createImage API error occurred.";
    console.log("\x1b[33m OpenAI createImage API error:  \x1b[0m", error);

    return NextResponse.json({
      title: "OpenAI createImage API Error",
      error: errMsg,
      status: 500,
    });
  }
}
