import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_THUMBNAIL_BUCKET,
    });

    const response = await s3Client.send(command);
    const thumbnails =
      response.Contents?.map((file) => ({
        key: file.Key,
        url: `https://${process.env.AWS_S3_THUMBNAIL_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
      })) || [];

    return NextResponse.json(thumbnails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching thumbnails" },
      { status: 500 }
    );
  }
}
