import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useUploadFile } from "./upload";

export function useCreateTracks() {
  const uploadFile = useUploadFile();
  const createTrack = useMutation(api.tracks.createTrack);

  return async ({
    trackList,
    userId,
    albumId,
  }: {
    trackList: File[];
    userId: Id<"users">;
    albumId: Id<"albums">;
  }) => {
    return Promise.all(
      trackList.map(async (item, index) => {
        const trackStorageId = await uploadFile(item);

        return createTrack({
          title: item.name.replace(/\.[^/.]+$/, ""),
          artistId: userId,
          albumId: albumId,
          featuredArtists: [],
          duration: 0,
          order: index + 1,
          trackUrl: trackStorageId,
          videoUrl: undefined,
        });
      }),
    );
  };
}
