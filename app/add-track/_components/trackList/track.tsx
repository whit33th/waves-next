import { Trash2 } from "lucide-react";
import React from "react";
import PlayButton from "../../../../components/UI/buttons/ControllerButtons/PlayButton";

interface TrackProps {
  track?: File;
  index: number;
  onDelete?: () => void;
  onDragStart?: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDrop?: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDragOver?: (e: React.DragEvent<HTMLLIElement>) => void;
  draggable?: boolean;
}

export default function Track({
  track,
  index,
  onDelete,
  onDragStart,
  onDrop,
  onDragOver,
  draggable = false,
}: TrackProps) {
  return (
    <li
      draggable={draggable}
      onDragStart={onDragStart ? (e) => onDragStart(e, index) : undefined}
      onDrop={onDrop ? (e) => onDrop(e, index) : undefined}
      onDragOver={onDragOver}
      className="group flex w-full cursor-grab items-center gap-3 rounded transition active:cursor-grabbing"
    >
      <span className="text-text-secondary text-center text-sm underline">
        {index + 1}
      </span>
      <div
        className="grid w-full items-center hover:bg-black/10"
        style={{ gridTemplateColumns: "auto 1fr auto", gap: "0.75rem" }}
      >
        <div className="flex scale-80 items-center justify-center rounded-full">
          <PlayButton />
        </div>
        <div className="min-w-0">
          <p className="text-text-primary truncate font-medium">
            {track ? track.name.replace(/\.[^/.]+$/, "") : "Track Title"}
          </p>
          <p className="text-text-secondary text-sm">
            {track
              ? `${(track.size / 1024 / 1024).toFixed(1)} MB • 1:30`
              : "Unknown • 1:30"}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-green-500">OK</span>
          <button
            onClick={onDelete}
            type="button"
            className="ml-2 p-1 text-white transition-colors hover:text-red-500"
            aria-label="Delete track"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <svg
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mx-auto text-neutral-400"
      >
        {/* Left column */}
        <circle cx="3" cy="4" r="1.5" fill="currentColor" />
        <circle cx="3" cy="10" r="1.5" fill="currentColor" />
        <circle cx="3" cy="16" r="1.5" fill="currentColor" />
        {/* Right column */}
        <circle cx="8" cy="4" r="1.5" fill="currentColor" />
        <circle cx="8" cy="10" r="1.5" fill="currentColor" />
        <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      </svg>
    </li>
  );
}
