import { openAiClient } from "@/constants/openai";
import { ContentItem, Message, MessageRole } from "@/types";
import { handleError } from "../handleError";
// import sharp from "sharp";

/* This route should run on the Edge Runtime.*/
// export const runtime = "edge";

interface GenerateImageParams {
  prompt: string;
  role: MessageRole;
  taskId?: string | null;
  userId: string;
}

/* async function convertToPng(imageUrl: string): Promise<Buffer | undefined> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch image");

    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    return sharp(imageBuffer).png().toBuffer();
  } catch (error) {
    handleError({ error, source: "convertToPng" });
  }
} */

export async function generateImage({
  prompt,
  role,
  //taskId,
  //userId,
}: GenerateImageParams) {
  try {
    const response = await openAiClient.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      prompt,
      n: 1,
    });

    if (!response || !response.data?.length) {
      throw new Error("The Image Generator API did not return any images.");
    }

    console.log("\x1b[33m%s\x1b[0m", "generateImage response: ", response);

    const respData = response.data[0];
    const imageUrl = respData.url;

    // Convert image to PNG
    if (!imageUrl) {
      throw new Error("Image URL is undefined");
    }

   // console.log("\x1b[33m%s\x1b[0m", "generateImage imageUrl: ", imageUrl);

  /*   const pngImageBuffer = await convertToPng(imageUrl);

    if (!pngImageBuffer) {
      throw new Error("Failed to convert image to PNG");
    }

    const awsResp = await fetch("/api/aws", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        taskId,
        pngImageBuffer: pngImageBuffer.toString("base64"),
      }),
    });

    if (!awsResp.ok) {
      throw new Error("Failed to upload image to AWS");
    }

    console.log(
      "\x1b[33m%s\x1b[0m",
      "generateImage awsResp: ",
      JSON.parse(JSON.stringify(awsResp))
    ); */

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
          image_url: { url: "url" in respData ? respData.url : null },
        },
      ] as ContentItem[],
    };

    return JSON.stringify({ taskData });
  } catch (error) {
    handleError({ error, source: "generateImage" });
  }
}
