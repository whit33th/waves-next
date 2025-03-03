"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-[calc(100%-165px)] flex-col items-center justify-center px-4">
      <div
        className={`flex flex-col items-center gap-6 transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-8xl font-light tracking-tight text-neutral-200">
          404
        </h1>
        <p className="text-center text-lg text-neutral-400">
          The page you&apos;re looking for cannot be found.
        </p>
        <Link
          href="/"
          className="mt-4 flex items-center gap-2 rounded-full bg-neutral-800/50 px-6 py-3 text-sm text-neutral-200 backdrop-blur-sm transition-all hover:bg-neutral-700/50"
        >
          <Home size={18} />
          Return Home
        </Link>
      </div>
    </div>
  );
}
