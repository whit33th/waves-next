"use client";
import { PlayerContext } from "@/contexts/PlayerContext";
import { useContext } from "react";

export default function DurationRange() {
  const { durationBodyRef, durationRef, time, audioRef, handleSeek } =
    useContext(PlayerContext);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <span className="min-w-[4ch] text-center text-xs text-neutral-400 tabular-nums">
          {time.current.minute}:
          {time.current.second.toString().padStart(2, "0")}
        </span>
        <div className="relative h-1 flex-1 rounded-full bg-neutral-100/20">
          <div
            ref={durationRef}
            className={`bg-primary absolute h-full rounded-full transition-all duration-75 ease-out`}
          />

          <input
            ref={durationBodyRef}
            type="range"
            min="0"
            defaultValue={0}
            max="100"
            onChange={handleSeek}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <span className="min-w-[4ch] text-center text-xs text-neutral-400 tabular-nums">
          {time.duration.minute}:
          {time.duration.second.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
