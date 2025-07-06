"use client";

import { PlayButton } from "@/components/UI/buttons/PlayButton";
import { PlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import Image from "next/image";
import { useContext } from "react";

interface MobilePlayerProps {
  onFullScreenOpen: () => void;
}

export function MobilePlayer({ onFullScreenOpen }: MobilePlayerProps) {
  const { track } = useContext(PlayerContext);

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-3 px-2 lg:hidden"
      onClick={onFullScreenOpen}
    >
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image
          className="h-full w-full rounded-lg object-cover"
          src={track?.image ?? "/placeholder-image.jpg"}
          width={48}
          height={48}
          alt={track?.title ? `${track.title} cover` : "Track cover"}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-medium">
          {track?.title || "Track Title"}
        </h1>
        <p className="truncate text-xs text-neutral-400/90">
          {track?.artist || "Unknown Artist"}
        </p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        <PlayButton />
      </div>
    </div>
  );
}
