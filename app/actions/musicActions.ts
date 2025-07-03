"use server";
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3"; // Importing ObjectCannedACL
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
    accountId: process.env.R2_ACCOUNT_ID!,
  },
});

export async function getAllTracks() {
  return await prisma.track.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getUserTracks(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      tracks: {
        include: {
          track: true,
        },
      },
    },
  });
}

export async function addTrackToUser(userId: string, trackId: string) {
  return await prisma.userTrack.create({
    data: { userId, trackId },
  });
}

// export async function uploadTrack(file: File) {
//   const fileName = `${Date.now()}-${file.name}`;
//   const fileBuffer = Buffer.from(await file.arrayBuffer());

//   const params = {
//     Bucket: process.env.R2_BUCKET_NAME!,
//     Key: fileName,
//     Body: fileBuffer,
//     ACL: ObjectCannedACL.public_read,
//     ContentType: file.type,
//   };

//   // Upload file to S3 using v3 PutObjectCommand
//   const command = new PutObjectCommand(params);
//   await s3.send(command); // Send the command using s3 client

//   // Form the file URL using the endpoint and file name
//   const fileUrl = `${process.env.R2_DEV_ENDPOINT}/${encodeURIComponent(fileName)}`;

//   // Create a record in the database with the file URL
//   const track = await prisma.track.create({
//     data: {
//       title: file.name.split(".")[0],
//       artist: "Unknown", // Or replace with an actual artist if available
//       fileUrl: fileUrl,
//     },
//   });

//   return track;
// }

export async function uploadTrack(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: file.name,
    Body: buffer,
    ACL: ObjectCannedACL.public_read,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const fileUrl = `${process.env.R2_DEV_ENDPOINT!}/${encodeURIComponent(file.name)}`;

  const track = prisma.track.create({
    data: {
      title: file.name,
      artist: "Unknown",
      fileUrl: fileUrl,
    },
  });
  return track;
}
