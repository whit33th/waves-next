import { Text } from "lucide-react";

interface LyricsButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function LyricsButton({ isOpen, onClick }: LyricsButtonProps) {
  return (
    <button onClick={onClick} className="transition-opacity hover:opacity-80">
      <Text
        className={`${isOpen ? "opacity-100" : "opacity-60"} text-neutral-300`}
      />
    </button>
  );
}
