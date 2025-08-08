"use client";
import { FastForward } from "lucide-react";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { ControlButton } from "../ControlButton";

export function NextButton() {
  const nextTrack = usePlayerStore((s) => s.nextTrack);
  return (
    <ControlButton
      Icon={FastForward}
      size={20}
      className="fill-neutral-300"
      onClick={nextTrack}
    />
  );
}
