"use client";

import {
  IPlayerContextType,
  Track,
} from "@/helpers/constants/Interfaces/playerContext";
import { usePathname } from "next/navigation";
import { createContext, useContext, useRef, ReactNode } from "react";
import SideEffects from "./SideEffects";
import { usePlayerStore } from "./store";

const PlayerContext = createContext<IPlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  // --- Refs ---
  const audioRef = useRef<HTMLAudioElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const durationBodyRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  // --- Helpers ---
  const formatTime = (timeInSeconds: number) => ({
    minute: Math.floor(timeInSeconds / 60),
    second: Math.floor(timeInSeconds % 60),
    millisecond: Math.floor((timeInSeconds % 1) * 1000),
  });

  // --- Audio Controls ---
  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const seekTime = (value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = value / 100;
      audio.volume = newVolume;
      store.setVolume(newVolume * 100);
    }
  };

  const handleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.volume > 0) {
        audio.volume = 0;
        store.setVolume(0);
      } else {
        audio.volume = 0.5;
        store.setVolume(50);
      }
    }
  };

  const previousTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 10 || store.currentTrackIndex === 0) {
      audio.currentTime = 0;
      store.setTime({
        current: { second: 0, minute: 0, millisecond: 0 },
        duration: store.time.duration,
      });
    } else if (store.currentTrackIndex > 0) {
      store.setTime({
        current: { second: 0, minute: 0, millisecond: 0 },
        duration: store.time.duration,
      });
      store.setCurrentTrackIndex(store.currentTrackIndex - 1);
      store.setIsPlaying(true);
    }
  };

  // zustand store
  const store = usePlayerStore();

  // value для контекста
  const value = {
    ...store,
    audioRef,
    durationRef,
    durationBodyRef,
    volumeRef,
    formatTime,
    handleSeek,
    handleVolumeChange,
    handleMute,
    previousTrack,
    handleRepeat: () => {
      const currentMode = store.repeatMode;
      const newMode = currentMode < 2 ? currentMode + 1 : 0;
      store.setRepeatMode(newMode as 0 | 1 | 2);
    },
  };

  return (
    <PlayerContext.Provider value={value}>
      <SideEffects />
      {children}
      <audio ref={audioRef} preload="metadata" className="sr-only" />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
