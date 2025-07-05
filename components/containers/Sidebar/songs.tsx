"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { musicList } from "@/helpers/data/musicData";

export default function Songs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSection = searchParams.get("section");

  const sections = [
    { id: 1, name: "Favorites" },
    { id: 2, name: "Albums" },
    { id: 3, name: "Artists" },
    { id: 4, name: "History" },
  ];

  return (
    <div className="flex h-screen w-64 flex-col gap-y-2">
      <div className="border-border flex justify-between gap-4 border-b px-4 py-4">
        {sections.map((section) => (
          <Suspense key={section.id} fallback={<div>Loading</div>}>
            <button
              key={section.id}
              onClick={() => {
                router.push(`?section=${section.id}`);
              }}
              className={`text-xs transition ${
                currentSection === section.id.toString()
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {section.name}
            </button>
          </Suspense>
        ))}
      </div>
      <div className="flex max-h-screen flex-col overflow-y-auto">
        {musicList.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between p-2 hover:bg-neutral-900"
          >
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  className="aspect-square object-cover"
                  src={song.image}
                  alt="song"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="max-w-[16ch] truncate text-sm">{song.title}</h3>
                <p className="text-xs text-neutral-500">{song.artist}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-500">4:13</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
