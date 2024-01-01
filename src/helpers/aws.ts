export * as Aws from "./aws";

import { IGetPresign, IPutPresign } from '../interfaces'
import crypto from "crypto";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";

const s3 = new S3Client({})

export async function upload(data: IPutPresign) {
  const { userId, fileData, fileType } = data
  const bucketName = process.env.AWS_BUCKET_NAME
  const filename = crypto.randomUUID() + getExtension(fileType); // Generate a unique filename

  // Upload the image to S3
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: filename,
    Body: fileData,
    ContentType: fileType,
    ACL: 'public-read', // Set ACL to public-read for public access
  });

  await s3.send(putCommand);

  // Generate the public URL for the uploaded image
  const imageUrl = `https://${bucketName}.s3.amazonaws.com/${filename}`;
  return { props: { loaded: true, imageUrl: imageUrl } };

}


function getExtension(contentType: string): string {
  switch (contentType) {
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/gif':
      return '.gif';
    default:
      return '';
  }
}

