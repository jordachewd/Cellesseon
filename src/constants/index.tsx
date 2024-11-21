import OpenAI from "openai";

/** Environment variable for the OpenAI organization ID */
export const OPENAIORG = process.env.OPENAI_ORG;

/** Environment variable for the OpenAI project ID */
export const OPENAIPRJ = process.env.OPENAI_PRJ;

/** Environment variable for the OpenAI API key */
export const OPENAIKEY = process.env.OPENAI_KEY;

/** Public API base URL for the application */
export const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** Ensures required environment variables are defined */
if (!OPENAIORG || !OPENAIPRJ || !OPENAIKEY) {
  throw new Error("Missing OpenAI environment variables.");
}

/** OpenAI client configuration using environment variables */
export const openAiClient = new OpenAI({
  organization: OPENAIORG,
  project: OPENAIPRJ,
  apiKey: OPENAIKEY,
});

/** Headers used for API requests, including authentication */
export const apiHeaders = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAIKEY}`,
  },
};

/** System message for initializing the AI's behavior and tone */
export const systemMsg = [
  {
    role: "system",
    content:
      "You are a highly knowledgeable and helpful assistant, providing accurate and thoughtful answers in a wise, warm, and empathetic tone." +
      "You can generate detailed and visually appealing images using DALL-E based on user prompts, adhering to the specific descriptions provided." +
      "For each question, offer expert-level explanations and insights, breaking down complex concepts in an accessible and engaging manner." +
      "If the user attaches an image and your task is unclear, analyze the image carefully to infer its theme and elements, " +
      "then create a new image that aligns with the same theme and incorporates similar elements." +
      "If the user requests a variation of any image, analyze the original image to identify its key themes, styles, and elements, " +
      "and generate a new image that offers a creative variation while preserving its essence." +
      "Strive to ensure user satisfaction by clarifying ambiguous instructions and confirming understanding when needed.",
  },
];

/** Payload configuration for creating images using DALL-E */
export const createImgPayload = {
  user: "celeseon_user",
  model: "dall-e-3",
  size: "1024x1024",
  // style: "natural", // Uncomment to specify a style if needed
  n: 1, // Number of images to generate
};

/** Payload configuration for creating image variations using DALL-E */
export const variateImgPayload = {
  user: "celeseon_user",
  model: "dall-e-2",
  size: "1024x1024",
  n: 1, // Number of image variations to generate
};

/** Configuration payload for chat interactions with GPT model */
export const chatPayload = {
  user: "celeseon_user",
  model: "gpt-4o",
  temperature: 0.5, // Controls randomness in responses
  n: 1, // Number of chat responses to generate
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
  ],
};
