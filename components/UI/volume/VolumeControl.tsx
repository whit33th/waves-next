"use client";
import { PlayerContext } from "@/contexts/PlayerContext";
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import { useContext } from "react";

interface VolumeControlProps {
  onMute: () => void;
}

export function VolumeControl({ onMute }: VolumeControlProps) {
  const { handleVolumeChange, volumeRef, volume } = useContext(PlayerContext);

  const volumeValue = volume * 100;
  const VolumeIcon =
    volumeValue === 0
      ? VolumeOff
      : volumeValue <= 25
        ? Volume
        : volumeValue <= 50
          ? Volume1
          : Volume2;

  console.log("VolumeControl rendered with volume:", volume * 100);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="text-neutral-300/60 transition hover:opacity-80"
        onClick={onMute}
      >
        <VolumeIcon />
      </button>
      <div className="relative h-1 w-24 rounded-full bg-neutral-100/20 md:w-32">
        <div
          className={`bg-primary z-10 h-full rounded-full`}
          style={{ width: `${volumeValue}%` }}
        />

        <input
          ref={volumeRef}
          type="range"
          min="0"
          defaultValue={volumeValue}
          max="100"
          onChange={handleVolumeChange}
          className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}
