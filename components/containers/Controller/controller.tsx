"use client";

import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";
import { DesktopPlayer } from "./DesktopPlayer";
import { FullScreenPlayer } from "./FullScreenPlayer";
import { MobilePlayer } from "./MobilePlayer";

export default function Controller() {
  const { trackList } = usePlayer();
  return (
    <>
      <FullScreenPlayer />

      <AnimatePresence mode="wait">
        {trackList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="flex gap-5 bg-neutral-950/95 p-3 md:relative md:bottom-auto md:bg-neutral-950/70 md:backdrop-blur-none"
          >
            <MobilePlayer />
            <DesktopPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
