"use client";

import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { Track } from "@/helpers/constants/Interfaces/playerContext";
import { X } from "lucide-react";
import SongItem from "./SongItem";
export default function SongList() {
  const { trackList, setTrackList } = usePlayer();

  return (
    <div>
      <div className="border-border space-y-2 border-b p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">
            {trackList.length} tracks
          </span>
          <button
            onClick={() => setTrackList([])}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900 active:scale-95"
          >
            <X className="h-4 w-4 text-neutral-400" />
            <span>Clear</span>
          </button>
        </div>
      </div>
      <div className="flex max-h-screen flex-col p-4">
        {trackList.length === 0 ? (
          <div className="text-center text-neutral-400">No tracks</div>
        ) : (
          trackList?.map((track: Track, index: number) => (
            <SongItem key={track._id} track={track} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
