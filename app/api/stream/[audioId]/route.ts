import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ audioId: string }> },
) {
  const { audioId } = await params;
  const range = request.headers.get("range");

  const audioPath = path.join(process.cwd(), "music", `${audioId}.mp3`);

  try {
    if (!fs.existsSync(audioPath)) {
      return new NextResponse("Audio file not found", { status: 404 });
    }
    console.log("Audio Path:", audioPath);

    const stat = fs.statSync(audioPath);
    const fileSize = stat.size;

    console.log("File Size:", fileSize);
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      console.log("Range parts:", parts);
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      console.log("Start:", start, "End:", end, "Chunk Size:", chunkSize);

      if (start >= fileSize || end >= fileSize) {
        return new NextResponse("Requested range not satisfiable", {
          status: 416,
        });
      }
      const stream = fs.createReadStream(audioPath, { start, end });

      return new NextResponse(stream as any, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } else {
      console.log("Sending full file");

      const stream = fs.createReadStream(audioPath);
      return new NextResponse(stream as any, {
        status: 200,
        headers: {
          "Accept-Ranges": "bytes",
          "Content-Length": fileSize.toString(),
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (e) {
    console.error("Error reading audio file:", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
