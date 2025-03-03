import { LucideIcon } from "lucide-react";

interface ControlButtonProps {
  Icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export function ControlButton({
  Icon,
  onClick,
  className = "",
  isActive = false,
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`transition-opacity hover:opacity-80 ${className}`}
    >
      <Icon
        className={`${isActive ? "opacity-100" : "opacity-60"} text-neutral-300`}
      />
    </button>
  );
}
