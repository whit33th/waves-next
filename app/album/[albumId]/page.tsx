"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Play, Clock, User } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { usePlayer } from "@/components/context/PlayerContext/PlayerContext";
import { use, useState } from "react";
import { motion } from "framer-motion";
import useColorThief from "use-color-thief";
import Link from "next/link";
import { Track } from "@/helpers/constants/Interfaces/playerContext";

interface AlbumPageProps {
  params: Promise<{ albumId: string }>;
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const { handleSetTrackList, handlePlayTrack } = usePlayer();
  const { albumId } = use(params);

  const album = useQuery(api.albums.getAlbumById, {
    albumId: albumId as Id<"albums">,
  });

  const tracks = useQuery(api.tracks.getTracks, {
    albumId: albumId as Id<"albums">,
  });

  const { palette } = useColorThief(album?.coverUrl || "", {
    format: "hex",
    colorCount: 5,
    quality: 10,
  });

  if (album === null) {
    notFound();
  }

  if (album === undefined || tracks === undefined) {
    return <div>Loading</div>;
  }

  const handlePlayAlbum = () => {
    if (tracks && tracks.length > 0) {
      handleSetTrackList(tracks);
    }
  };

  const handleTrackPlay = (track: Track) => {
    handlePlayTrack(track);
  };

  const totalDuration =
    tracks?.reduce((acc, track) => acc + track.duration, 0) || 0;
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div
      className="space-y-8"
      style={
        palette && {
          background: `linear-gradient(180deg, ${palette?.[0]}30, ${palette?.[1]}20, ${palette?.[2]}10, ${palette?.[3]}05, ${palette?.[4]}00)`,
        }
      }
    >
      <div className="flex flex-col flex-wrap items-start gap-8 md:flex-row">
        <div className="group relative flex w-full flex-shrink-0 items-center transition-all duration-300 ease-in-out md:w-fit">
          <div className="relative mx-auto h-64 w-64 md:mx-0 md:h-80 md:w-80">
            <div className="absolute inset-0 overflow-hidden rounded-full opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:opacity-100">
              <Image
                src={album.coverUrl || "/placeholder-image.jpg"}
                alt={album.title}
                width={12}
                height={12}
                className="h-full w-full animate-spin rounded-full blur-xl invert"
              />
            </div>

            <div className="relative h-full w-full overflow-hidden rounded-full shadow-2xl">
              <Image
                src={album.coverUrl || "/placeholder-image.jpg"}
                alt={album.title}
                fill
                className="animate-wave object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="mb-2 text-sm tracking-wide text-neutral-400 uppercase">
              Album
            </p>
            <h1 className="mb-4 text-4xl leading-tight font-bold text-white md:text-6xl">
              {album.title}
            </h1>

            <div className="mb-6 flex items-center gap-3 text-neutral-300">
              <User size={20} />
              <span className="text-lg font-medium">{album.artist?.name}</span>
              <span className="text-neutral-500">•</span>
              <span>{new Date(album._creationTime).getFullYear()}</span>
              <span className="text-neutral-500">•</span>
              <span>{tracks?.length ?? 0} tracks</span>
              <span className="text-neutral-500">•</span>
              <span>{formatDuration(totalDuration)}</span>
            </div>

            {album.description && (
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-400">
                {album.description}
              </p>
            )}
          </motion.div>

          <motion.button
            onClick={handlePlayAlbum}
            className="flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Play fill="currentColor" size={20} />
            Play Album
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="mb-6 text-2xl font-semibold text-white">Tracks</h2>

        <div className="space-y-1">
          {tracks?.map((track, index) => (
            <motion.div
              key={track._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              onDoubleClick={() => handleTrackPlay(track)}
              className="group relative"
            >
              <div className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:translate-x-1 hover:bg-white/5">
                <div className="flex h-8 w-8 items-center justify-center">
                  <button
                    onClick={() => handleTrackPlay(track)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <Play
                      fill="black"
                      size={14}
                      className="ml-0.5 text-black"
                    />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-medium text-white">
                    {track.title}
                  </h3>
                  <p className="truncate text-sm text-neutral-400">
                    <Link
                      href={track.artist ? `/artist/${track.artist._id}` : "#"}
                      prefetch={false}
                      className="hover:underline"
                    >
                      {track.artist?.name}
                    </Link>
                    {track.featuredArtists?.length > 0 && ", "}
                    {track.featuredArtists?.map((artist, i, arr) =>
                      artist ? (
                        <span key={artist._id}>
                          <Link
                            href={`/artist/${artist._id}`}
                            prefetch={false}
                            className="hover:underline"
                          >
                            {artist.name}
                          </Link>
                          {i < arr.length - 1 ? ", " : ""}
                        </span>
                      ) : null,
                    )}
                  </p>
                </div>

                <div className="text-sm text-neutral-400">
                  {Math.floor(track.duration / 60)}:
                  {String(track.duration % 60).padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
