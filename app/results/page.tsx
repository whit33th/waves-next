'use client'
import { useSearchParams } from "next/navigation";
import SearchResultSection from "@/components/containers/SearchResults/SearchResultSection";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q");

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-[1800px] px-6 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white/90">
          Results for &quot;{q}&quot;
        </h1>

        <div className="space-y-12">
          <SearchResultSection
            title="Top Result"
            layout="featured"
            items={
              [
                /* your data */
              ]
            }
          />

          <SearchResultSection
            title="Songs"
            layout="grid"
            items={
              [
                /* your data */
              ]
            }
          />

          <SearchResultSection
            title="Artists"
            layout="grid"
            items={
              [
                /* your data */
              ]
            }
          />

          <SearchResultSection
            title="Albums"
            layout="grid"
            items={
              [
                /* your data */
              ]
            }
          />

          <SearchResultSection
            title="Playlists"
            layout="grid"
            items={
              [
                /* your data */
              ]
            }
          />
        </div>
      </div>
    </div>
  );
}
