import { NextResponse } from "next/server";

let tokenCache: {
  token: any;
  expiresAt: number;
} | null = null;

export async function GET() {
  try {
    if (tokenCache && Date.now() < tokenCache.expiresAt) {
      return NextResponse.json(tokenCache.token);
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify token");
    }

    const data = await response.json();

    tokenCache = {
      token: data,
      expiresAt: Date.now() + 50 * 60 * 1000,
    };

    const response_next = NextResponse.json(data);
    response_next.headers.set(
      "Cache-Control",
      "public, max-age=3000, s-maxage=3000",
    );

    return response_next;
  } catch (error) {
    console.error("Spotify token error:", error);
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 },
    );
  }
}
