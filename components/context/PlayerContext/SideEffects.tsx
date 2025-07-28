"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePlayer } from "./PlayerContext";

export default function SideEffects() {
  const {
    trackList,
    currentTrackIndex,
    setIsMaximized,
    audioRef,
    isPlaying,
    setIsPlaying,
    formatTime,
    setTime,
    durationRef,
    durationBodyRef,
    nextTrack,

    play,
  } = usePlayer();

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
      setIsPlaying(true);
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, nextTrack, setIsPlaying]);

  // 5. Playback control: play/pause on isPlaying or track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      const tryPlay = () => {
        audio.play().catch(() => setIsPlaying(false));
      };
      if (audio.readyState >= 3) {
        tryPlay();
      } else {
        audio.addEventListener("canplay", tryPlay);
        return () => audio.removeEventListener("canplay", tryPlay);
      }
    } else {
      audio.pause();
    }
  }, [audioRef, isPlaying, currentTrackIndex, setIsPlaying]);

  // 6. Error handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleError = (e: Event) => {
      // Log audio errors in development only
      if (process.env.NODE_ENV === "development") {
        console.error("Audio playback error:", e);
      }
      setIsPlaying(false);
    };
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("error", handleError);
    };
  }, [audioRef, setIsPlaying]);

  // 7. UI: reset maximized on route change
  useEffect(() => {
    setIsMaximized(false);
  }, [pathname, setIsMaximized]);

  return null;
}
