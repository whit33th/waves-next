"use client";
import DefaultBtn from "@/components/UI/buttons/defaultBtn";
import Input from "@/components/UI/inputs/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex h-[80px] w-full items-center justify-between gap-4 px-6"
    >
      <Input
        placeholder="Search Music"
        className="w-full"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
      <div className="hidden gap-2 sm:flex">
        <DefaultBtn text="Travis Scott" />
        <DefaultBtn text="Hip-hop" />
        <DefaultBtn text="Dora" />
        <DefaultBtn text="Cute rock" />
      </div>
    </form>
  );
}
