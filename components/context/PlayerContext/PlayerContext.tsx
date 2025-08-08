"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import SideEffects from "./SideEffects";
import { usePlayerStore } from "./store";

interface PlayerContextValue {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  durationRef: React.RefObject<HTMLDivElement | null>;
  durationBodyRef: React.RefObject<HTMLInputElement | null>;
  volumeRef: React.RefObject<HTMLInputElement | null>;
  handleSeek: (value: number) => void;
  handleVolumeChange: (value: number) => void;
  handleMute: () => void;
  previousTrack: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const durationRef = useRef<HTMLDivElement | null>(null);
  const durationBodyRef = useRef<HTMLInputElement | null>(null);
  const volumeRef = useRef<HTMLInputElement | null>(null);

  // Audio control helpers (use store imperatively)
  const handleSeek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const seekTime = (value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = value / 100;
      audio.volume = newVolume;
      usePlayerStore.setState({ volume: value });
    }
  }, []);

  const handleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.volume > 0) {
      audio.volume = 0;
      usePlayerStore.setState({ volume: 0 });
    } else {
      audio.volume = 0.5;
      usePlayerStore.setState({ volume: 50 });
    }
  }, []);

  const previousTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const { currentTrackIndex, time } = usePlayerStore.getState();
    if (audio.currentTime > 10 || currentTrackIndex === 0) {
      audio.currentTime = 0;
      usePlayerStore.setState({
        time: {
          current: { second: 0, minute: 0, millisecond: 0 },
          duration: time.duration,
        },
      });
    } else if (currentTrackIndex > 0) {
      audio.currentTime = 0;
      usePlayerStore.setState({
        currentTrackIndex: currentTrackIndex - 1,
        isPlaying: true,
        time: {
          current: { second: 0, minute: 0, millisecond: 0 },
          duration: time.duration,
        },
      });
    }
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      audioRef,
      durationRef,
      durationBodyRef,
      volumeRef,
      handleSeek,
      handleVolumeChange,
      handleMute,
      previousTrack,
    }),
    [handleSeek, handleVolumeChange, handleMute, previousTrack],
  );

  return (
    <PlayerContext.Provider value={value}>
      <SideEffects />
      {children}
      <audio ref={audioRef} preload="metadata" className="sr-only" />
    </PlayerContext.Provider>
  );
}

export function usePlayerBase() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayerBase must be used within PlayerProvider");
  return ctx;
}

// Legacy compatibility hook (remove usages gradually)
export const usePlayer = () => {
  return {
    ...usePlayerStore(), // NOTE: components should migrate to selective selectors to avoid re-renders
    ...usePlayerBase(),
  };
};
