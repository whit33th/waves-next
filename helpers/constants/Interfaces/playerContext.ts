import { musicList } from "@/helpers/data/musicData";

export interface IPlayerContextType {
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
