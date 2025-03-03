"use client";
import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchResults() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-[1800px] px-6 py-8">
        <Suspense fallback={<div>Loading search results...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
