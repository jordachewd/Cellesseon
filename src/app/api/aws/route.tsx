import deleteFileFromAWS from "@/lib/utils/aws/deleteFileFromAWS";
import uploadFileToAWS from "@/lib/utils/aws/uploadFileToAWS";
import { generateString } from "@/lib/utils/generateString";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 },
      );
    }

    const { taskId, imgBuffer } = await req.json();

    if (!taskId || !imgBuffer) {
      return NextResponse.json(
        { message: "TaskId and image buffer are required." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(imgBuffer, "base64");
    const fileName = `${taskId}_image_${generateString()}.png`;
    const mimeType = "image/png";
    const folder = `${user.id}/${taskId}`;

    const fileUrl = await uploadFileToAWS(buffer, fileName, mimeType, folder);

    if (!fileUrl) {
      throw new Error("uploadFileToAWS returned undefined");
    }

    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error: unknown) {
    console.error("AWS API Error:", error);

    return NextResponse.json(
      {
        message: "File upload failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 },
      );
    }

    const { folder, fileName } = await req.json();

    if (!folder || !fileName) {
      return NextResponse.json(
        { message: "Folder and fileName are required for deletion." },
        { status: 400 },
      );
    }

    await deleteFileFromAWS(user.id, fileName, folder);

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting the image",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
