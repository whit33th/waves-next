import { Music, Upload } from "lucide-react";
import React from "react";

export default function AudioInput({
  handleAddTracks,
}: {
  handleAddTracks: (files: FileList | null) => void;
}) {
  return (
    <div>
      <label className="text-text-primary mb-2 block font-medium">
        <Music className="mr-2 inline h-4 w-4" />
        Audio File *
      </label>
      <div className="relative">
        <input
          type="file"
          className="sr-only"
          accept="audio/mp3,.mp3"
          id="track-upload"
          multiple
          onChange={(e) => {
            handleAddTracks(e.currentTarget.files);
            e.currentTarget.value = "";
          }}
        />
        <label
          htmlFor="track-upload"
          className="border-border/30 bg-input-bg/90 hover:border-primary block w-full cursor-pointer rounded-lg border-2 border-dashed p-4 backdrop-blur-md transition-all duration-300 hover:bg-black/20"
        >
          <div className="text-text-secondary flex flex-col items-center justify-center">
            <Upload className="mb-2 h-6 w-6" />
            <span>Select MP3 file</span>
            <span className="mt-1 text-xs">Maximum 10MB</span>
          </div>
        </label>
      </div>
    </div>
  );
}
