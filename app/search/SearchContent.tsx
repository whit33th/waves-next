"use client";
import { useSearchParams } from "next/navigation";
import SearchResultsContent from "./SearchResultsContent";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold text-white/90">
        Results for &quot;{q}&quot;
      </h1>
      <SearchResultsContent searchQuery={q} />
    </>
  );
}