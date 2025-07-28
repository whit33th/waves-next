"use client";

import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import { useCallback } from "react";

export default function VolumeControl() {
  const { volume, handleVolumeChange, handleMute, volumeRef } = usePlayer();

  const volumeRefCallback = useCallback(
    (node: HTMLInputElement | null) => {
      if (volumeRef.current) {
        volumeRef.current = node;
      }
    },
    [volumeRef],
  );

  const volumeValue = volume;
  const VolumeIcon =
    volumeValue === 0
      ? VolumeOff
      : volumeValue <= 25
        ? Volume
        : volumeValue <= 50
          ? Volume1
          : Volume2;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="text-neutral-300/60 transition hover:opacity-80"
        onClick={handleMute}
      >
        <VolumeIcon />
      </button>
      <div className="relative h-1 w-24 rounded-full bg-neutral-100/20 md:w-32">
        <div
          className={`z-10 h-full rounded-full bg-white`}
          style={{ width: `${volumeValue}%` }}
        />

        <input
          ref={volumeRefCallback}
          type="range"
          min="0"
          defaultValue={volumeValue}
          max="100"
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}
