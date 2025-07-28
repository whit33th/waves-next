import { Track } from "@/helpers/constants/Interfaces/playerContext";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Time {
  current: { second: number; minute: number; millisecond: number };
  duration: { second: number; minute: number; millisecond: number };
}

type RepeatMode = 0 | 1 | 2;

interface PlayerStore {
  // State
  isPlaying: boolean;
  trackList: Track[];
  currentTrackIndex: number;
  time: Time;
  volume: number;
  repeatMode: RepeatMode;
  isShuffle: boolean;
  isLyricsOpen: boolean;
  isMaximized: boolean;
  isFullPlayerOpen: boolean;

  // Setters
  setIsPlaying: (value: boolean) => void;
  setTrackList: (tracks: Track[]) => void;
  setCurrentTrackIndex: (index: number) => void;
  setTime: (value: Time) => void;
  setVolume: (value: number) => void;
  setRepeatMode: (value: RepeatMode) => void;
  setIsShuffle: (value: boolean) => void;
  setIsLyricsOpen: (value: boolean) => void;
  setIsMaximized: (value: boolean) => void;
  setIsFullPlayerOpen: (value: boolean) => void;

  // Actions
  handleSetTrackList: (tracks: Track[]) => void;
  handlePlayTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;

  // Helpers
  formatTime: (timeInSeconds: number) => {
    minute: number;
    second: number;
    millisecond: number;
  };
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      trackList: [],
      currentTrackIndex: 0,
      time: {
        current: { second: 0, minute: 0, millisecond: 0 },
        duration: { second: 0, minute: 0, millisecond: 0 },
      },
      volume: 50,
      repeatMode: 0,
      isShuffle: false,
      isLyricsOpen: false,
      isMaximized: false,
      isFullPlayerOpen: false,

      setIsPlaying: (value) => set({ isPlaying: value }),
      setTrackList: (tracks) => set({ trackList: tracks }),
      setCurrentTrackIndex: (index) => set({ currentTrackIndex: index }),
      setTime: (value) => set({ time: value }),
      setVolume: (value) => set({ volume: value }),
      setRepeatMode: (value) => set({ repeatMode: value }),
      setIsShuffle: (value) => set({ isShuffle: value }),
      setIsLyricsOpen: (value) => set({ isLyricsOpen: value }),
      setIsMaximized: (value) => set({ isMaximized: value }),
      setIsFullPlayerOpen: (value) => set({ isFullPlayerOpen: value }),

      handleSetTrackList: (tracks) => {
        set({ trackList: tracks, currentTrackIndex: 0, isPlaying: true });
      },
      handlePlayTrack: (song) => {
        const { trackList, currentTrackIndex, isPlaying } = get();
        const trackIndex = trackList.findIndex((t) => t._id === song._id);
        set({ currentTrackIndex: trackIndex });
        if (song._id === trackList[currentTrackIndex]?._id && isPlaying) {
          set({ isPlaying: false });
          return;
        }
        if (song._id !== trackList[currentTrackIndex]?._id) {
          set((state) => ({
            time: {
              current: { second: 0, minute: 0, millisecond: 0 },
              duration: state.time.duration,
            },
          }));
        }
        set({ isPlaying: true });
      },
      play: () => {
        set({ isPlaying: true });
      },
      pause: () => {
        set({ isPlaying: false });
      },
      nextTrack: () => {
        set((state) => {
          if (state.currentTrackIndex < state.trackList.length - 1) {
            return {
              currentTrackIndex: state.currentTrackIndex + 1,
              isPlaying: true,
            };
          }
          return {};
        });
      },
      handleRepeat: () => {
        set((state) => ({
          repeatMode:
            state.repeatMode < 2 ? ((state.repeatMode + 1) as RepeatMode) : 0,
        }));
      },
      formatTime: (timeInSeconds: number) => ({
        minute: Math.floor(timeInSeconds / 60),
        second: Math.floor(timeInSeconds % 60),
        millisecond: Math.floor((timeInSeconds % 1) * 1000),
      }),
    }),
    {
      name: "player-storage", // уникальное имя для localStorage
      partialize: (state) => ({
        // Сохраняем только нужные данные, исключаем refs и функции
        trackList: state.trackList,
        currentTrackIndex: state.currentTrackIndex,
        volume: state.volume,
        repeatMode: state.repeatMode,
        isShuffle: state.isShuffle,
        isLyricsOpen: state.isLyricsOpen,
        isMaximized: state.isMaximized,
        isFullPlayerOpen: state.isFullPlayerOpen,
        // Не сохраняем isPlaying и time, так как они должны сбрасываться при перезагрузке
      }),
    },
  ),
);
