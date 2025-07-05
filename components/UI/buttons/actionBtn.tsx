"use client";
import { LucideIcon } from "lucide-react";
import React from "react";

interface DefaultBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  Icon?: LucideIcon;
}

export default function ActionBtn({
  text,
  className,
  Icon,
  ...props
}: DefaultBtnProps) {
  return (
    <button
      className={`${className} bg-button flex items-center justify-center gap-2 rounded-[8px] p-1 px-2 text-xs font-medium text-nowrap text-neutral-800 shadow transition hover:opacity-80`}
      {...props}
    >
      {Icon && <Icon size={14} />}
      {text}
    </button>
  );
}
