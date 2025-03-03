import { Search } from "lucide-react";
import React from "react";

interface IInput {
  placeholder?: string;
  className?: string;
}

export default function Input({
  placeholder = "Search",
  className,
  ...props
}: IInput) {
  return (
    <div
      className={`group flex items-center gap-2 rounded-full text-sm ${className}`}
    >
      <Search className="text-neutral-500" width={18} />
      <input
        placeholder={placeholder}
        className="transition-color h-full w-full bg-transparent p-2 outline-none duration-300 group-hover:text-neutral-200"
        type="text"
        {...props}
      />
    </div>
  );
}
