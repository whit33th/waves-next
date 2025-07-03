"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
      <div className="flex justify-between gap-4 border-b border-[--border] px-4 py-4">
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
      <div className="flex max-h-screen flex-col gap-y-1.5 overflow-y-auto px-4">
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl px-2 py-1 transition hover:bg-neutral-800"
          >
            <Image
              className="aspect-square rounded-lg"
              src={"/img/albums/arcane.png"}
              alt="song"
              width={35}
              height={35}
            />
            <div className="flex flex-col gap-1">
              <h3 className="max-w-[16ch] truncate text-sm">
                Paint The Town To Blue
              </h3>
              <p className="text-xs text-neutral-500">Arcane</p>
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
