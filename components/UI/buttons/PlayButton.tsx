"use client";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { Pause, Play } from "lucide-react";

export default function PlayButton() {
  const { isPlaying, play, pause } = usePlayer();

  function handlePlay(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (isPlaying) {
      pause();
    } else play();
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
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
