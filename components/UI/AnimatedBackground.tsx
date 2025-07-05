"use client";
import { PlayerContext } from "@/contexts/PlayerContext";
import Image from "next/image";
import { Suspense, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedBackground() {
  const { track } = useContext(PlayerContext);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={track.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 z-[-1] overflow-hidden"
      >
        <Image
          src={track.image ?? "/placeholder-cover.png"}
          alt="background"
          width={150}
          height={150}
          className="animate-wave h-full w-full scale-150 object-cover blur-3xl"
          priority
        />
      </motion.div>
    </AnimatePresence>
  );
}
