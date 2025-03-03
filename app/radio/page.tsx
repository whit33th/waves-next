import { MusicGrid } from "@/components/UI/MusicGrid";

const collections = [
  {
    title: "Late Night Drive",
    subtitle: "Perfect vibes for night cruising",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Morning Boost",
    subtitle: "Energetic tracks to start your day",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Workout Energy",
    subtitle: "High-tempo beats for your workout",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  // Add more collections...
];

export default function RadioPage() {
  return (
    <div className="space-y-8 p-6">
      <header className="pb-6">
        <h1 className="text-3xl font-bold">Radio Collections</h1>
        <p className="text-muted-foreground">Curated vibes for every moment</p>
      </header>

      <div className="space-y-6">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Collections</h2>
            <button className="text-primary text-sm hover:underline">
              Show all
            </button>
          </div>
          <MusicGrid items={collections} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Mood Mixes</h2>
            <button className="text-primary text-sm hover:underline">
              Show all
            </button>
          </div>
          <MusicGrid items={collections.slice(0, 4)} />
        </section>
      </div>
    </div>
  );
}
