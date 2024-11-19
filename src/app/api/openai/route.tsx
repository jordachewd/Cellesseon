import fs from "fs";
import path from "path";
import sharp from "sharp";

import {
  openAiClient,
  dalleGenerateImage,
} from "@/app/api/openai/openAiClient";

import { NextResponse } from "next/server";
import { Uploadable } from "openai/uploads.mjs";
import { systemMsg } from "@/constants";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid or empty messages array.");
    }

    console.log("API messages: ", messages);

    const gpt4oResp = await openAiClient.chat.completions.create({
      user: "celeseon_user",
      model: "gpt-4o",
      temperature: 0.5,
      messages: [...systemMsg, ...messages],
      n: 1,
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
                image_url: {
                  type: "string",
                  description: "The url of the image to create variations for.",
                },
              },
              required: ["image_url"],
              additionalProperties: false,
            },
          },
        },
      ],
    });

    const choices = gpt4oResp.choices[0];
    const stopReason = choices.finish_reason;
    const toolCalls = choices.message.tool_calls;

    if (gpt4oResp && stopReason === "tool_calls" && toolCalls) {
      const fnName = toolCalls[0].function.name;

      console.log("fnName: ", fnName);

      if (fnName === "generateImage") {
        const parsedArgs = JSON.parse(toolCalls[0].function.arguments);
        try {
          const dalleGenerate = await dalleGenerateImage({
            prompt: parsedArgs.prompt,
          });

          return NextResponse.json({ ...gpt4oResp, dalle: dalleGenerate });
        } catch (error) {
          const errMsg =
            error instanceof Error
              ? error.message
              : "An unexpected DALL·E 3 error occurred.";
          return NextResponse.json({
            title: "DALL·E 3 Error!",
            error: errMsg,
            status: 500,
          });
        }
      } else if (fnName === "variateImage") {
        const parsedArgs = JSON.parse(toolCalls[0].function.arguments);
        const varImage = parsedArgs.image_url;

        console.log("parsedArgs: ", parsedArgs);
        console.log("variateImage (received): ", varImage);

        try {
          // Decode base64 image and save it to a temporary file
          const base64Data = varImage.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, "base64");

          // Convert to PNG and ensure it's less than 1024x1024
          const processedImage = await sharp(buffer)
            .resize(1024, 1024, { fit: "inside" })
            .toFormat("png")
            .toBuffer();
          const tempFilePath = path.join(process.cwd(), "temp.png");
          fs.writeFileSync(tempFilePath, processedImage);

          // console.log("processedImage: ", processedImage);

          const dalleVariate = await openAiClient.images.createVariation({
            image: fs.createReadStream(tempFilePath) as Uploadable,
            model: "dall-e-2",
            size: "1024x1024",
            n: 1,
          });

          // Remove temporary file
          fs.unlinkSync(tempFilePath);
          return NextResponse.json({
            ...gpt4oResp,
            dalleVariate: dalleVariate,
          });
        } catch (error) {
          const errMsg =
            error instanceof Error
              ? error.message
              : "An unexpected DALL·E 2 error occurred.";
          return NextResponse.json({
            title: "DALL·E 2 Error!",
            error: errMsg,
            status: 500,
          });
        }
      } else {
        return NextResponse.json(gpt4oResp);
      }
    }

    return NextResponse.json(gpt4oResp);
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "An unexpected GPT-4o error occurred";
    return NextResponse.json({
      title: "Gpt-4o Error",
      error: errMsg,
      status: 500,
    });
  }
}
