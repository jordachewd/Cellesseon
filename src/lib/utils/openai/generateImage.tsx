import { openAiClient } from "@/constants/openai";
import { ContentItem, Message, MessageRole } from "@/types";

interface GenerateImageParams {
  prompt: string;
  role: MessageRole;
  taskId?: string | null;
}

export async function generateImage({
  prompt,
  role,
  taskId,
}: GenerateImageParams) {
  try {
    const response = await openAiClient.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      prompt,
      n: 1,
    });

    console.log("\x1b[36m%s\x1b[0m", "generateImage response: ", response);

    if (!response.data?.length) {
      throw new Error("No images returned from Image Generator API.");
    }

    console.log("\x1b[36m%s\x1b[0m", "generateImage taskId: ", taskId);

    const respData = response.data[0];
    // const imageUrl = respData.url;

    //  console.log("\x1b[36m%s\x1b[0m", "generateImage: ", respData);

    /*     const awsResp = await fetch("/api/aws", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, taskId, imageUrl }),
    }); */

    const taskData: Message = {
      whois: role,
      role,
      content: [
        {
          type: "text",
          text: "revised_prompt" in respData ? respData.revised_prompt : prompt,
        },
        {
          type: "image_url",
          image_url: "url" in respData ? respData.url : null,
        },
      ] as ContentItem[],
    };

    return JSON.stringify({ taskData });
  } catch (error) {
    const errMsg = error instanceof Error && error.message;
    const aiError = {
      title: "AI Image Generator error!",
      error: errMsg || "Unexpected error occurred.",
      status: 500,
    };

    return JSON.stringify({ aiError });
  }
}
