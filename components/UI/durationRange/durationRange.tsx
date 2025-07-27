"use client";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";

export default function DurationRange() {
  const { time, handleSeek, durationRef, durationBodyRef } = usePlayer();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <span className="min-w-[4ch] text-center text-xs text-neutral-400 tabular-nums">
          {!isNaN(time.current.minute) ? time.current.minute : "00"}:
          {!isNaN(time.current.second)
            ? time.current.second.toString().padStart(2, "0")
            : "00"}
        </span>
        <div className="relative h-1 flex-1 rounded-full bg-neutral-100/20">
          <div
            ref={durationRef}
            className="bg-primary pointer-events-none absolute z-10 h-full rounded-full"
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
          {!isNaN(time.duration.minute) ? time.duration.minute : "00"}:
          {!isNaN(time.duration.second)
            ? time.duration.second.toString().padStart(2, "0")
            : "00"}
        </span>
      </div>
    </div>
  );
}
