import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useUploadFile } from "./upload";

export function useCreateAlbum() {
  const uploadCover = useUploadFile();
  const createAlbum = useMutation(api.albums.createAlbum);

  return async ({
    userId,
    albumTitle,
    cover,
  }: {
    userId: Id<"users">;
    albumTitle: string;
    cover: File;
  }) => {
    const coverStorageId = await uploadCover(cover);

    const album = await createAlbum({
      artistId: userId,
      title: albumTitle,
      cover: coverStorageId,
      description: "",
    });
    return album;
  };
}
