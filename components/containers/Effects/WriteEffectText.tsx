"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface WriteEffectTextProps {
  text: string;
  interval?: number;
}

export default function WriteEffectText({
  text,
  interval = 50,
}: WriteEffectTextProps) {
  const [result, setResult] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    setResult("");
    indexRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        setResult(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, interval]);

  return (
    <motion.p
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 13,
        duration: 0.6,
      }}
      key={result.length}
      className="inline-block w-full"
    >
      {result}
    </motion.p>
  );
}
