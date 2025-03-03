
import { Suspense } from 'react';
import SearchResultSection from '@/components/containers/SearchResults/SearchResultSection';
import { mockSearchResults } from '@/data/mockSearchResults';

export default function SearchResults({
  searchParams
}: {
  searchParams: { q: string }
}) {
  const { q } = searchParams;

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1800px] px-6 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white/90">
          Results for &quot;{q}&quot;
        </h1>

        <div className="space-y-12">
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </div>
      </div>
    </div>
  );
}
