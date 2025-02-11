import { openAiClient } from "@/constants/openai";
import { ContentItem, Message, MessageRole } from "@/types";
import manageErrors from "./manageErrors";
import { auth } from "@clerk/nextjs/server";

interface GenerateImageParams {
  prompt: string;
  role: MessageRole;
}

export async function generateImage({ prompt, role }: GenerateImageParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const response = await openAiClient.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      prompt,
      n: 1,
    });

    if (!response.data?.length) {
      throw new Error("No images returned from Image API.");
    }

    const respData = response.data[0];
    // const imageUrl = respData.url;

    //  console.log("\x1b[36m%s\x1b[0m", "generateImage: ", respData);

    /*     const awsResp = await fetch("/api/aws", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, taskId, imageUrl }),
    }); */

    const content: ContentItem[] = [
      {
        type: "text",
        text: "revised_prompt" in respData ? respData.revised_prompt : "",
      },
      {
        type: "image_url",
        image_url: "url" in respData ? respData.url : "",
      },
    ];

    const imgData: Message = {
      whois: role,
      role,
      content,
    };

    return { taskData: imgData };
  } catch (error) {
    return manageErrors({ title: "AI image generator error!", error });
  }
}
