import fetchSpotify from "../fetchSpotify";

export default async function getTopTracks() {
  const URL = "/search?q=Drake&type=artist&market=US&limit=1&offset=0";
  const res = await fetchSpotify({
    endpoint: URL,
    method: "GET",
  });
  console.log("Top Tracks:", res);
}
