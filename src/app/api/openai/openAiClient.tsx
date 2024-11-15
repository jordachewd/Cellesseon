import OpenAI from "openai";
import { VariateImage, GenerateImage } from "@/types";

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

export async function dalleGenerateImage({ prompt }: GenerateImage) {
  console.log("dalleGenerateImage: ", prompt);

  const response = await openAiClient.images.generate({
    prompt: prompt,
    model: "dall-e-3",
    size: "1024x1024",
    style: "natural",
    user: "celeseon_user",
    n: 1,
  });

  return response;
}

export async function dalleCreateVariation({ image }: VariateImage) {
  console.log("dalleCreateVariation: ", image);

  const response = await openAiClient.images.createVariation({
    image: image,
    model: "dall-e-2",
    size: "1024x1024",
    user: "celeseon_user",
    n: 1,
  });

  return response;
}
