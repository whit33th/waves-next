"use client";

import { ScrollingText } from "@/components/containers/Effects/ScrollingText";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import PlayButton from "@/components/UI/buttons/ControllerButtons/PlayButton";
import DurationRange from "@/components/UI/durationRange/durationRange";
import { SmartPopover } from "@/components/UI/popover/SmartPopover";
import VolumeControl from "@/components/UI/buttons/ControllerButtons/VolumeControl";
import { Ellipsis, Maximize, Minimize, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ShuffleButton } from "@/components/UI/buttons/ControllerButtons/ShuffleButton";
import { PreviousButton } from "@/components/UI/buttons/ControllerButtons/PreviousButton";
import { NextButton } from "@/components/UI/buttons/ControllerButtons/NextButton";
import { RepeatButton } from "@/components/UI/buttons/ControllerButtons/RepeatButton";
import { QueueButton } from "@/components/UI/buttons/ControllerButtons/QueueButton";
import { LyricsToggleButton } from "@/components/UI/buttons/ControllerButtons/LyricsToggleButton";

export function DesktopPlayer() {
  const isMaximized = usePlayerStore((s) => s.isMaximized);
  const setIsMaximized = usePlayerStore((s) => s.setIsMaximized);
  const trackList = usePlayerStore((s) => s.trackList);
  const currentTrackIndex = usePlayerStore((s) => s.currentTrackIndex);
  const setIsFullPlayerOpen = usePlayerStore((s) => s.setIsFullPlayerOpen);

  const currentTrack = trackList[currentTrackIndex];
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Mobile compact bar */}
      {trackList.length > 0 && (
        <div
          className="flex w-full cursor-pointer items-center gap-3 px-2 lg:hidden"
          onClick={() => setIsFullPlayerOpen(true)}
        >
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              className="h-full w-full object-cover"
              src={currentTrack?.coverUrl ?? "/placeholder-image.jpg"}
              width={48}
              height={48}
              alt={
                currentTrack?.title
                  ? `${currentTrack?.title} cover`
                  : "Track cover"
              }
            />
          </div>
          <div className="min-w-0 flex-1">
            <ScrollingText
              text={currentTrack?.title || ""}
              speed={40}
              mode="loop"
              pauseOnHover={true}
              className="truncate text-sm font-medium text-neutral-200"
            />
            <ScrollingText
              text={currentTrack?.artist?.name || "Unknown Artist"}
              speed={35}
              mode="loop"
              className="truncate text-xs text-neutral-400"
            />
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <PlayButton />
          </div>
        </div>
      )}

      {/* Desktop player grid */}
      <div className="hidden w-full lg:block">
        <div className="grid w-full grid-cols-[1fr_minmax(0,500px)_1fr] items-center gap-4">
          {/* Left: track info (flex within left 1fr; will truncate instead of pushing center) */}
          <div className="flex min-w-0 items-center gap-3 overflow-hidden">
            {currentTrack && (
              <>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="group relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md focus:outline-none"
                >
                  <Image
                    src={currentTrack.coverUrl || "/img/albums/placeholder.png"}
                    alt={currentTrack.title}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover transition duration-300 group-hover:brightness-75"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {isMaximized ? (
                      <Minimize className="h-5 w-5 text-neutral-200 drop-shadow" />
                    ) : (
                      <Maximize className="h-5 w-5 text-neutral-200 drop-shadow" />
                    )}
                  </span>
                </button>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Link href={`/album/${currentTrack.albumId}`}>
                    <ScrollingText
                      text={currentTrack.title}
                      speed={40}
                      mode="loop"
                      pauseOnHover={true}
                      className="truncate text-sm font-medium text-neutral-200"
                    />
                  </Link>
                  <Link href={`/artist/${currentTrack.artist?._id}`}>
                    <ScrollingText
                      text={currentTrack.artist?.name || "Unknown Artist"}
                      speed={35}
                      mode="loop"
                      className="truncate text-xs text-neutral-400"
                    />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Center: fixed width controls (500px) */}
          <div className="col-start-2 col-end-3 flex flex-col items-center justify-center">
            <div className="flex items-center gap-4">
              <ShuffleButton />
              <PreviousButton />
              <PlayButton />
              <NextButton />
              <RepeatButton />
            </div>
            {/* <div className="mt-1 w-full max-w-[500px]">
              <DurationRange />
            </div> */}
          </div>

          {/* Right: queue / lyrics / volume */}
          <div className="flex items-center justify-end gap-2 overflow-visible sm:gap-3">
            <QueueButton />
            <LyricsToggleButton />
            <VolumeControl />
            {/* Popover trigger */}
            <button
              ref={menuBtnRef}
              onClick={() => setMenuOpen((o) => !o)}
              className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-md border border-neutral-800 text-neutral-300 transition hover:bg-neutral-950 active:scale-95"
            >
              <Ellipsis size={16} />
            </button>
            <SmartPopover
              anchorRef={menuBtnRef}
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              preferredSides={["bottom", "top", "right", "left"]}
            >
              <div className="flex flex-col gap-1 text-sm">
                {/* Maximize moved to cover hover */}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left font-medium text-neutral-200 hover:bg-neutral-800/70"
                >
                  <Plus size={16} className="text-neutral-400" />
                  <span>Add</span>
                </button>
              </div>
            </SmartPopover>
          </div>
        </div>
      </div>
      <DurationRange />
    </div>
  );
}
