"use client";

import { PlayerContext } from "@/contexts/PlayerContext";
import { useContext } from "react";

export default function Audio() {
  const { audioRef, track } = useContext(PlayerContext);

  return <audio ref={audioRef} src={track?.filePath} preload="metadata" />;
}
