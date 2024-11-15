import {
  // dalleCreateVariation,
  dalleGenerateImage,
  //gptChatCompletition,
  openAiClient,
} from "@/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid or empty messages array.");
    }

    // const gpt4oResp = await gptChatCompletition({ messages });

    const gpt4oResp = await openAiClient.chat.completions.create({
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

    console.log("gpt4oResp: ", gpt4oResp);

    const choices = gpt4oResp.choices[0];
    const stopReason = choices.finish_reason;
    const toolCalls = choices.message.tool_calls;

    if (gpt4oResp && stopReason === "tool_calls" && toolCalls) {
      const fnName = toolCalls[0].function.name;

      console.log("toolCalls: ", toolCalls);
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
            title: "Dall-E-3 Error!",
            error: errMsg,
            status: 500,
          });
        }
      } else if (fnName === "variateImage") {
        console.log("dalleCreateVariation: ", gpt4oResp, toolCalls);

        return NextResponse.json({
          fnName: "dalleCreateVariation",
          gpt4oResp,
          toolCalls,
        });

        /* 
        const dalleVariate = await dalleCreateVariation({
          image: image,
        });

        return NextResponse.json({ dalleVariate }); 
        */
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
