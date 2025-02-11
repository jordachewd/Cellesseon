import { awsS3Client } from "@/constants/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

// Function to upload images to AWS S3
export default async function uploadFileToAWS(
  file: Buffer,
  fileName: string,
  contentType: string,
  username: string,
  folder: string
): Promise<string> {
  const bucketName = process.env.AWS_S3_BUCKET as string;
  const filePath = `${username}/${folder}/${fileName}`;

  const params = {
    Bucket: bucketName,
    Key: filePath,
    Body: file,
    ContentType: contentType,
  };

  const putObjectToAWS = new PutObjectCommand(params);

  await awsS3Client.send(putObjectToAWS);

  const fileUrl = `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${filePath}`;
  return fileUrl;
}
