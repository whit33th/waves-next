"use client";

import WidgetBoard from "@/components/containers/Controller/WidgetBoard";
import { AlbumSection } from "@/components/UI/MusicGrid";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import Image from "next/image";
import { AlbumGridSkeleton } from "@/components/UI/LoadingSkeleton";

export default function HomePage() {
  const albums = useQuery(api.albums.getAllAlbums);

  return (
    <div className="">
      <div className="space-y-8">
        {/* <header className="text-center"></header> */}
        {/* <WidgetBoard /> */}

        <section className="space-y-12">
          {albums === undefined ? (
            <>
              <AlbumGridSkeleton />
              <AlbumGridSkeleton />
              <AlbumGridSkeleton />
            </>
          ) : albums === null ? (
            <div className="text-center text-white/60">
              Failed to load albums. Please refresh the page.
            </div>
          ) : (
            <>
              <WidgetBoard />
              <AlbumSection items={albums} label="New releases" />
              <AlbumSection items={albums} label="Top charts" />
              <AlbumSection items={albums} label="Recommended for you" />
              <AlbumSection items={albums} label="More like this" />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
