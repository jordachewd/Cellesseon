import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { ChoiceWithFunctionCall } from "@/types";

const OPENAIORG = process.env.OPENAI_ORG;
const OPENAIPRJ = process.env.OPENAI_PRJ;
const OPENAIKEY = process.env.OPENAI_KEY;

if (!OPENAIORG || !OPENAIPRJ || !OPENAIKEY) {
  throw new Error("Missing OpenAI environment variables.");
}

const openAiClient = new OpenAI({
  organization: OPENAIORG,
  project: OPENAIPRJ,
  apiKey: OPENAIKEY,
});

// Define the DALL-E image generation function
const dallEFunction = {
  name: "generate_image",
  description: "Generate an image based on the user's request",
  parameters: {
    type: "object",
    properties: {
      prompt: {
        type: "string",
        description: "The description of the image to generate",
      },
    },
    required: ["prompt"],
  },
};

// The API call function
export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const response = await openAiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers questions kindly in a wise warm tone. Use the supplied tools to assist the user." +
            "Provide a detailed explanation for each question and format the answer using a title and subtitles (when necessary).",
        },
        ...messages,
      ],
      model: "gpt-4-turbo",
      temperature: 1,
      stream: true,
      functions: [dallEFunction], // Register the function with the OpenAI API
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const rawChunk of response) {
          const chunk = rawChunk as unknown as ChoiceWithFunctionCall; // Cast to include function_call

          // Check for function_call and trigger DALL-E image generation
          if (chunk.delta.function_call) {
            const function_call = chunk.delta.function_call;
            if (function_call.name === "generate_image") {
              const prompt = JSON.parse(function_call.arguments)?.prompt;
              const imageResponse = await openAiClient.images.generate({
                prompt,
                n: 1,
                size: "1024x1024",
              });

              const imageUrl = imageResponse.data[0].url;
              controller.enqueue(`data: ${JSON.stringify({ imageUrl })}\n\n`);
            }
          } else if (chunk.delta.content) {
            // For regular chat messages
            controller.enqueue(`data: ${chunk.delta.content}\n\n`);
          }
        }
        controller.enqueue(`data: [DONE]\n\n`);
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
