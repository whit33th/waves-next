"use client";

import { ControlButton } from "@/components/UI/buttons/ControlButton";
import { LyricsButton } from "@/components/UI/buttons/LyricsButton";
import { PlayButton } from "@/components/UI/buttons/PlayButton";
import ActionBtn from "@/components/UI/buttons/actionBtn";
import DurationRange from "@/components/UI/durationRange/durationRange";
import { VolumeControl } from "@/components/UI/volume/VolumeControl";
import AnimatedBackground from "@/components/UI/AnimatedBackground";
import { PlayerContext } from "@/contexts/PlayerContext";
import {
  Ellipsis,
  FastForward,
  Pause,
  Play,
  Plus,
  Repeat,
  Repeat1,
  Rewind,
  Shuffle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

export default function Controller() {
  const [isShuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isLyricsOpen, setLyricsOpen] = useState(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const { nextTrack, previousTrack, track, isPlaying, play, pause } =
    useContext(PlayerContext);

  function handleRepeat() {
    if (repeatMode < 2) setRepeatMode(repeatMode + 1);
    else setRepeatMode(0);
  }

  function handleMute() {
    if (volume > 0) setVolume(0);
  }

  return (
    <>
      {/* Полноэкранный плеер для мобильных */}
      {isFullPlayerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Анимированный фон */}

          {/* Темный оверлей */}
          {/* <div className="absolute inset-0 bg-black/90"></div> */}

          <div className="relative flex h-full flex-col p-6">
            {/* Верхняя панель */}
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
              <h3 className="font-medium text-white">Сейчас играет</h3>
              <button className="p-2">
                <Ellipsis className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Большое изображение */}
            <div className="mb-8 flex flex-1 items-center justify-center">
              <div className="aspect-square w-full max-w-80 overflow-hidden rounded-2xl">
                <Image
                  src={track?.image ?? "/placeholder-image.jpg"}
                  width={320}
                  height={320}
                  alt={track?.title || "Track cover"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Информация о треке */}
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold text-white">
                {track?.title || "Track Title"}
              </h1>
              <p className="text-lg text-neutral-400">
                {track?.artist || "Unknown Artist"}
              </p>
            </div>

            {/* Прогресс бар */}
            <div className="mb-8">
              <DurationRange />
            </div>

            {/* Кнопки управления */}
            <div className="mb-8 flex items-center justify-center gap-8">
              <ControlButton
                Icon={Shuffle}
                size={24}
                onClick={() => setShuffle(!isShuffle)}
                isActive={isShuffle}
              />
              <ControlButton
                Icon={Rewind}
                size={32}
                className="fill-white text-white"
                onClick={previousTrack}
              />
              <button
                onClick={isPlaying ? pause : play}
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
              <AnimatedBackground />
            </div>

            {/* Нижняя панель с громкостью */}
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
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Обычный контроллер */}
      <div className="flex h-[100px] gap-5 bg-neutral-950/10 p-4 px-3 sm:px-6">
        {/* Мобильная версия */}
        <div
          className="flex w-full cursor-pointer items-center gap-3 lg:hidden"
          onClick={() => setIsFullPlayerOpen(true)}
        >
          <div className="relative h-14 w-14 flex-shrink-0">
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={track?.image ?? "/placeholder-image.jpg"}
              width={56}
              height={56}
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

        {/* Десктопная версия */}
        <div className="hidden w-full gap-5 lg:flex">
          {/* <div className="z-50 flex gap-5">
            <div className="relative h-17 w-17">
              <Image
                className="h-full w-full rounded-xl object-cover transition hover:scale-105"
                src={track?.image ?? "/placeholder-image.jpg"}
                width={80}
                height={80}
                alt={track.title ? `${track.title} cover` : "Track cover"}
              />
            </div>
            <div className="flex w-[10ch] flex-col justify-center gap-1 xl:w-[14ch]">
              <h1 className="truncate text-sm">
                {track.title || "Track Title"}
              </h1>
              <p className="truncate text-xs text-neutral-400/90">
                {track.artist || "Unknown Artist"}
              </p>
            </div>
          </div> */}
          <div className="relative z-50 flex w-full flex-col gap-2">
            <div className="grid flex-1 grid-cols-3 items-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <ActionBtn
                  className="hidden sm:flex"
                  Icon={Sparkles}
                  text="FX"
                />
                <ControlButton
                  Icon={Ellipsis}
                  size={16}
                  className="m-0 rounded-lg p-1 outline outline-neutral-200/15"
                />
                <div className="hidden sm:flex sm:gap-3">
                  <ControlButton Icon={Plus} size={22} />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 sm:gap-4">
                  <ControlButton
                    Icon={Shuffle}
                    size={22}
                    onClick={() => setShuffle(!isShuffle)}
                    isActive={isShuffle}
                  />
                  <ControlButton
                    Icon={Rewind}
                    size={22}
                    className="fill-neutral-300"
                    onClick={previousTrack}
                  />
                  <PlayButton />
                  <ControlButton
                    Icon={FastForward}
                    size={22}
                    className="fill-neutral-300"
                    onClick={nextTrack}
                  />
                  <ControlButton
                    Icon={repeatMode === 2 ? Repeat1 : Repeat}
                    size={22}
                    onClick={handleRepeat}
                    isActive={repeatMode > 0}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <LyricsButton
                  isOpen={isLyricsOpen}
                  onClick={() => setLyricsOpen(!isLyricsOpen)}
                />
                <div className="hidden sm:block">
                  <VolumeControl
                    volume={volume}
                    onVolumeChange={setVolume}
                    onMute={handleMute}
                  />
                </div>
              </div>
            </div>
            <DurationRange />
          </div>
        </div>
      </div>
    </>
  );
}
