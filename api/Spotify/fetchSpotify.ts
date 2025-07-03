import { getSpotifyTokenServer } from "@/helpers/constants/functions/spotify-server";
import axios from "axios";
type SpotifyRequestOptions = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};
export default async function fetchSpotify({
  endpoint,

  method = "GET",
  body = undefined,
}: SpotifyRequestOptions) {
  const token = await getSpotifyTokenServer();
  try {
    const response = await axios({
      url: `https://api.spotify.com/v1${endpoint}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching from Spotify API:", error);
    throw error;
  }
}
