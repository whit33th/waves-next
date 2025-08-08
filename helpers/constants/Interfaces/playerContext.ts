import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
export type Track = FunctionReturnType<typeof api.tracks.getTracks>[number];

export interface IPlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  durationRef: React.RefObject<HTMLDivElement | null>;
  durationBodyRef: React.RefObject<HTMLInputElement | null>;
  volumeRef: React.RefObject<HTMLInputElement | null>;

  // State
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  trackList: Track[];
  setTrackList: (tracks: Track[]) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  time: {
    current: { second: number; minute: number; millisecond: number };
    duration: { second: number; minute: number; millisecond: number };
  };
  setTime: (value: {
    current: { second: number; minute: number; millisecond: number };
    duration: { second: number; minute: number; millisecond: number };
  }) => void;
  volume: number;
  setVolume: (value: number) => void;
  repeatMode: number;
  handleRepeat: () => void;
  isShuffle: boolean;
  setIsShuffle: (value: boolean) => void;
  isLyricsOpen: boolean;
  setIsLyricsOpen: (value: boolean) => void;
  isFullPlayerOpen: boolean;
  setIsFullPlayerOpen: (value: boolean) => void;

  isMaximized: boolean;
  setIsMaximized: (value: boolean) => void;
  queueIsOpen: boolean; // NEW
  setQueueIsOpen: (value: boolean) => void; // NEW

  // Actions
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  handleSetTrackList: (tracks: Track[]) => void;
  handleSeek: (value: number) => void;
  handleVolumeChange: (value: number) => void;
  handlePlayTrack: (track: Track) => void;
  handleMute: () => void;

  // Helper functions
  formatTime: (timeInSeconds: number) => {
    minute: number;
    second: number;
    millisecond: number;
  };
}
