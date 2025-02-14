// import { ALLOWED_IMAGE_TYPES } from "@/constants/aws";
import deleteFileFromAWS from "@/lib/utils/aws/deleteFileFromAWS";
import uploadFileToAWS from "@/lib/utils/aws/uploadFileToAWS";
import { generateString } from "@/lib/utils/generateString";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// UPLOAD IMAGES TO AWS
export async function POST(req: Request) {
  try {
    const { userId, taskId, pngImageBuffer } = await req.json();

    if (!userId || !taskId || !pngImageBuffer) {
      return NextResponse.json({
        message: "UserId, TaskId, and Image Buffer are required.",
        status: 400,
      });
    }

    const buffer = Buffer.from(pngImageBuffer, "base64");

    const fileName = `${taskId}_image_${generateString()}.png`;
    const mimeType = "image/png";
    const folder = `${userId}/${taskId}`;

    const fileUrl = await uploadFileToAWS(buffer, fileName, mimeType, folder);

    if (fileUrl) {
      return NextResponse.json({
        fileUrl,
      });
    }
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: "File upload failed",
      error: error || "Unknown error",
    });
  }
}

// UPLOAD IMAGES TO AWS
/* export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const username = user?.username;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;

    if (!username || !file || !folder) {
      return NextResponse.json({
        message: "Username, File and Folder are required.",
        status: 400,
      });
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({
        message:
          "Invalid file type. Allowed types are jpg, jpeg, png, gif, webp",
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadFileToAWS(
      buffer,
      file.name,
      file.type,
      username,
      folder
    );

    if (fileUrl) {
      return NextResponse.json({
        fileUrl,
      });
    }
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: "File upload failed",
      error: error || "Unknown error",
    });
  }
} */

// DELETE IMAGES FROM AWS
export async function DELETE(req: Request) {
  try {
    const user = await currentUser();
    const username = user?.username;
    const { folder, fileName } = await req.json();

    if (!username || !folder || !fileName) {
      return NextResponse.json({
        message:
          "Folder, username, clerkId and fileName are required for deletion.",
        status: 400,
      });
    }

    await deleteFileFromAWS(username, fileName, folder);

    return NextResponse.json({
      message: "Image deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error deleting the image",
      error: error || "Unknown error",
    });
  }
}
