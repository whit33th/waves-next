"use client";
import { PlayerContext } from "@/contexts/PlayerContext";
import { SongItemProps } from "@/helpers/constants/Interfaces/song";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function SongItem({ song }: { song: SongItemProps }) {
  const { setTrack, track, handlePlayChosen, isPlaying } =
    useContext(PlayerContext);

  const isCurrentTrack = track?.id === song.id;

  return (
    <div
      onDoubleClick={() => handlePlayChosen(song)}
      className={`group flex cursor-pointer items-center justify-between p-2 transition select-none hover:bg-neutral-900 ${
        isCurrentTrack ? "bg-neutral-800" : ""
      }`}
    >
      <div className="flex gap-4">
        <div
          onClick={() => handlePlayChosen(song)}
          className="relative flex h-10 w-10 items-center justify-center"
        >
          <Image
            className="aspect-square rounded object-cover"
            src={song.image}
            alt={song.title}
            width={40}
            height={40}
          />
          <button className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-neutral-900 opacity-0 transition *:fill-current group-hover:opacity-100">
            {isCurrentTrack && isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <h3
            className={`max-w-[16ch] truncate text-sm ${
              isCurrentTrack ? "text-white" : "text-neutral-200"
            }`}
          >
            {song.title}
          </h3>
          <Link
            href={`/artist/${decodeURI(song.artist)}`}
            className="text-xs text-neutral-500 hover:underline"
          >
            <p className="text-xs text-neutral-500">{song.artist}</p>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-xs text-neutral-500">4:13</p>
      </div>
    </div>
  );
}
