"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SongItemProps } from "@/helpers/constants/Interfaces/song";

interface QueueContextType {
  queue: SongItemProps[];
  currentIndex: number;
  setQueue: (tracks: SongItemProps[]) => void;
  addToQueue: (track: SongItemProps) => void;
  removeFromQueue: (index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  playTrackAt: (index: number) => void;
  shuffleQueue: () => void;
  clearQueue: () => void;
  currentTrack: SongItemProps | null;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export function QueueProvider({ children }: { children: ReactNode }) {
  const [queue, setQueueState] = useState<SongItemProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const currentTrack = queue[currentIndex] || null;

  const setQueue = (tracks: SongItemProps[]) => {
    setQueueState(tracks);
    setCurrentIndex(tracks.length > 0 ? 0 : -1);
  };

  const addToQueue = (track: SongItemProps) => {
    setQueueState((prev) => [...prev, track]);
  };

  const removeFromQueue = (index: number) => {
    setQueueState((prev) => {
      const newQueue = prev.filter((_, i) => i !== index);
      if (index < currentIndex) {
        setCurrentIndex((prev) => prev - 1);
      } else if (index === currentIndex) {
        if (newQueue.length === 0) {
          setCurrentIndex(-1);
        } else if (currentIndex >= newQueue.length) {
          setCurrentIndex(newQueue.length - 1);
        }
      }
      return newQueue;
    });
  };

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const playTrackAt = (index: number) => {
    if (index >= 0 && index < queue.length) {
      setCurrentIndex(index);
    }
  };

  const shuffleQueue = () => {
    if (queue.length <= 1) return;

    const currentTrack = queue[currentIndex];
    const otherTracks = queue.filter((_, i) => i !== currentIndex);

    for (let i = otherTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherTracks[i], otherTracks[j]] = [otherTracks[j], otherTracks[i]];
    }

    const newQueue = currentTrack
      ? [currentTrack, ...otherTracks]
      : otherTracks;
    setQueueState(newQueue);
    setCurrentIndex(0);
  };

  const clearQueue = () => {
    setQueueState([]);
    setCurrentIndex(-1);
  };

  return (
    <QueueContext.Provider
      value={{
        queue,
        currentIndex,
        setQueue,
        addToQueue,
        removeFromQueue,
        playNext,
        playPrevious,
        playTrackAt,
        shuffleQueue,
        clearQueue,
        currentTrack,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used within QueueProvider");
  }
  return context;
}
