"use client";

import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { ControlButton } from "@/components/UI/buttons/ControlButton";
import { LyricsButton } from "@/components/UI/buttons/LyricsButton";
import PlayButton from "@/components/UI/buttons/PlayButton";
import DurationRange from "@/components/UI/durationRange/durationRange";
import VolumeControl from "@/components/UI/volume/VolumeControl";
import {
  Ellipsis,
  FastForward,
  Maximize,
  Minimize,
  Plus,
  Repeat,
  Repeat1,
  Rewind,
  Shuffle,
} from "lucide-react";

export function DesktopPlayer() {
  const {
    isMaximized,
    setIsMaximized,
    previousTrack,
    nextTrack,
    isShuffle,
    setIsShuffle,
    setIsLyricsOpen,
    isLyricsOpen,
    handleRepeat,
    repeatMode,
  } = usePlayer();
  return (
    <div className="hidden w-full gap-5 lg:flex">
      <div className="relative z-50 flex w-full flex-col gap-2">
        <div className="grid flex-1 grid-cols-3 items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* <ActionBtn className="hidden sm:flex" Icon={Sparkles} text="FX" /> */}
            <ControlButton
              Icon={Ellipsis}
              size={16}
              className="m-0 rounded-lg p-1 outline outline-neutral-200/15"
            />
            <div className="hidden sm:flex sm:gap-3">
              <ControlButton Icon={Plus} size={22} />
            </div>
            <ControlButton
              Icon={isMaximized ? Minimize : Maximize}
              onClick={() => setIsMaximized(!isMaximized)}
              size={22}
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <ControlButton
                Icon={Shuffle}
                size={22}
                onClick={() => setIsShuffle(!isShuffle)}
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
              onClick={() => setIsLyricsOpen(!isLyricsOpen)}
            />
            <div className="hidden sm:block">
              <VolumeControl />
            </div>
          </div>
        </div>
        <DurationRange />
      </div>
    </div>
  );
}
