"use client";
import { PlayerContext } from "@/contexts/PlayerContext";
import { Play, Pause } from "lucide-react";
import { useContext } from "react";

export function PlayButton() {
  const { isPlaying, play, pause } = useContext(PlayerContext);
  return (
    <button
      onClick={isPlaying ? pause : play}
      className="rounded-full bg-neutral-100 p-3.5 hover:opacity-90"
    >
      {isPlaying ? (
        <Pause className="fill-neutral-900 text-neutral-900" />
      ) : (
        <Play className="fill-neutral-900 text-neutral-900" />
      )}
    </button>
  );
}
