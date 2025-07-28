"use client";

import AnimatedBackground from "@/components/UI/AnimatedBackground";
import { ControlButton } from "@/components/UI/buttons/ControlButton";
import DurationRange from "@/components/UI/durationRange/durationRange";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import {
  Ellipsis,
  FastForward,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Rewind,
  Shuffle,
} from "lucide-react";
import Image from "next/image";
import { unstable_Activity as Activity, useEffect } from "react";

export function FullScreenPlayer() {
  const {
    trackList,
    currentTrackIndex,
    isPlaying,
    previousTrack,
    nextTrack,
    play,
    pause,
    isFullPlayerOpen,
    isShuffle,
    setIsShuffle,
    setIsFullPlayerOpen,
    setIsLyricsOpen,
    handleRepeat,
    volume,
    handleVolumeChange,
    handleMute,
    repeatMode,
  } = usePlayer();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isFullPlayerOpen) {
        setIsFullPlayerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullPlayerOpen, setIsFullPlayerOpen]);

  if (!isFullPlayerOpen) return null;

  return (
    isFullPlayerOpen &&
    trackList.length > 0 && (
      <Activity
        mode={trackList.length > 0 && isFullPlayerOpen ? "visible" : "hidden"}
      >
        <div className="bg-darker fixed inset-0 z-[60] overflow-hidden lg:hidden">
          <div className="relative flex h-full flex-col p-6">
            <AnimatedBackground />

            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={() => setIsFullPlayerOpen(false)}
                className="p-2"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              <h3 className="font-medium text-white">Now Playing</h3>
              <button className="p-2">
                <Ellipsis className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-1 items-center justify-center">
                <div className="aspect-square w-full max-w-80 overflow-hidden rounded-2xl">
                  <Image
                    src={
                      trackList[currentTrackIndex]?.coverUrl ??
                      "/placeholder-image.jpg"
                    }
                    width={320}
                    height={320}
                    alt={trackList[currentTrackIndex]?.title ?? "Track cover"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mb-4 text-center">
                <h1 className="text-xl font-bold text-white md:text-2xl">
                  {trackList[currentTrackIndex]?.title ?? "Track Title"}
                </h1>
                <p className="text-base text-neutral-400 md:text-lg">
                  {trackList[currentTrackIndex]?.artist?.name ??
                    "Unknown Artist"}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <DurationRange />
            </div>

            <div className="mb-8 flex items-center justify-center gap-8">
              <ControlButton
                Icon={Shuffle}
                size={24}
                onClick={() => setIsShuffle(!isShuffle)}
                isActive={isShuffle}
              />
              <ControlButton
                Icon={Rewind}
                size={32}
                className="fill-white text-white"
                onClick={previousTrack}
              />
              <button
                onClick={() => {
                  if (isPlaying) {
                    pause();
                  } else {
                    play();
                  }
                }}
                className="rounded-full bg-white p-4 hover:opacity-90"
              >
                {isPlaying ? (
                  <Pause size={28} className="fill-black text-black" />
                ) : (
                  <Play size={28} className="fill-black text-black" />
                )}
              </button>
              <ControlButton
                Icon={FastForward}
                size={32}
                className="fill-white text-white"
                onClick={nextTrack}
              />
              <ControlButton
                Icon={repeatMode === 2 ? Repeat1 : Repeat}
                size={24}
                onClick={handleRepeat}
                isActive={repeatMode > 0}
              />
            </div>

            <div className="w-full">
              <div className="flex items-center gap-4">
                <button
                  className="flex-shrink-0 text-white/80 transition hover:opacity-80"
                  onClick={handleMute}
                >
                  {volume === 0 ? (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.25 9v6c0 .414.336.75.75.75h3.69l5.64 3.76c.508.339 1.177.02 1.177-.562V5.052c0-.582-.669-.901-1.177-.562L8.69 8.25H5c-.414 0-.75.336-.75.75z" />
                      <path d="M16.5 12L18.5 10M18.5 14L16.5 12L18.5 10" />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.25 9v6c0 .414.336.75.75.75h3.69l5.64 3.76c.508.339 1.177.02 1.177-.562V5.052c0-.582-.669-.901-1.177-.562L8.69 8.25H5c-.414 0-.75.336-.75.75z" />
                      <path d="M15.54 8.46a5 5 0 010 7.07M17.25 6.75a8 8 0 010 10.5" />
                    </svg>
                  )}
                </button>
                <div className="relative h-2 flex-1 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-150"
                    style={{ width: `${volume}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    value={volume}
                    max="100"
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Activity>
    )
  );
}
