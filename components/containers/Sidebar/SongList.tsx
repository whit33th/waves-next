"use client";
import { musicList } from "@/helpers/data/musicData";
import SongItem from "./SongItem";

export default function SongList() {
  return (
    <div className="flex max-h-screen flex-col overflow-y-auto">
      {musicList.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}
