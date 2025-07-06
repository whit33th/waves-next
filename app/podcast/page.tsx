import { MusicGrid } from "@/components/UI/MusicGrid";

const podcasts = [
  {
    title: "Techno Podcast",
    subtitle: "Latest episodes",
    imageUrl: "/img/albums/arcane.png",
    type: "podcast" as const,
  },
  {
    title: "Music Talks",
    subtitle: "Artist interviews",
    imageUrl: "/img/albums/ogbuda.png",
    type: "podcast" as const,
  },
  {
    title: "City Sounds",
    subtitle: "Urban culture",
    imageUrl: "/img/albums/szn.png",
    type: "podcast" as const,
  },
  {
    title: "Indie Stories",
    subtitle: "Independent artists",
    imageUrl: "/img/albums/image.png",
    type: "podcast" as const,
  },
];

export default function PodcastPage() {
  return (
    <div className="relative z-10 min-h-screen backdrop-blur-sm">
      <div className="space-y-6 p-6">
        <header></header>

        <section></section>
      </div>
    </div>
  );
}
