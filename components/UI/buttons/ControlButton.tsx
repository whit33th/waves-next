"use client";
import { LucideIcon } from "lucide-react";

interface ControlButtonProps {
  Icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  size?: number;
}

export function ControlButton({
  Icon,
  onClick,
  className = "",
  isActive = false,
  size = 20,
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`transition-opacity hover:opacity-80 ${className}`}
    >
      <Icon
        size={size}
        className={`${isActive ? "opacity-100" : "opacity-60"} text-neutral-300`}
      />
    </button>
  );
}
