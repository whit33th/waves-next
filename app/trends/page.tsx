import { Track } from "@/components/containers/Track";

export default function TrendsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="pb-6">
        <h1 className="text-3xl font-bold">Top Hits</h1>
        <p className="text-neutral-400">Top trending tracks this week</p>
      </header>

      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Track
            key={i}
            position={1}
            title="Song Title"
            artist="Artist Name"
            duration="3:45"
            imageUrl="/img/albums/arcane.png"
            trackId="track-123"
            initialAdded={false}
            initialFavorite={false}
          />
        ))}
        {/* Add more tracks */}
      </div>
    </div>
  );
}
