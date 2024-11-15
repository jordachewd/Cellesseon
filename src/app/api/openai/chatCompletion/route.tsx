import axios from "axios";
import { NextResponse } from "next/server";
import messagesConfig from "../messagesConfig";
import { Messages } from "@/types";

const OPENAIKEY = process.env.OPENAI_KEY;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
  console.log("\x1b[33m ------------------ \x1b[0m");
  console.log("\x1b[43m API chatCompletion \x1b[0m");

  const { messages }: Messages = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({
      title: "OpenAI chatCompletion API Error",
      error: "Invalid or empty messages array.",
      status: 400,
    });
  }

  try {
    const payload = {
      user: "celeseon_user",
      model: "gpt-4o",
      temperature: 0.5,
      messages: [...messagesConfig, ...messages],
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
      ],
    };

    const chatResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAIKEY}`,
        },
      }
    );

    if (!chatResponse.data) {
      throw new Error("OpenAI Server does not respond.");
    }

    const choices = chatResponse.data.choices[0];
    const stopReason = choices.finish_reason;
    const toolCalls = choices.message.tool_calls;

    if (stopReason === "tool_calls" && toolCalls) {
      const fnName = toolCalls[0].function.name;

      console.log("\x1b[33m fnName:  \x1b[0m", fnName);

      if (fnName === "generateImage") {
        const parsedArgs = JSON.parse(toolCalls[0].function.arguments);

        try {
          /*           const createImgResp = await fetch(
            `${BASEURL}/api/openai/createImage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                prompt: parsedArgs.prompt,
              }),
            }
          ); */

          /*           const createImgResp = await axios.post(
            `${BASEURL}/api/openai/createImage`,
            {
              prompt: parsedArgs.prompt,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          ); */

          const createImgResp = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
              prompt: parsedArgs.prompt,
              user: "celeseon_user",
              model: "dall-e-3",
              size: "1024x1024",
              style: "natural",
              n: 1,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAIKEY}`,
              },
            }
          );

          if (!createImgResp.data) {
            throw new Error("OpenAI Server does not respond.");
          }

          console.log("\x1b[43m createImgResp:  \x1b[0m", createImgResp.data);

          return NextResponse.json({
            ...chatResponse.data,
            dalle: createImgResp.data,
          });
        } catch (error) {
          const errMsg =
            error instanceof Error
              ? error.message
              : "An unexpected createImageerror occurred.";
          return NextResponse.json({
            title: "createImage Error!",
            error: errMsg,
            status: 500,
          });
        }
      } else {
        return NextResponse.json(chatResponse.data);
      }
    }

    console.log("\x1b[33m ------------------ \x1b[0m");
    return NextResponse.json(chatResponse.data);
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "An unexpected OpenAI chatCompletion API error occurred.";
    console.log("\x1b[33m OpenAI chatCompletion API error:  \x1b[0m", error);

    return NextResponse.json({
      title: "OpenAI chatCompletion API Error",
      error: errMsg,
      status: 500,
    });
  }
}
