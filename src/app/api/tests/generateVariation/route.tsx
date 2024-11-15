import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_KEY;

export async function POST(request: Request) {
  const body = await request.json();
  const { imageName } = body;

  console.log("\x1b[43m api/tests/generateVariation \x1b[0m");
  console.log("\x1b[33m imageName:  \x1b[0m", imageName);

  if (!imageName) {
    return NextResponse.json({ error: "Image name is required.", status: 400 });
  }

  const imagePath = path.join(process.cwd(), "public", "uploads", imageName);

  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));
    formData.append("model", "dall-e-2");
    formData.append("n", "1");
    formData.append("size", "1024x1024");

    const response = await axios.post(
      "https://api.openai.com/v1/images/variations",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return NextResponse.json({ url: response.data.data[0].url });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to generate image variation.",
      status: 500,
      error,
    });
  }
}
