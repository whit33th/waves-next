"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

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
      className={`${className} bg-button flex items-center justify-center gap-2 rounded-[10px] p-2 px-3 text-xs font-medium text-nowrap text-neutral-800 shadow transition hover:opacity-80`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {text}
    </button>
  );
}
