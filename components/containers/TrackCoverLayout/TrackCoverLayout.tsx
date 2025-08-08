"use client";

import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import WriteEffectText from "../Effects/WriteEffectText";

export default function TrackCoverLayout() {
  const trackList = usePlayerStore((s) => s.trackList);
  const currentTrackIndex = usePlayerStore((s) => s.currentTrackIndex);
  const isMaximized = usePlayerStore((s) => s.isMaximized);
  const setIsMaximized = usePlayerStore((s) => s.setIsMaximized);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024 && isMaximized) {
        setIsMaximized(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized, setIsMaximized]);

  if (!isMaximized || trackList.length === 0) return;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(124px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 z-40"
      >
        <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
          <motion.div
            key={trackList[currentTrackIndex]._id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="aspect-square w-full max-w-[600px] lg:w-[400px]"
          >
            <Image
              src={
                trackList[currentTrackIndex]?.coverUrl || "/default-cover.jpg"
              }
              alt="playing now"
              width={300}
              height={300}
              className="h-full w-full rounded-2xl object-cover object-center drop-shadow-2xl"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <motion.h1 className="text-2xl font-bold text-white sm:text-3xl">
              <WriteEffectText
                interval={50}
                text={
                  trackList[currentTrackIndex]?.title || "currentTrack Title"
                }
              />
            </motion.h1>
            <Link
              href="#"
              className="text-lg font-medium text-neutral-300/90 transition hover:text-white"
            >
              <WriteEffectText
                text={
                  trackList[currentTrackIndex]?.artist?.name || "Artist Name"
                }
                interval={30}
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
