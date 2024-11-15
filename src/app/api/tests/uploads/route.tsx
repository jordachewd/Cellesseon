import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  console.log("\x1b[42m api/tests/uploads \x1b[0m");

  try {
    const formData = await request.formData();

    console.log("\x1b[32m API formData:  \x1b[0m", formData);

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded.", status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `uploaded_image_${Date.now()}.png`;
    const filePath = path.join(uploadsDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ fileName });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to upload file.",
      status: 500,
      error,
    });
  }
}
