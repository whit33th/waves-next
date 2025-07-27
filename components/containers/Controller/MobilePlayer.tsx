"use client";

import PlayButton from "@/components/UI/buttons/PlayButton";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import Image from "next/image";

export function MobilePlayer() {
  const { trackList, currentTrackIndex, setIsFullPlayerOpen } = usePlayer();

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-3 px-2 lg:hidden"
      onClick={() => setIsFullPlayerOpen(true)}
    >
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image
          className="h-full w-full rounded-lg object-cover"
          src={
            trackList[currentTrackIndex]?.coverUrl ?? "/placeholder-image.jpg"
          }
          width={48}
          height={48}
          alt={
            trackList[currentTrackIndex]?.title
              ? `${trackList[currentTrackIndex]?.title} cover`
              : "Track cover"
          }
        />
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-medium">
          {trackList[currentTrackIndex]?.title ?? "Track Title"}
        </h1>
        <p className="truncate text-xs text-neutral-400/90">
          {trackList[currentTrackIndex]?.artist?.name ?? "Unknown Artist"}
        </p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        <PlayButton />
      </div>
    </div>
  );
}
