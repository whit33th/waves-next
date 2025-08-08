"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import { FunctionReturnType } from "convex/server";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "../context/PlayerContext/store";

type Album = FunctionReturnType<typeof api.albums.getAllAlbums>[number];

const Album = (props: Album) => {
  const handleSetTrackList = usePlayerStore((s) => s.handleSetTrackList);
  const albumTrackList = useQuery(api.tracks.getTracks, {
    albumId: props._id,
  });
  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleSetTrackList(albumTrackList ?? []);
  };
  const router = useRouter();
  function handleArtistClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/artist/${props.artist?._id}`);
  }
  return (
    <Link
      href={`/album/${props._id}`}
      className="group rounded-lg p-2.5 drop-shadow-2xl transition-colors hover:bg-white/5"
    >
      <div className="relative aspect-square">
        <Image
          src={props.coverUrl ?? ""}
          alt={props.title || "No title"}
          fill
          className="rounded-lg object-cover transition-all duration-1000 ease-in-out group-hover:hue-rotate-0 group-hover:duration-0 group-[&:not(:hover)]:hue-rotate-360"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/30 to-transparent to-20% opacity-0 transition-opacity group-hover:opacity-100" />
        <button
          onClick={handlePlay}
          className="absolute right-2 bottom-2 rounded-full bg-white/30 p-2 opacity-0 mix-blend-difference shadow-2xl backdrop-blur-xl backdrop-invert-100 transition-opacity duration-300 group-hover:opacity-100 hover:scale-107"
        >
          <Play fill="currentColor" className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-1">{props.title || "No title"}</h3>
        <span
          className="line-clamp-2 w-fit cursor-pointer text-xs text-gray-400 hover:underline"
          onClick={handleArtistClick}
        >
          {props.artist?.name || "Unknown Artist"}
        </span>
      </div>
    </Link>
  );
};

export const AlbumSection = ({
  items,
  label,
}: {
  items: Album[];
  label: string;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="pl-2.5 text-2xl font-semibold">{label}</h3>

      <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {items?.map((item) => (
          <Album key={item._id} {...item} />
        ))}
      </section>
    </div>
  );
};
