"use client";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { LyricsButton } from "./LyricsButton";

export function LyricsToggleButton() {
  const isLyricsOpen = usePlayerStore((s) => s.isLyricsOpen);
  const setIsLyricsOpen = usePlayerStore((s) => s.setIsLyricsOpen);
  return (
    <LyricsButton
      isOpen={isLyricsOpen}
      onClick={() => setIsLyricsOpen(!isLyricsOpen)}
    />
  );
}
