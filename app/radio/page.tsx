import { MusicGrid } from "@/components/UI/MusicGrid";

const radioStations = [
  {
    title: "90s Hits",
    subtitle: "Nostalgia in sounds",
    imageUrl: "/img/albums/arcane.png",
    type: "playlist" as const,
  },
  {
    title: "Chill Wave",
    subtitle: "Relaxing vibes",
    imageUrl: "/img/albums/ogbuda.png",
    type: "playlist" as const,
  },
  {
    title: "Energetic Drive",
    subtitle: "For active driving",
    imageUrl: "/img/albums/szn.png",
    type: "playlist" as const,
  },
  {
    title: "Night Radio",
    subtitle: "Music for late hours",
    imageUrl: "/img/albums/image.png",
    type: "playlist" as const,
  },
];

export default function RadioPage() {
  return (
    <div className="relative z-10 min-h-screen backdrop-blur-sm">
      <div className="space-y-6 p-6">
        <header></header>

        <section></section>
      </div>
    </div>
  );
}
