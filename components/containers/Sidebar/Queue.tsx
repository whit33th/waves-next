"use client";

import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { Track } from "@/helpers/constants/Interfaces/playerContext";
import { AnimatePresence, motion } from "framer-motion";
import { ListMusic, X } from "lucide-react";
import { useState } from "react";
import SongItem from "./SongItem";

export default function Queue() {
  const queueIsOpen = usePlayerStore((s) => s.queueIsOpen);
  const trackList = usePlayerStore((s) => s.trackList);
  const setTrackList = usePlayerStore((s) => s.setTrackList);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // width of panel
  const panelWidth = 320;

  const slideVariants = {
    initial: { x: panelWidth },
    animate: { x: 0 },
    exit: { x: panelWidth },
  };

  return (
    <>
      {/* Mobile full screen queue */}
      <AnimatePresence>
        {isMobileSidebarOpen && queueIsOpen && (
          <motion.div
            key="queue-mobile"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="*:border-border fixed inset-0 z-50 flex flex-col bg-neutral-950 md:hidden"
          >
            <div className="flex flex-shrink-0 items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <ListMusic size={20} className="text-white" />
                <h2 className="font-semibold text-white">Queue</h2>
              </div>
              <button
                onClick={() => {
                  setIsMobileSidebarOpen(false);
                }}
                className="rounded-lg p-2 transition-colors hover:bg-neutral-800"
              >
                <X size={20} className="text-neutral-400" />
              </button>
            </div>

            <div className="flex-1 overflow-x-hidden overflow-y-auto">
              {trackList.length === 0 ? (
                <div className="p-6 text-center text-neutral-400">
                  No tracks
                </div>
              ) : (
                trackList.map((track: Track, index: number) => (
                  <SongItem key={track._id} track={track} index={index} />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop absolute overlay queue */}
      <AnimatePresence mode="wait">
        {queueIsOpen && trackList.length > 0 && (
          <motion.div
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ width: panelWidth }}
            className="border-border bg-bg/95 absolute top-0 right-0 z-40 hidden h-full flex-col border-l shadow-xl backdrop-blur-xs md:flex"
          >
            <div className="border-border flex items-center justify-between border-b p-4">
              <span className="text-sm text-neutral-400">
                {trackList.length} tracks
              </span>
              <button
                onClick={() => setTrackList([])}
                className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900 active:scale-95"
              >
                <X className="h-4 w-4 text-neutral-400" />
                <span>Clear</span>
              </button>
            </div>

            <div className="flex max-h-screen flex-col overflow-y-auto p-4">
              {trackList.length === 0 ? (
                <div className="text-center text-neutral-400">No tracks</div>
              ) : (
                trackList.map((track: Track, index: number) => (
                  <SongItem key={track._id} track={track} index={index} />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
