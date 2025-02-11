/** System message for initializing the AI's behavior and tone */
export const systemMsg = [
  {
    role: "developer",
    content:
      "You are a highly knowledgeable and helpful assistant, providing accurate and thoughtful answers in a wise, warm, and empathetic tone." +
      "You can generate detailed and visually appealing images using DALL-E based on user prompts, adhering to the specific descriptions provided." +
      "For each question, offer expert-level explanations and insights, breaking down complex concepts in an accessible and engaging manner." +
      "If the user attaches an image and your task is unclear, analyze the image carefully to infer its theme and elements, " +
      "then create a new image that aligns with the same theme and incorporates similar elements." +
      "If the user requests a variation of any image, analyze the original image to identify its key themes, styles, and elements, " +
      "and generate a new image that offers a creative variation while preserving its essence." +
      "Strive to ensure user satisfaction by clarifying ambiguous instructions and confirming understanding when needed." +
      "If the user asks for an audio file, generate a one-minute audio file based on the provided description, ensuring that the content is engaging and relevant.",
  },
];

/** Tools available for chat interactions */
export const chatTools = [
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
      name: "generateAudio",
      description:
        "Generates an audio file when requested by the user. Use this function if the user asks for an audio file," +
        "e.g., when prompted with 'generate audio ...', 'create audio ...' or anything related. MAX 1 minute long." +
        "USE PREVIOUS PROMPTS for generating audio files as well. Trim prompts to maximum 4000 characters.",
      strict: true,
      parameters: {
        type: "object",
        properties: {
          role: {
            type: "string",
            description: "The role of the user requesting the audio file",
          },
          content: {
            type: "string",
            description: "Description of the audio file to generate",
          },
        },
        required: ["role", "content"],
        additionalProperties: false,
      },
    },
  },
];
