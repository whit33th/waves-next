"use client";

import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { AnimatePresence, motion } from "framer-motion";
import { FullScreenPlayer } from "./FullScreenPlayer";
import { DesktopPlayer } from "./DesktopPlayer"; // now unified component

export default function Controller() {
  const trackListLength = usePlayerStore((s) => s.trackList.length);
  const isMaximized = usePlayerStore((s) => s.isMaximized);
  return (
    <>
      <FullScreenPlayer />
      <AnimatePresence mode="wait">
        {trackListLength > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex w-full flex-col bg-black/90 p-3 transition-colors md:relative md:bottom-auto md:bg-black/95 md:backdrop-blur-none ${
              isMaximized ? "z-50 !bg-black/5" : ""
            }`}
          >
            <DesktopPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
