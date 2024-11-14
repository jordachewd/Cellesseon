import OpenAI from "openai";
import { VariateImage, GenerateImage, Messages } from "@/types";

const OPENAIORG = process.env.OPENAI_ORG;
const OPENAIPRJ = process.env.OPENAI_PRJ;
const OPENAIKEY = process.env.OPENAI_KEY;

if (!OPENAIORG || !OPENAIPRJ || !OPENAIKEY) {
  throw new Error("Missing OpenAI environment variables.");
}

export const openAiClient = new OpenAI({
  organization: OPENAIORG,
  project: OPENAIPRJ,
  apiKey: OPENAIKEY,
});

export async function gptChatCompletition({ messages }: Messages) {

    

  const response = await openAiClient.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that answers questions kindly in a wise warm tone." +
          "You can generate images using DALL-E based on the user prompt." +
          "Provide expert-level writing explanation for each question.",
      },
      
      ...messages.map((msg) => ({
        role: msg.role,
        content:
          typeof msg.content === "string"
            ? msg.content
            : msg.content
                .map((c) =>
                  c.type === "text" ? c.text : `[image_url: [url: ${c.image_url.url}]]`
                )
                .join(" "),
      })),
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "generateImage",
          description:
            "Generates an image when requested by the user. Use this function if the user asks for an image," +
            "e.g., when prompted with 'generate image ...', 'create image ...' or anything related." +
            "USE PREVIOUS PROMPTS for generating images as well. Trim prompts to maximum 4000 characters.",
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
      {
        type: "function",
        function: {
          name: "variateImage",
          description:
            "Create Variation of image when requested by the user. Use this function if the user asks for Variation of images," +
            "e.g., when prompted with 'Create Variation for image ...', 'try another image ...' or anything related." +
            "USE PREVIOUS PROMPTS for editing images as well. Trim prompts to maximum 2000 characters.",
          strict: true,
          parameters: {
            type: "object",
            properties: {
              image: {
                type: "string",
                description: "The image to create variations for.",
              },
            },
            required: ["image"],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  return response;
}

export async function dalleGenerateImage({ prompt }: GenerateImage) {
  console.log("dalleGenerateImage: ", prompt);

  const response = await openAiClient.images.generate({
    prompt: prompt,
    model: "dall-e-3",
    size: "1024x1024",
    n: 1,
  });

  return response;
}

export async function dalleCreateVariation({ image }: VariateImage) {
  console.log("dalleCreateVariation: ", image);

  const response = await openAiClient.images.createVariation({
    image: image,
    size: "1024x1024",
    n: 1,
  });

  return response;
}
