import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

export function useUploadFile() {
  const uploadFile = useMutation(api.files.generateUploadUrl);

  return async (file: File) => {
    const postUrl = await uploadFile();

    const res = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    const { storageId } = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to upload file: ${res.statusText}`);
    }
    if (!storageId) {
      throw new Error("Failed to upload file, no storage ID returned");
    }

    return storageId as Id<"_storage">;
  };
}
