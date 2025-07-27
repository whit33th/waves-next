"use client";
import { Music } from "lucide-react";
import Track from "./track";
import { unstable_Activity as Activity } from "react";

interface TrackListProps {
  tracks: File[];
  setTracks: React.Dispatch<React.SetStateAction<File[]>>;
  handleDeleteTrack: (index: number) => void;
}
export default function TrackList({
  tracks,
  setTracks,
  handleDeleteTrack,
}: TrackListProps) {
  const isEmpty = tracks.length === 0;
  return (
    <div className="bg-input-bg/90 h-full rounded-lg p-3 shadow-lg">
      {isEmpty && (
        <div className="text-text-primary flex h-full flex-col items-center justify-center gap-2">
          <Music className="h-8 w-8" />

          <h2 className="">No tracks added yet.</h2>
        </div>
      )}

      <Activity mode={isEmpty ? "hidden" : "visible"}>
        <ul className="space-y-2.5" onDragOver={(e) => e.preventDefault()}>
          {!isEmpty && (
            <button
              type="reset"
              className="w-full text-right text-sm"
              onClick={() => setTracks([])}
            >
              Delete all tracks
            </button>
          )}
          {tracks.map((track, index) => (
            <Track
              key={track.name}
              index={index}
              track={track}
              onDelete={() => handleDeleteTrack(index)}
              draggable
              onDragStart={(e, fromIdx) => {
                e.dataTransfer.setData("text/plain", fromIdx.toString());
              }}
              onDrop={(e, toIdx) => {
                e.preventDefault();
                const from = Number(e.dataTransfer.getData("text/plain"));
                if (from === toIdx) return;
                setTracks((prev) => {
                  const updated = [...prev];
                  const [moved] = updated.splice(from, 1);
                  updated.splice(toIdx, 0, moved);
                  return updated;
                });
              }}
              onDragOver={(e) => e.preventDefault()}
            />
          ))}
        </ul>
      </Activity>
    </div>
  );
}
