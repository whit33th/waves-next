import fetchSpotify from "../fetchSpotify";

export default async function getUser() {
  const URL = "/me";
  const res = await fetchSpotify({
    endpoint: URL,
    method: "GET",
  });
  console.log("Me:", res);
}
