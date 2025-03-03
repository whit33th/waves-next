"use client";
import SearchResultSection from "@/components/containers/SearchResults/SearchResultSection";
import { mockSearchResults } from "@/data/mockSearchResults";

export default function SearchResultsContent({
  searchQuery,
}: {
  searchQuery: string;
}) {
  return (
    <div className="space-y-12">
      <SearchResultSection
        title="Top Result"
        layout="featured"
        items={mockSearchResults.topResult}
      />

      <SearchResultSection
        title="Songs"
        layout="grid"
        items={mockSearchResults.songs}
      />

      <SearchResultSection
        title="Artists"
        layout="grid"
        items={mockSearchResults.artists}
      />

      <SearchResultSection
        title="Albums"
        layout="grid"
        items={mockSearchResults.albums}
      />

      <SearchResultSection
        title="Playlists"
        layout="grid"
        items={mockSearchResults.playlists}
      />
    </div>
  );
}
