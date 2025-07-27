"use client";

import { ChevronLeft, ListMusic, X } from "lucide-react";
import { useState } from "react";
import SongList from "./SongList";

export default function UniversalSidebar() {
  const [currentView, setCurrentView] = useState("queue");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (isMobileSidebarOpen) {
    return (
      <div className="*:border-border fixed inset-0 z-50 flex transform flex-col bg-neutral-950 transition-transform duration-300 md:hidden">
        <div className="flex flex-shrink-0 items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <ListMusic size={20} className="text-white" />
            <h2 className="font-semibold text-white">Queue</h2>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="rounded-lg p-2 transition-colors hover:bg-neutral-800"
          >
            <X size={20} className="text-neutral-400" />
          </button>
        </div>

        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <SongList />
        </div>
      </div>
    );
  }

  if (isCollapsed) {
    return (
      <div className="border-border hidden h-full w-12 flex-col items-center border-r py-4 md:flex">
        <button
          onClick={() => setIsCollapsed(false)}
          className="rounded-lg p-2 transition-colors hover:bg-neutral-800"
        >
          <ChevronLeft size={16} className="rotate-180 text-neutral-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="*:border-border border-border hidden h-full w-80 flex-col border-r bg-neutral-950 md:flex">
      <div className="flex flex-shrink-0 items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="text-white">
            <ListMusic size={16} />
          </div>
          <h2 className="font-medium text-white">Queue</h2>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="rounded p-1 transition-colors hover:bg-neutral-800"
        >
          <ChevronLeft size={16} className="text-neutral-400" />
        </button>
      </div>

      <div className="sidebar-scroll flex-1 overflow-x-hidden overflow-y-auto">
        <SongList />
      </div>
    </div>
  );
}
