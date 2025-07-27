"use client";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedBackground() {
  const { currentTrackIndex, isMaximized, trackList, setCurrentTrackIndex } =
    usePlayer();
  return (
    trackList.length > 0 && (
      <AnimatePresence mode="wait">
        <motion.div
          key={trackList[currentTrackIndex].albumId}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 z-[-1] overflow-hidden"
        >
          <Image
            src={trackList[currentTrackIndex].coverUrl!}
            alt="background"
            width={150}
            height={150}
            className={`animate-wave h-full w-full scale-150 object-cover blur-3xl transition-opacity duration-500 ease-in-out ${isMaximized ? "opacity-100" : "opacity-5 grayscale-100"}`}
            priority
          />
        </motion.div>
      </AnimatePresence>
    )
  );
}
