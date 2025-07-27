import React from "react";

interface DefaultBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
}

export default function DefaultBtn({
  text,
  className,
  ...props
}: DefaultBtnProps) {
  return (
    <button
      className={`${className} text-text-primary/90 rounded-[10px] bg-neutral-700/30 p-2 px-3 text-xs font-medium text-nowrap shadow-xs backdrop-blur-xl transition hover:bg-neutral-700/50 disabled:pointer-events-none disabled:opacity-50`}
      {...props}
    >
      {text}
    </button>
  );
}
