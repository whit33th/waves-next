"use client";
import { ListMusic } from "lucide-react";
import { usePlayerStore } from "@/components/context/PlayerContext/store";
import { ControlButton } from "../ControlButton";

export function QueueButton() {
  const queueIsOpen = usePlayerStore((s) => s.queueIsOpen);
  const setQueueIsOpen = usePlayerStore((s) => s.setQueueIsOpen);
  return (
    <ControlButton
      Icon={ListMusic}
      size={20}
      isActive={queueIsOpen}
      onClick={() => setQueueIsOpen(!queueIsOpen)}
    />
  );
}
