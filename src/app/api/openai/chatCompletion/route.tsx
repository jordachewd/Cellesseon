import axios from "axios";
import { NextResponse } from "next/server";
import { Messages } from "@/types";
import {
  apiHeaders,
  chatPayload,
  createImgPayload,
  systemMsg,
} from "@/constants";

// Required for the Edge Runtime
export const runtime = "edge";

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
    const chatResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      { ...chatPayload, messages: [...systemMsg, ...messages] },
      apiHeaders
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
          const createImgResp = await axios.post(
            "https://api.openai.com/v1/images/generations",
            { ...createImgPayload, prompt: parsedArgs.prompt },
            apiHeaders
          );

          if (!createImgResp.data) {
            throw new Error("OpenAI Server does not respond.");
          }

          return NextResponse.json({
            ...chatResponse.data,
            dalle: createImgResp.data,
          });
        } catch (error) {
          const defaultErr = "An unexpected createImage API error occurred.";
          const errMsg = error instanceof Error ? error.message : defaultErr;

          return NextResponse.json({
            title: "createImage Error!",
            error: errMsg,
            status: 500,
          });
        }
      } else if (fnName === "variateImage") {





        
        const parsedArgs = JSON.parse(toolCalls[0].function.arguments);
        const varImage = parsedArgs.image;

        console.log("\x1b[43m parsedArgs: \x1b[0m", parsedArgs);
        console.log("\x1b[43m variateImage (received): \x1b[0m", varImage);

        /*         
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
      */
      } else {
        return NextResponse.json(chatResponse.data);
      }
    }

    return NextResponse.json(chatResponse.data);
  } catch (error) {
    const defaultErr = "An unexpected chatCompletion API error occurred.";
    const errMsg = error instanceof Error ? error.message : defaultErr;

    return NextResponse.json({
      title: "Chat completion API Error",
      error: errMsg,
      status: 500,
    });
  }
}
