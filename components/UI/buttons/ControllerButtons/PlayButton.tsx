"use client";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { Pause, Play } from "lucide-react";

export default function PlayButton() {
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);

  function handlePlay(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (isPlaying) pause();
    else play();
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="flex items-center justify-center rounded-full bg-neutral-100 p-2 hover:opacity-90"
    >
      {isPlaying ? (
        <Pause size={18} className="fill-neutral-900 text-neutral-900" />
      ) : (
        <Play
          size={18}
          className="translate-x-[0.5px] fill-neutral-900 text-neutral-900"
        />
      )}
    </button>
  );
}
