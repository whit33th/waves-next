"use client";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedBackground() {
  const { currentTrackIndex, isMaximized, trackList } = usePlayer();
  return (
    trackList.length > 0 &&
    trackList[currentTrackIndex]?.coverUrl && (
      <AnimatePresence mode="wait">
        <motion.div
          key={trackList[currentTrackIndex].albumId}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 overflow-hidden ${
            isMaximized ? "z-30 backdrop-brightness-125" : "z-[-1]"
          }`}
        >
          <Image
            src={trackList[currentTrackIndex].coverUrl!}
            alt="background"
            width={150}
            height={150}
            className={`animate-wave h-full w-full scale-150 object-cover blur-3xl transition-opacity duration-500 ease-in-out ${isMaximized ? "opacity-100" : "opacity-5 brightness-50 contrast-200 grayscale-100"}`}
            loading="eager"
            priority
          />
        </motion.div>
      </AnimatePresence>
    )
  );
}
