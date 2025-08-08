"use client";

import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { usePlayerBase } from "@/components/context/PlayerContext/PlayerContext";
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function VolumeControl() {
  const volume = usePlayerStore((s) => s.volume);
  const { handleVolumeChange, handleMute, volumeRef } = usePlayerBase();

  // Ensure ref always updated (previously only if already set)
  const volumeRefCallback = useCallback(
    (node: HTMLInputElement | null) => {
      if (node) volumeRef.current = node;
    },
    [volumeRef],
  );

  // Popover state
  const [open, setOpen] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const show = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setOpen(true);
  };
  const hide = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  // Drag / click on custom bar
  const barRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const setVolumeFromClientY = (clientY: number) => {
    const el = barRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const distanceFromBottom = rect.bottom - clientY; // 0 at bottom
    let percent = (distanceFromBottom / rect.height) * 100; // bottom=0 -> top=100
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    // We want pulling down to DECREASE volume => bottom=0, top=100 already matches intuition
    handleVolumeChange(Math.round(percent));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setVolumeFromClientY(e.clientY);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setVolumeFromClientY(e.clientY);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Cleanup dragging if mouse leaves window
  useEffect(() => {
    const end = () => (draggingRef.current = false);
    window.addEventListener("mouseup", end);
    window.addEventListener("pointerup", end);
    return () => {
      window.removeEventListener("mouseup", end);
      window.removeEventListener("pointerup", end);
    };
  }, []);

  const volumeValue = volume;
  const VolumeIcon =
    volumeValue === 0
      ? VolumeOff
      : volumeValue <= 25
        ? Volume
        : volumeValue <= 50
          ? Volume1
          : Volume2;

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <button
        className="text-neutral-300/60 transition hover:opacity-80 focus:outline-none"
        onClick={handleMute}
        aria-label="Mute / Unmute"
        type="button"
      >
        <VolumeIcon />
      </button>

      {/* Vertical popover */}
      <div
        className={
          `absolute bottom-full left-1/2 z-30 mb-2 origin-bottom -translate-x-1/2 rounded-full border border-white/5 bg-neutral-900/70 px-2 py-3 shadow-lg backdrop-blur-lg transition-all duration-200 ` +
          (open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0")
        }
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <div className="flex flex-col items-center">
          {/* Track container */}
          <div
            ref={barRef}
            className="relative h-28 w-1.5 rounded-full bg-neutral-100/15 select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div
              className="bg-primary absolute bottom-0 left-0 w-full cursor-pointer rounded-full"
              style={{ height: `${volumeValue}%` }}
            />
            {/* Hidden but accessible range input (keyboard). Inverted so that up increases */}
            <input
              ref={volumeRefCallback}
              type="range"
              min="0"
              max="100"
              value={volumeValue}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              aria-orientation="vertical"
              className="absolute top-1/2 left-1/2 h-32 w-8 -translate-x-1/2 -translate-y-1/2 rotate-90 cursor-pointer opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
