"use client";

import {
  IPlayerContextType,
  Track,
} from "@/helpers/constants/Interfaces/playerContext";
import { usePathname } from "next/navigation";
import { createContext, useContext, useRef, useState, ReactNode } from "react";
import SideEffects from "./SideEffects";

const PlayerContext = createContext<IPlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  // --- Refs ---
  const audioRef = useRef<HTMLAudioElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const durationBodyRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  // --- State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [time, setTime] = useState({
    current: { second: 0, minute: 0, millisecond: 0 },
    duration: { second: 0, minute: 0, millisecond: 0 },
  });
  const [volume, setVolume] = useState(50);
  const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);

  // --- Helpers ---
  const formatTime = (timeInSeconds: number) => ({
    minute: Math.floor(timeInSeconds / 60),
    second: Math.floor(timeInSeconds % 60),
    millisecond: Math.floor((timeInSeconds % 1) * 1000),
  });

  // --- Player Actions ---
  const play = async () => {
    const audio = audioRef.current;
    if (audio && trackList[currentTrackIndex]) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (audio && trackList[currentTrackIndex]) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSetTrackList = (tracks: Track[]) => {
    setCurrentTrackIndex(0);
    setTrackList(tracks);
    setIsPlaying(true);
  };

  const handlePlayTrack = (song: Track) => {
    const trackIndex = trackList.findIndex((t) => t._id === song._id);
    setCurrentTrackIndex(trackIndex);
    if (song._id === trackList[currentTrackIndex]?._id && isPlaying) {
      pause();
      return;
    }
    if (song._id !== trackList[currentTrackIndex]?._id) {
      setTime((prev) => ({
        current: { second: 0, minute: 0, millisecond: 0 },
        duration: prev.duration,
      }));
    }
    setIsPlaying(true);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      if (prev < trackList.length - 1) {
        setIsPlaying(true);
        return prev + 1;
      }
      return prev;
    });
  };

  const previousTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 10 || currentTrackIndex === 0) {
      audio.currentTime = 0;
      setTime((prev) => ({
        current: { second: 0, minute: 0, millisecond: 0 },
        duration: prev.duration,
      }));
    } else if (currentTrackIndex > 0) {
      setTime((prev) => ({
        current: { second: 0, minute: 0, millisecond: 0 },
        duration: prev.duration,
      }));
      setCurrentTrackIndex((prev) => {
        setIsPlaying(true);
        return prev - 1;
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const seekTime = (Number(e.target.value) / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = Number(e.target.value) / 100;
      audio.volume = newVolume;
      setVolume(newVolume * 100);
      if (volumeRef.current) volumeRef.current.value = String(newVolume * 100);
    }
  };

  const handleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.volume > 0) {
        audio.volume = 0;
        setVolume(0);
      } else {
        audio.volume = 0.5;
        setVolume(50);
      }
      if (volumeRef.current)
        volumeRef.current.value = String(audio.volume * 100);
    }
  };
  function handleRepeat() {
    if (repeatMode < 2) setRepeatMode(repeatMode);
    else setRepeatMode(0);
  }

  // --- Context Value ---
  const value: IPlayerContextType = {
    audioRef,
    durationRef,
    durationBodyRef,
    volumeRef,
    isPlaying,
    setIsPlaying,
    trackList,
    setTrackList,
    currentTrackIndex,
    setCurrentTrackIndex,
    handleSetTrackList,
    time,
    setTime,
    volume,
    setVolume,
    repeatMode,
    isMaximized,
    setIsLyricsOpen,
    isFullPlayerOpen,
    isLyricsOpen,
    isShuffle,
    setIsFullPlayerOpen,
    setIsShuffle,
    handleRepeat,
    setIsMaximized,
    play,
    pause,
    nextTrack,
    previousTrack,
    handleSeek,
    handleVolumeChange,
    handlePlayTrack,
    handleMute,
    formatTime,
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
