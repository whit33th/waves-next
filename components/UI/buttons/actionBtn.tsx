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
      className={`${className} flex items-center justify-center gap-2 text-nowrap rounded-[10px] bg-[--button] p-2 px-3 text-xs font-medium text-neutral-800 shadow transition hover:opacity-80`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {text}
    </button>
  );
}
