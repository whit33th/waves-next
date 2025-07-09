"use client";
import { PlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import { SongItemProps } from "@/helpers/constants/Interfaces/song";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface SongItemPropsWithIndex {
  song: SongItemProps;
  index?: number;
  isCurrentlyPlaying?: boolean;
}

export default function SongItem({
  song,
  index,
  isCurrentlyPlaying,
}: SongItemPropsWithIndex) {
  const { setTrack, track, handlePlayChosen, isPlaying } =
    useContext(PlayerContext);

  const isCurrentTrack = track?.id === song.id;
  const showAsPlaying = isCurrentlyPlaying || isCurrentTrack;

  const handlePlay = () => {
    handlePlayChosen(song);
  };

  return (
    <div
      onDoubleClick={handlePlay}
      className={`group flex cursor-pointer items-center justify-between rounded-lg p-2 transition select-none hover:bg-neutral-900 ${
        showAsPlaying ? "bg-neutral-800" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 gap-4">
        <div
          onClick={handlePlay}
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center"
        >
          <Image
            className="aspect-square rounded object-cover"
            src={song.image}
            alt={song.title}
            width={40}
            height={40}
          />
          <button className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-neutral-900 opacity-0 transition *:fill-current group-hover:opacity-100">
            {showAsPlaying && isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3
            className={`truncate text-sm ${
              showAsPlaying ? "text-white" : "text-neutral-200"
            }`}
          >
            {song.title}
          </h3>
          <Link
            href={`/artist/${decodeURI(song.artist)}`}
            className="w-fit truncate text-xs text-neutral-500 hover:underline"
          >
            {song.artist}
          </Link>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        <p className="text-xs text-neutral-500">4:13</p>
      </div>
    </div>
  );
}
