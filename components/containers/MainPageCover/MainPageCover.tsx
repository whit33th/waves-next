"use client";
import { PlayerContext } from "@/contexts/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function MainPageCover() {
  const { track } = useContext(PlayerContext);
  return (
    <div className="mx-12 flex flex-col gap-6">
      <div className="flex min-h-[calc(100dvh-196px)] flex-col items-center justify-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={track.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.333, ease: "easeInOut" }}
            className="aspect-square w-full max-w-[500px]"
          >
            <Image
              src={track?.image || "/placeholder-cover.png"}
              alt="playing now"
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-medium sm:text-2xl">
            {track?.title || "Track Title"}
          </h1>
          <Link
            href={""}
            className="text-xs font-medium text-neutral-400/90 transition hover:opacity-80 sm:text-sm"
          >
            {track?.artist || "Artist Name"}
          </Link>
        </div>
      </div>
    </div>
  );
}
