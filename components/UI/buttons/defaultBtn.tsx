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
      className={`${className} text-nowrap rounded-[10px] bg-neutral-700/30 p-2 px-3 text-xs font-medium text-neutral-400 shadow backdrop-blur-xl transition hover:bg-neutral-700/50`}
      {...props}
    >
      {text}
    </button>
  );
}
