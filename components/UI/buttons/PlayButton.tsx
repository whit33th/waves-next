"use client";
import { PlayerContext } from "@/contexts/PlayerContext";
import { Pause, Play } from "lucide-react";
import { useContext } from "react";

export function PlayButton() {
  const { isPlaying, play, pause } = useContext(PlayerContext);
  return (
    <button
      onClick={isPlaying ? pause : play}
      className="rounded-full bg-neutral-100 p-3 hover:opacity-90"
    >
      {isPlaying ? (
        <Pause size={20} className="fill-neutral-900 text-neutral-900" />
      ) : (
        <Play size={20} className="fill-neutral-900 text-neutral-900" />
      )}
    </button>
  );
}
