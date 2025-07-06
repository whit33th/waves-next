"use client";

import { musicList } from "@/helpers/data/musicData";
import { PlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import { useContext } from "react";
import SongItem from "./SongItem";

export default function SongList() {
  const { track } = useContext(PlayerContext);

  return (
    <div className="flex max-h-screen flex-col space-y-1 overflow-y-auto">
      {musicList.map((song, index) => (
        <SongItem
          key={`${song.id}-${index}`}
          song={song}
          index={index}
          isCurrentlyPlaying={track?.id === song.id}
        />
      ))}
    </div>
  );
}
