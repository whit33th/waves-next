"use client";
import { musicList } from "@/helpers/data/musicData";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";

interface IPlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  durationRef: React.RefObject<HTMLDivElement | null>;
  durationBodyRef: React.RefObject<HTMLInputElement | null>;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  track: (typeof musicList)[0];
  setTrack: (value: (typeof musicList)[0]) => void;
  time: {
    current: { second: number; minute: number };
    duration: { second: number; minute: number };
  };
  setTime: (value: {
    current: { second: number; minute: number };
    duration: { second: number; minute: number };
  }) => void;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  progress?: number;
  volumeRef: React.RefObject<HTMLInputElement | null>;
  volume: number;
  handlePlayChosen: (track: (typeof musicList)[0]) => void;
  setIsMaximized: (value: boolean) => void;
  isMaximized: boolean;
}

export const PlayerContext = createContext<IPlayerContextType>(
  {} as IPlayerContextType,
);

function PlayerContextProvider(props: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const durationBodyRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState(musicList[0]);
  const [time, setTime] = useState({
    current: { second: 0, minute: 0 },
    duration: { second: 0, minute: 0 },
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [volume, setVolume] = useState(50);

  async function play() {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  }

  function pause() {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
  function handlePlayChosen(song: (typeof musicList)[0]) {
    if (song.id === track.id && isPlaying) {
      pause();
      return;
    }
    setTrack(song);
    play();
  }

  async function nextTrack() {
    const currentIndex = musicList.findIndex((item) => item.id === track.id);
    if (currentIndex < musicList.length - 1) {
      setTrack(musicList[currentIndex + 1]);
      setIsPlaying(true);
    }
  }

  function previousTrack() {
    const currentIndex = musicList.findIndex((item) => item.id === track.id);
    if (audioRef.current!.currentTime > 10 || currentIndex === 0) {
      audioRef.current!.currentTime = 0;
    } else if (currentIndex > 0) {
      setTrack(musicList[currentIndex - 1]);
      setIsPlaying(true);
    }
  }
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const seekTime =
        (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
    }
  };
  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (audioRef.current) {
      const volume = Number(e.target.value) / 100;
      audioRef.current.volume = volume;
      setVolume(volume * 100);
      if (volumeRef.current) {
        volumeRef.current.value = String(volume * 100);
      }
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
        setTime({
          current: {
            second: Math.floor((audio.currentTime ?? 0) % 60),
            minute: Math.floor((audio.currentTime ?? 0) / 60),
          },
          duration: {
            second: Math.floor((audio.duration ?? 0) % 60),
            minute: Math.floor((audio.duration ?? 0) / 60),
          },
        });
        if (durationRef.current && audio.duration) {
          const percentage = (audio.currentTime / audio.duration) * 100;
          durationRef.current.style.width = `${percentage}%`;
        }
      };

      const handleLoadedData = () => {
        handleTimeUpdate();
      };

      function handleEnded() {
        setIsPlaying(false);
        nextTrack();
      }
      function handleCanPlay() {
        if (isPlaying) {
          audio.play().catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
        }
      }
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadeddata", handleLoadedData);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("canplay", handleCanPlay);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadeddata", handleLoadedData);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [track]);
  const pathname = usePathname();
  useEffect(() => {
    setIsMaximized(false);
  }, [pathname]);

  const contextValues = {
    audioRef,
    durationRef,
    durationBodyRef,
    isPlaying,
    setIsPlaying,
    track,
    setTrack,
    time,
    setTime,
    play,
    pause,
    nextTrack,
    previousTrack,
    handleSeek,
    handleVolumeChange,
    volumeRef,
    volume,
    handlePlayChosen,
    setIsMaximized,
    isMaximized,
  };
  return (
    <PlayerContext.Provider value={contextValues}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
