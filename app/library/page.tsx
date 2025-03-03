import { MusicGrid } from "@/components/UI/MusicGrid";

const playlists = [
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  {
    title: "Chill Mix",
    subtitle: "Created for you",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist",
  },
  // ...more playlists
];

export default function LibraryPage() {
  return (
    <div className="h-full space-y-6 p-6">
      <header className="pb-6">
        <h1 className="text-3xl font-bold">Your Library</h1>
      </header>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Playlists</h2>
          <button className="rounded-full bg-neutral-800 px-4 py-2 text-sm">
            Show all
          </button>
        </div>
        <MusicGrid items={playlists} />
      </section>
    </div>
  );
}
