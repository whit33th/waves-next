import axios from "axios";
export default async function getSpotifyToken() {
  const URL = `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`;

  const token = await axios.post(URL, null, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });
  if (token.status !== 200) {
    throw new Error("Failed to fetch Spotify token");
  }

  return token.data;
}
