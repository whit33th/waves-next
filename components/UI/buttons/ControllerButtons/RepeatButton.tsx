"use client";
import { Repeat, Repeat1 } from "lucide-react";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { ControlButton } from "../ControlButton";

export function RepeatButton() {
  const repeatMode = usePlayerStore((s) => s.repeatMode);
  const handleRepeat = usePlayerStore((s) => s.handleRepeat);
  return (
    <ControlButton
      Icon={repeatMode === 2 ? Repeat1 : Repeat}
      size={20}
      isActive={repeatMode > 0}
      onClick={handleRepeat}
    />
  );
}
