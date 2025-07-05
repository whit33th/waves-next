"use client";

import { ControlButton } from "@/components/UI/buttons/ControlButton";
import { LyricsButton } from "@/components/UI/buttons/LyricsButton";
import { PlayButton } from "@/components/UI/buttons/PlayButton";
import ActionBtn from "@/components/UI/buttons/actionBtn";
import DurationRange from "@/components/UI/durationRange/durationRange";
import { VolumeControl } from "@/components/UI/volume/VolumeControl";
import { PlayerContext } from "@/contexts/PlayerContext";
import {
  Ellipsis,
  FastForward,
  Plus,
  Repeat,
  Repeat1,
  Rewind,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { useContext, useState } from "react";

export default function Controller() {
  const [setPlay] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isLyricsOpen, setLyricsOpen] = useState(false);
  const { durationBodyRef, durationRef, nextTrack, previousTrack } =
    useContext(PlayerContext);

  function handleRepeat() {
    if (repeatMode < 2) setRepeatMode(repeatMode + 1);
    else setRepeatMode(0);
  }

  function handleMute() {
    if (volume > 0) setVolume(0);
  }

  return (
    <div className="relative z-50 flex w-full flex-col gap-4 bg-neutral-950/10 p-4 px-3 sm:px-6">
      <div className="grid flex-1 grid-cols-3 items-center">
        <div className="flex items-center gap-3 sm:gap-5">
          <ActionBtn className="hidden sm:flex" Icon={Sparkles} text="FX" />
          <ControlButton
            Icon={Ellipsis}
            className="rounded-lg border border-neutral-200/15 p-1"
          />
          <div className="hidden sm:flex sm:gap-5">
            <ControlButton Icon={Plus} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <ControlButton
              Icon={Shuffle}
              onClick={() => setShuffle(!isShuffle)}
              isActive={isShuffle}
            />
            <ControlButton
              Icon={Rewind}
              className="fill-neutral-300"
              onClick={previousTrack}
            />
            <PlayButton />
            <ControlButton
              Icon={FastForward}
              className="fill-neutral-300"
              onClick={nextTrack}
            />
            <ControlButton
              Icon={repeatMode === 2 ? Repeat1 : Repeat}
              onClick={handleRepeat}
              isActive={repeatMode > 0}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
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
  );
}
