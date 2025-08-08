"use client";
import { Rewind } from "lucide-react";
import { usePlayerBase } from "@/components/context/PlayerContext/PlayerContext";
import { ControlButton } from "../ControlButton";

export function PreviousButton() {
  const { previousTrack } = usePlayerBase();
  return (
    <ControlButton
      Icon={Rewind}
      size={20}
      className="fill-neutral-300"
      onClick={previousTrack}
    />
  );
}
