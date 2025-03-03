import { Play, Pause } from "lucide-react";

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

export function PlayButton({ isPlaying, onClick }: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-neutral-100 p-3.5 hover:opacity-90"
    >
      {isPlaying ? (
        <Play className="fill-neutral-900 text-neutral-900" />
      ) : (
        <Pause className="fill-neutral-900 text-neutral-900" />
      )}
    </button>
  );
}
