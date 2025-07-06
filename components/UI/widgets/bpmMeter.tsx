"use client";

import { motion } from "framer-motion";
import { type FC, useEffect, useState } from "react";

interface VibeMeterProps {
  bpm?: number;
}

const VibeMeter: FC<VibeMeterProps> = ({ bpm = 220 }) => {
  const [animatedBPM, setAnimatedBPM] = useState(0);

  useEffect(() => {
    const step = bpm > animatedBPM ? 1 : -1;
    if (animatedBPM !== bpm) {
      const timeout = setTimeout(() => {
        setAnimatedBPM((prev) => prev + step);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [bpm, animatedBPM]);

  const getVibeData = (bpm: number) => {
    if (bpm < 80)
      return {
        text: "Chill",
        color: "from-blue-500 to-purple-500",
        glow: "rgba(0, 183, 255, 0.6)",
      };
    if (bpm < 120)
      return {
        text: "Groovy",
        color: "from-green-500 to-blue-500",
        glow: "rgba(0, 255, 128, 0.6)",
      };
    if (bpm < 160)
      return {
        text: "Energetic",
        color: "from-yellow-500 to-orange-500",
        glow: "rgba(255, 183, 0, 0.6)",
      };
    return {
      text: "Intense",
      color: "from-red-500 to-pink-500",
      glow: "rgba(255, 0, 128, 0.8)",
    };
  };

  const { color, glow } = getVibeData(animatedBPM);
  const arcProgress = (animatedBPM / 220) * 251.32;
  const glowIntensity = animatedBPM / 220;
  const animationSpeed = 60 / (animatedBPM || 60); // Pulse timing

  return (
    <motion.div
      className="relative flex aspect-square h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-black/40 shadow-xl backdrop-blur-lg"
      animate={{
        scale: 1 + glowIntensity * 0.05,
        boxShadow: `0px 0px ${10 + glowIntensity * 20}px ${glow}`,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-lg`}
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: animationSpeed,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>

      <motion.div
        className="z-10 text-center"
        animate={{
          y: [0],
        }}
        transition={{
          duration: animationSpeed * 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div className="text-xs font-bold text-white">
          {animatedBPM}
        </motion.div>
      </motion.div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />

        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="3"
          strokeDasharray="251.32"
          strokeDashoffset={251.32 - arcProgress}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          animate={{
            filter: `drop-shadow(0px 0px ${10 + glowIntensity * 20}px ${glow})`,
            strokeWidth: [3, 4, 3],
          }}
          transition={{
            duration: animationSpeed,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={glow} />
            <stop offset="100%" stopColor={""} />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default VibeMeter;
