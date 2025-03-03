import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  onMute: () => void;
}

export function VolumeControl({
  volume,
  onVolumeChange,
  onMute,
}: VolumeControlProps) {
  const VolumeIcon =
    volume === 0
      ? VolumeOff
      : volume <= 25
        ? Volume
        : volume <= 50
          ? Volume1
          : Volume2;

  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={onMute}>
        <VolumeIcon className="text-neutral-300" />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(parseInt(e.target.value))}
        className="h-1.5 w-24 cursor-pointer appearance-none rounded-lg bg-neutral-300/50 md:w-32 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-200"
      />
    </div>
  );
}
