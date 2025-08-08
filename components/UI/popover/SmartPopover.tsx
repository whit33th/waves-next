"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface SmartPopoverProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  offset?: number; // gap between anchor and popover
  preferredSides?: ("top" | "bottom" | "left" | "right")[]; // optional priority
  className?: string;
  margin?: number; // viewport margin
}

// Reusable smart positioning popover
export function SmartPopover({
  anchorRef,
  isOpen,
  onClose,
  children,
  offset = 5,
  preferredSides = ["bottom", "top", "right", "left"],
  className = "",
  margin = 8,
}: SmartPopoverProps) {
  const popRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties | undefined>();
  const [ready, setReady] = useState(false);
  const [side, setSide] = useState<"top" | "bottom" | "left" | "right" | null>(
    null,
  );

  useEffect(() => {
    if (!isOpen) return;

    function calcPosition() {
      const anchor = anchorRef.current;
      const pop = popRef.current;
      if (!anchor || !pop) return;

      const rect = anchor.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Ensure pop has size (rendered once) before measuring
      const popRect = pop.getBoundingClientRect();

      // Helper to clamp values within viewport with margin
      const clamp = (val: number, min: number, max: number) =>
        Math.min(Math.max(val, min), max);

      type Side = "top" | "bottom" | "left" | "right";
      interface Candidate {
        side: Side;
        top: number;
        left: number;
        visibleArea: number;
        clipped: boolean;
      }
      const candidates: Candidate[] = [];

      // Determine dynamic order by available free space if user didn't customize (they passed default)
      const usingDefaultPref =
        preferredSides.length === 4 && new Set(preferredSides).size === 4;
      const free = {
        top: rect.top,
        bottom: vh - rect.bottom,
        left: rect.left,
        right: vw - rect.right,
      } as const;
      let sidesOrder = [...preferredSides];
      if (usingDefaultPref) {
        sidesOrder = (Object.entries(free) as [Side, number][]) // auto sort by most space
          .sort((a, b) => b[1] - a[1])
          .map((e) => e[0]);
      }

      for (const side of sidesOrder) {
        let top = 0;
        let left = 0;
        if (side === "bottom") {
          top = rect.bottom + offset; // 10px gap
          left = rect.left + rect.width / 2 - popRect.width / 2;
        } else if (side === "top") {
          top = rect.top - popRect.height - offset;
          left = rect.left + rect.width / 2 - popRect.width / 2;
        } else if (side === "right") {
          top = rect.top + rect.height / 2 - popRect.height / 2;
          left = rect.right + offset;
        } else if (side === "left") {
          top = rect.top + rect.height / 2 - popRect.height / 2;
          left = rect.left - popRect.width - offset;
        }

        // Proposed rectangle before clamp
        let proposedTop = top;
        let proposedLeft = left;

        // Clamp within viewport margins
        proposedLeft = clamp(proposedLeft, margin, vw - popRect.width - margin);
        proposedTop = clamp(proposedTop, margin, vh - popRect.height - margin);

        // Compute visible area (approx) after clamping
        const visibleWidth = Math.min(
          popRect.width,
          vw - proposedLeft - margin,
        );
        const visibleHeight = Math.min(
          popRect.height,
          vh - proposedTop - margin,
        );
        const visibleArea =
          Math.max(0, visibleWidth) * Math.max(0, visibleHeight);
        const clipped = visibleArea < popRect.width * popRect.height;

        candidates.push({
          side,
          top: proposedTop,
          left: proposedLeft,
          visibleArea,
          clipped,
        });
      }

      // Prefer first non-clipped candidate in preferred order
      const perfect = candidates.find((c) => !c.clipped);
      const best =
        perfect || candidates.sort((a, b) => b.visibleArea - a.visibleArea)[0];

      if (best) {
        setStyle({ top: best.top, left: best.left });
        setSide(best.side);
        setReady(true);
        return;
      }

      // Fallback center
      setStyle({
        top: clamp(rect.bottom + offset, margin, vh - popRect.height - margin),
        left: clamp(rect.left, margin, vw - popRect.width - margin),
      });
      setSide("bottom");
      setReady(true);
    }

    requestAnimationFrame(calcPosition);

    const ro = new ResizeObserver(() => requestAnimationFrame(calcPosition));
    if (anchorRef.current) ro.observe(anchorRef.current);
    window.addEventListener("resize", calcPosition);
    window.addEventListener("scroll", calcPosition, true);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calcPosition);
      window.removeEventListener("scroll", calcPosition, true);
    };
  }, [isOpen, preferredSides, offset, anchorRef, margin]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999]"
      onMouseDown={(e) => {
        if (
          popRef.current &&
          !popRef.current.contains(e.target as Node) &&
          !anchorRef.current?.contains(e.target as Node)
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={popRef}
        style={style}
        data-side={side || undefined}
        className={`absolute min-w-40 rounded-md border border-neutral-800 bg-neutral-900/95 p-2 shadow-xl ring-1 ring-black/40 backdrop-blur-md transition-all duration-150 ${side === "bottom" ? "origin-top" : ""} ${side === "top" ? "origin-bottom" : ""} ${side === "left" ? "origin-right" : ""} ${side === "right" ? "origin-left" : ""} ${ready ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `scale-95 opacity-0 ${side === "bottom" ? "-translate-y-1" : ""} ${side === "top" ? "translate-y-1" : ""} ${side === "left" ? "translate-x-1" : ""} ${side === "right" ? "-translate-x-1" : ""}`} ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
