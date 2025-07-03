import React from "react";
import Image from "next/image";
import { Track } from "@/components/containers/Track";
import Link from "next/link";

interface SearchResultSectionProps {
  title: string;
  layout: "featured" | "grid";
  items: any[];
}

export default function SearchResultSection({
  title,
  layout,
  items,
}: SearchResultSectionProps) {
  const renderItem = (item: any, index: number) => {
    if (title === "Top Result") {
      return (
        <Link
          href=""
          className="flex max-w-2xl gap-6 rounded-xl bg-white/5 p-6 transition-colors hover:bg-white/10"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={180}
            height={180}
            className="rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 text-3xl font-bold text-white">{item.name}</h3>
            <p className="text-white/60">{item.description}</p>
          </div>
        </Link>
      );
    }

    if (title === "Songs") {
      return (
        <Track
          position={index + 1}
          title={item.title}
          artist={item.artist}
          duration={item.duration}
          imageUrl={item.image}
          trackId={item.id || String(index)}
        />
      );
    }

    // Updated card layout for Albums, Artists, and Playlists
    return (
      <Link
        href={""}
        className="group flex items-center gap-4 rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10 sm:block sm:p-4"
      >
        <div className="relative aspect-square h-[72px] w-[72px] flex-shrink-0 overflow-hidden sm:h-auto sm:w-full">
          <Image
            src={item.image}
            alt={item.name || item.title}
            fill
            className={`object-cover ${title === "Artists" ? "rounded-full" : "rounded-lg"}`}
          />
          <div className="absolute inset-0 hidden bg-black/20 group-hover:block" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center sm:mt-4">
          <h3 className="truncate font-medium text-white hover:underline">
            {item.name || item.title}
          </h3>
          <p className="truncate text-sm text-white/60">
            {title === "Albums"
              ? `${item.artist} • ${item.year}`
              : item.followers || item.description || item.artist}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-white/80 sm:mb-6">
        {title}
      </h2>

      <div
        className={` ${
          layout === "featured"
            ? "grid grid-cols-1 gap-6"
            : title === "Songs"
              ? "flex flex-col gap-1"
              : "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        } `}
      >
        {items.map((item, index) => (
          <div key={index} className="h-full">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </section>
  );
}
