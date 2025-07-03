"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900"
    >
      <ArrowLeft />
    </button>
  );
}
