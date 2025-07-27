import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackId: Id<"_storage"> }> },
) {
  const { trackId } = await params;

  const fileUrl = await fetchQuery(api.tracks.getTrackUrl, {
    trackId,
  });

  if (!fileUrl) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const convexRes = await fetch(fileUrl, {
    headers: {
      Range: request.headers.get("Range") || "",
    },
  });

  return new NextResponse(convexRes.body, {
    status: convexRes.status,
    headers: convexRes.headers,
  });
}
