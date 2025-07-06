"use client";

import { PlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import WriteEffectText from "../Effects/WriteEffectText";

export default function TrackCoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { track, isMaximized } = useContext(PlayerContext);

  return isMaximized ? (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="flex max-w-lg flex-col items-center gap-6 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={track.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="aspect-square w-full max-w-[600px] lg:w-[400px]"
          >
            <Image
              src={track?.image || "/placeholder-cover.png"}
              alt="playing now"
              width={400}
              height={400}
              className="h-full w-full rounded-2xl object-cover object-center drop-shadow-2xl"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={`${track.id}-info`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-1 text-center"
        >
          <motion.h1 className="text-2xl font-bold text-white sm:text-3xl">
            <WriteEffectText
              interval={50}
              text={track?.title || "Track Title"}
            />
          </motion.h1>
          <Link
            href="#"
            className="text-lg font-medium text-neutral-300/90 transition hover:text-white"
          >
            <WriteEffectText
              text={track?.artist || "Artist Name"}
              interval={30}
            />
          </Link>
        </motion.div>
      </div>
    </div>
  ) : (
    children
  );
}
