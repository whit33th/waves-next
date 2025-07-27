"use client";

import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
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
          <button onClick={() => setTrackList([])}>CLEAR</button>
        </div>
      </div>
      <div className="flex max-h-screen flex-col space-y-1 p-4">
        {trackList?.map((track, index) => (
          <SongItem key={track._id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}
