"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { usePlayerBase } from "@/components/context/PlayerContext/PlayerContext";

export default function SideEffects() {
  const trackList = usePlayerStore((s) => s.trackList);
  const currentTrackIndex = usePlayerStore((s) => s.currentTrackIndex);
  const setIsMaximized = usePlayerStore((s) => s.setIsMaximized);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const setTime = usePlayerStore((s) => s.setTime);
  const nextTrack = usePlayerStore((s) => s.nextTrack);
  const formatTime = usePlayerStore((s) => s.formatTime);

  const { audioRef, durationRef, durationBodyRef } = usePlayerBase();

  const pathname = usePathname();

  // 1. Track change: set src and load
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || trackList.length === 0) return;
    const newSrc = `/api/stream/${trackList[currentTrackIndex].trackUrl}`;
    if (audio.src !== newSrc) {
      audio.src = newSrc;
      audio.preload = "metadata";
      audio.crossOrigin = "anonymous";
      audio.load();
    }
  }, [trackList, currentTrackIndex, audioRef]);

  // 2. Time update and progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => {
      const currentTime = formatTime(audio.currentTime);
      const duration = formatTime(audio.duration);
      setTime({ current: currentTime, duration });
      const progress = (audio.currentTime / audio.duration) * 100;
      if (durationRef.current) durationRef.current.style.width = `${progress}%`;
      if (durationBodyRef.current)
        durationBodyRef.current.value = String(progress);
    };
    audio.addEventListener("play", handleTimeUpdate);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("play", handleTimeUpdate);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, formatTime, setTime, durationRef, durationBodyRef]);

  // 3. Loaded metadata: set duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoadedMetadata = () => {
      const duration = formatTime(audio.duration);
      setTime({ current: formatTime(audio.currentTime), duration });
    };
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef, formatTime, setTime]);

  // 4. Ended: go to next track and set isPlaying=true
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      nextTrack();
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, nextTrack]);

  // 5. Playback control: play/pause on isPlaying or track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, audioRef]);

  // 6. UI: reset maximized on route change
  useEffect(() => {
    if (pathname === "/") {
      setIsMaximized(false);
    }
  }, [pathname, setIsMaximized]);

  return null;
}
