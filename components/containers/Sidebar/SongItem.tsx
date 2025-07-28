"use client";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type GetTracksResult = FunctionReturnType<typeof api.tracks.getTracks>;
type Track = GetTracksResult extends Array<infer T> ? T : never;

export default function SongItem({
  track: song,
  index,
}: {
  track: Track;
  index: number;
}) {
  const { isPlaying, handlePlayTrack, trackList, currentTrackIndex } =
    usePlayer();

  const isCurrentTrack = currentTrackIndex === index;
  const showAsPlaying = isCurrentTrack;

  const handlePlay = () => {
    handlePlayTrack(song);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: index * 0.1, ease: "easeInOut" }}
        onDoubleClick={handlePlay}
        className={`group flex cursor-pointer items-center justify-between gap-4 rounded-lg p-2 transition select-none hover:bg-neutral-900 ${currentTrackIndex > index ? "hidden" : "block"} ${
          showAsPlaying ? "bg-neutral-800" : ""
        }`}
      >
        <div className="flex min-w-0 flex-1 gap-4">
          <div
            onClick={handlePlay}
            className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center"
          >
            <Image
              className="aspect-square rounded object-cover"
              src={song.coverUrl ?? ""}
              alt={song.album?.title || "No title"}
              width={40}
              height={40}
            />
            <button className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-neutral-900 opacity-0 transition *:fill-current group-hover:opacity-100">
              {showAsPlaying && isPlaying ? (
                <Pause size={16} />
              ) : (
                <Play size={16} />
              )}
            </button>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
            <h3
              className={`truncate text-sm ${
                showAsPlaying ? "text-white" : "text-neutral-200"
              }`}
            >
              {song.title}
            </h3>
            <Link
              href={`/artist/${encodeURIComponent(song.artist?.name ?? "unknown")}`}
              className="w-fit truncate text-xs text-neutral-500 hover:underline"
            >
              {song.artist?.name ?? "Unknown Artist"}
            </Link>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {/* Моковое время */}
          <p className="text-xs text-neutral-500">4:13</p>
        </div>
      </motion.div>

      {isCurrentTrack && currentTrackIndex + 1 !== trackList.length && (
        <div className="bg-border my-4 h-[1px] w-full"></div>
      )}
    </>
  );
}
