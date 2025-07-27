"use client";

import WidgetBoard from "@/components/containers/Controller/WidgetBoard";
import { AlbumSection } from "@/components/UI/MusicGrid";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import Image from "next/image";

export default function HomePage() {
  const albums = useQuery(api.albums.getAllAlbums);
  console.log(albums);

  return (
    <div className="relative backdrop-blur-sm">
      <div className="space-y-8 p-6">
        {/* <header className="text-center"></header> */}
        {/* <WidgetBoard /> */}

        <section className="space-y-12">
          <AlbumSection items={albums ?? []} label="New releases" />
          <AlbumSection items={albums ?? []} label="Top charts" />
          <AlbumSection items={albums ?? []} label="Recommended for you" />
          <AlbumSection items={albums ?? []} label="More like this" />
        </section>
      </div>
    </div>
  );
}
