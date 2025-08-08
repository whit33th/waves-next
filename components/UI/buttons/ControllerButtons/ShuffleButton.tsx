"use client";
import { Shuffle } from "lucide-react";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { ControlButton } from "../ControlButton";

export function ShuffleButton() {
  const isShuffle = usePlayerStore((s) => s.isShuffle);
  const setIsShuffle = usePlayerStore((s) => s.setIsShuffle);
  return (
    <ControlButton
      Icon={Shuffle}
      size={20}
      isActive={isShuffle}
      onClick={() => setIsShuffle(!isShuffle)}
    />
  );
}
