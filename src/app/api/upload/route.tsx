/**
 * Handles file upload requests.
 *
 * The POST function processes incoming file upload requests. It extracts the file from the request,
 * saves it to the "public/uploads" directory with a unique name, and returns the file name in the response.
 *
 * If the file is not provided in the request, it responds with an error message and a 400 status code.
 * If any error occurs during the file handling process, it responds with a 500 status code and an error message.
 *
 * @param {NextRequest} req - The incoming request object containing the file to be uploaded.
 * @returns {Promise<NextResponse>} - A promise that resolves to a response object containing the file name or an error message.
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded.", status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `uploaded_file_${Date.now()}.png`;
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
