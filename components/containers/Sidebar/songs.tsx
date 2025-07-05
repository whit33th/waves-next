"use client";
import SectionTabs from "./SectionTabs";
import SongList from "./SongList";

export default function Songs() {
  return (
    <div className="flex h-screen w-64 flex-col gap-y-2">
      <SectionTabs />
      <SongList />
    </div>
  );
}
