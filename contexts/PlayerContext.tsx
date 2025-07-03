"use client";
import { createContext, useRef } from "react";

export const PlayerContext = createContext({});

function PlayerContextProvider(props: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const contextValues = { audioRef };
  return (
    <PlayerContext.Provider value={contextValues}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
