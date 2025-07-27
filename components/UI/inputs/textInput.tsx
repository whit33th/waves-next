import React from "react";
import type { LucideIcon } from "lucide-react";

export default function TextInput({
  icon: Icon,
  placeholder,
  name,
  onChange = () => {},
  classNames = "",
  ref = null,
  ...props
}: {
  icon: LucideIcon;
  placeholder: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
  ref?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement> & {}) {
  return (
    <div
      className={` ${classNames} text-text-primary placeholder-text-secondary bg-input-bg/90 group flex w-full items-center gap-3 rounded-lg pl-3 outline-pink-500 focus-within:outline-[1.5px] focus-within:outline-dashed hover:outline-[1.5px] hover:outline-dashed`}
    >
      <span className="text-text-secondary">
        <Icon size={20} />
      </span>
      <input
        ref={ref}
        type="text"
        name={name}
        placeholder={placeholder}
        className="placeholder:text-text-secondary text-text-primary w-full border-none bg-transparent py-3 outline-none"
        required
        autoComplete="off"
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
