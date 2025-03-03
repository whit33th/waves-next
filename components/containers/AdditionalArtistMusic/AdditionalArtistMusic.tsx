import ActionBtn from "@/components/UI/buttons/actionBtn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AdditionalArtistMusic({ artist = "Arcane Studio" }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium text-xl text-neutral-400/90">{artist} Albums</h1>
      <div className="flex h-[800px] flex-col gap-4 *:flex-1 *:overflow-hidden *:rounded-xl *:bg-neutral-400/20 lg:h-[400px] lg:flex-row">
        <div className="flex flex-col">
          <div className="h-full overflow-y-auto p-4">
            <div className="grid grid-cols-[repeat(auto-fit,_100px)] justify-center justify-items-center gap-4">
              {Array.from({ length: 17 }).map((_, i) => (
                <Link key={i} href={""}>
                  <Image
                    src={"/img/albums/arcane.png"}
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
          <Link
            href={`/artist/${artist}/albums`}
            className="border-t border-neutral-400/20 p-4 text-center text-sm text-neutral-400 transition-colors hover:text-neutral-200"
          >
            See all albums
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="h-full overflow-y-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                className="flex items-center justify-between gap-2 p-4 text-neutral-300 first:rounded-t-xl odd:bg-neutral-400/5"
                key={i}
              >
                <Link href={""} className="aspect-square w-14">
                  <Image
                    src={"/img/albums/arcane.png"}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                </Link>

                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-neutral-50">Pusto</h2>
                    <h3>OG Buda</h3>
                  </div>
                  <span>2:31</span>
                </div>
                <ActionBtn text="Edit" />
              </div>
            ))}
          </div>
          <Link
            href={`/artist/${encodeURIComponent(artist)}/tracks`}
            className="border-t border-neutral-400/20 p-4 text-center text-sm text-neutral-400 transition-colors hover:text-neutral-200"
          >
            See all tracks
          </Link>
        </div>
      </div>
    </div>
  );
}
