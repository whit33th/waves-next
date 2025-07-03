import { cookies } from "next/headers";

export async function getSpotifyTokenServer(): Promise<string> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("spotify_token");

  if (tokenCookie) {
    try {
      const tokenData = JSON.parse(tokenCookie.value);
      if (Date.now() < tokenData.expires_at) {
        return tokenData.access_token;
      }
    } catch (error) {
      console.error("Error parsing token from cookies:", error);
    }
  }

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_DOMAIN
      : "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/spotify/token`);
  const data = await response.json();

  return data.access_token;
}
