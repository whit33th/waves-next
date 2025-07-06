"use client";

import { useState } from "react";
import { DesktopPlayer } from "./DesktopPlayer";
import { FullScreenPlayer } from "./FullScreenPlayer";
import { MobilePlayer } from "./MobilePlayer";

export default function Controller() {
  const [isShuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isLyricsOpen, setLyricsOpen] = useState(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);

  function handleRepeat() {
    if (repeatMode < 2) setRepeatMode(repeatMode + 1);
    else setRepeatMode(0);
  }

  function handleMute() {
    if (volume > 0) setVolume(0);
  }

  return (
    <>
      <FullScreenPlayer
        isOpen={isFullPlayerOpen}
        onClose={() => setIsFullPlayerOpen(false)}
        isShuffle={isShuffle}
        setShuffle={setShuffle}
        repeatMode={repeatMode}
        handleRepeat={handleRepeat}
        volume={volume}
        setVolume={setVolume}
        handleMute={handleMute}
      />

      <div className="fixed right-0 bottom-15 left-0 z-30 flex gap-5 bg-neutral-950/95 p-3 backdrop-blur-md md:relative md:bottom-auto md:bg-neutral-950/10 md:backdrop-blur-none">
        <MobilePlayer onFullScreenOpen={() => setIsFullPlayerOpen(true)} />
        <DesktopPlayer
          isShuffle={isShuffle}
          setShuffle={setShuffle}
          repeatMode={repeatMode}
          handleRepeat={handleRepeat}
          handleMute={handleMute}
          isLyricsOpen={isLyricsOpen}
          setLyricsOpen={setLyricsOpen}
        />
      </div>
    </>
  );
}
