import { MusicGrid } from "@/components/UI/MusicGrid";

const featuredContent = [
  {
    title: "New Releases",
    subtitle: "Fresh tracks",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist" as const,
  },
  {
    title: "Top Tracks",
    subtitle: "Most popular",
    imageUrl: "/img/albums/ogbuda.png",
    type: "playlist" as const,
  },
  {
    title: "Recommendations",
    subtitle: "Picked for you",
    imageUrl: "/img/albums/szn.png",
    type: "playlist" as const,
  },
  {
    title: "Favorites",
    subtitle: "Your loved ones",
    imageUrl: "/img/albums/image.png",
    type: "playlist" as const,
  },
];

export default function HomePage() {
  return (
    <div className="relative z-10 min-h-screen backdrop-blur-sm">
      <div className="space-y-8 p-6">
        <header className="text-center"></header>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Featured</h2>
          <MusicGrid items={featuredContent} />
        </section>
      </div>
    </div>
  );
}
