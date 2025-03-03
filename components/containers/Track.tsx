"use client";
import { Plus, Play, Clock, Check, Star, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
// import { usePlayer } from "@/hooks/usePlayer"; // Assuming you have this hook
// import { useLibrary } from "@/hooks/useLibrary"; // Assuming you have this hook

interface TrendingTrackProps {
  position: number;
  title: string;
  artist: string;
  plays?: number;
  duration: string;
  imageUrl: string;
  trackId: string;
  initialAdded?: boolean;
  initialFavorite?: boolean;
}

export const Track = ({
  position,
  title,
  artist,
  plays = 60000,
  duration,
  imageUrl = "/img/albums/arcane.png",
  trackId,
  initialAdded = false,
  initialFavorite = false,
}: TrendingTrackProps) => {
  const [isAdded, setIsAdded] = useState(initialAdded);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [openUpward, setOpenUpward] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  //   const { playTrack } = usePlayer();
  //   const { addToLibrary, removeFromLibrary, toggleFavorite } = useLibrary();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    // playTrack(trackId);
  };

  const handleAddToLibrary = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isAdded) {
        // await removeFromLibrary(trackId);
      } else {
        // await addToLibrary(trackId);
      }
      setIsAdded((prev) => !prev);
    } catch (error) {
      console.error("Failed to update library:", error);
      // Here you might want to show a toast notification
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      //   await toggleFavorite(trackId);
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Failed to update favorites:", error);
      // Here you might want to show a toast notification
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuOpen = () => {
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const menuHeight = 156; // Approximate height of the menu
      const shouldOpenUpward = spaceBelow < menuHeight && rect.top > menuHeight;

      setOpenUpward(shouldOpenUpward);
      setMenuPosition({
        top: shouldOpenUpward
          ? rect.top - menuHeight + window.scrollY
          : rect.bottom + window.scrollY,
        left: rect.left - 180 + window.scrollX,
      });
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="group relative flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all hover:bg-neutral-800/20">
      <div className="flex items-center gap-4">
        <span className="w-8 text-center text-sm text-neutral-400">
          {position}
        </span>
        <div className="relative h-12 w-12">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded object-cover"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all group-hover:opacity-100"
          >
            <Play fill="white" size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-neutral-400">{artist}</p>
          </div>
          <div className="hidden gap-2 opacity-0 group-hover:opacity-100 md:flex">
            {isAdded ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <button
                onClick={handleAddToLibrary}
                className="text-neutral-400 hover:text-white"
              >
                <Plus size={16} />
              </button>
            )}
            <button
              onClick={handleFavorite}
              className={`hover:text-white ${
                isFavorite ? "text-yellow-400" : "text-neutral-400"
              }`}
            >
              <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="hidden items-center gap-[2px] text-sm text-neutral-400 md:flex">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className={`h-4 w-[2px] rounded-full ${
                i <= Math.ceil(plays / 20000)
                  ? "bg-neutral-50"
                  : "bg-neutral-500/90"
              }`}
            />
          ))}
        </span>
        <span className="hidden items-center gap-2 text-sm text-neutral-400 md:flex">
          <Clock size={14} />
          {duration}
        </span>
        <button
          ref={menuButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            handleMenuOpen();
          }}
          className="text-neutral-400 hover:text-white md:hidden"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Apple-style Dropdown Menu with smart positioning */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
          className={`fixed z-50 w-48 rounded-xl bg-neutral-800/95 p-1 shadow-lg backdrop-blur-sm md:hidden ${
            openUpward ? "animate-fade-in-up" : "animate-fade-in-down"
          }`}
        >
          <button
            onClick={(e) => {
              handleAddToLibrary(e);
              setIsMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10"
          >
            {isAdded ? <Check size={16} /> : <Plus size={16} />}
            {isAdded ? "In Library" : "Add to Library"}
          </button>
          <button
            onClick={(e) => {
              handleFavorite(e);
              setIsMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10"
          >
            <Star
              size={16}
              fill={isFavorite ? "currentColor" : "none"}
              className={isFavorite ? "text-yellow-400" : ""}
            />
            {isFavorite ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      )}
    </div>
  );
};
