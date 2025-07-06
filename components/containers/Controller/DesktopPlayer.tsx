"use client";

import { ControlButton } from "@/components/UI/buttons/ControlButton";
import { LyricsButton } from "@/components/UI/buttons/LyricsButton";
import { PlayButton } from "@/components/UI/buttons/PlayButton";
import ActionBtn from "@/components/UI/buttons/actionBtn";
import DurationRange from "@/components/UI/durationRange/durationRange";
import { VolumeControl } from "@/components/UI/volume/VolumeControl";
import { PlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import {
  Ellipsis,
  FastForward,
  Maximize,
  Maximize2,
  Minimize,
  Plus,
  Repeat,
  Repeat1,
  Rewind,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { useContext } from "react";

interface DesktopPlayerProps {
  isShuffle: boolean;
  setShuffle: (value: boolean) => void;
  repeatMode: number;
  handleRepeat: () => void;
  handleMute: () => void;
  isLyricsOpen: boolean;
  setLyricsOpen: (value: boolean) => void;
}

export function DesktopPlayer({
  isShuffle,
  setShuffle,
  repeatMode,
  handleRepeat,
  handleMute,
  isLyricsOpen,
  setLyricsOpen,
}: DesktopPlayerProps) {
  const { nextTrack, previousTrack, setIsMaximized, isMaximized } =
    useContext(PlayerContext);

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
              Icon={isMaximized ? Maximize : Minimize}
              onClick={() => setIsMaximized(!isMaximized)}
              size={22}
            />
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
              <VolumeControl onMute={handleMute} />
            </div>
          </div>
        </div>
        <DurationRange />
      </div>
    </div>
  );
}
