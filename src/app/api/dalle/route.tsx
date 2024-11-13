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

// Image generation function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function generateImage(prompt: string) {
  const response = await openAiClient.images.generate({
    prompt: prompt,
    size: "1024x1024",
    n: 1,
  });
  console.log("generateImage:", response);
  return { image_url: response.data[0].url };
}

// Define the expected type for tool calls
interface ToolCall {
  arguments: string;
}

// Type guard to check if a tool call has `arguments`
function hasArguments(toolCall: unknown): toolCall is ToolCall {
  return (
    typeof toolCall === "object" &&
    toolCall !== null &&
    "arguments" in toolCall &&
    typeof (toolCall as ToolCall).arguments === "string"
  );
}

// The API call function
export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // Request payload for DALL-E image generation using `tools`
    const dalleResp = await openAiClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers questions kindly in a wise warm tone." +
            "You can generate images using DALL-E based on the user prompt." +
            "Provide expert-level writing explanation for each question.",
        },
        ...messages,
      ],
      // Define the generateImage tool as a function with the correct JSON schema
      tools: [
        {
          type: "function",
          function: {
            name: "generateImage",
            description: "Generate images using DALL-E",
            strict: true,
            parameters: {
              type: "object",
              properties: {
                prompt: {
                  type: "string",
                  description: "Description of the image to generate",
                },
              },
              required: ["prompt"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    // Ensure that tool calls are correctly accessed and type-safe
    const getImgPrompt = dalleResp.choices[0]?.message?.tool_calls;
    let imgPrompt: string | undefined;

    if (Array.isArray(getImgPrompt) && hasArguments(getImgPrompt[0])) {
      // Parse the JSON string to extract `prompt`
      const parsedArguments = JSON.parse(getImgPrompt[0].function.arguments);
      imgPrompt = parsedArguments.prompt;
    }

    console.log("imgPrompt:", imgPrompt); /* Returns UNDEFINED ??????????????  ---  */

    // Send back the final response with the generated function call for testing
    return NextResponse.json(dalleResp);
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({
      error: "DallE Error: " + errorMsg,
      status: 500,
    });
  }
}
