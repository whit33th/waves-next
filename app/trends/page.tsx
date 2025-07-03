import { Track } from "@/components/containers/Track";

const songs = [
  {
    id: 1,
    title: "1",
    artist: "9mice",
    src: "https://pub-fb640350bb524d3d891a11f8c04be5d9.r2.dev/1741035183173-%D0%9E%D0%A2%D0%A0%D0%90%D0%92%D0%9B%D0%95%D0%9D%20%D0%A2%D0%9E%D0%91%D0%9E%D0%9912345.mp3",
  },
  {
    id: 2,
    title: "2",
    artist: "9mice",
    src: "https://pub-fb640350bb524d3d891a11f8c04be5d9.r2.dev/1741091917211-%D0%9E%D0%A2%D0%A0%D0%90%D0%92%D0%9B%D0%95%D0%9D%20%D0%A2%D0%9E%D0%91%D0%9E%D0%99123123.mp3",
  },
];
export default function TrendsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="pb-6">
        <h1 className="text-3xl font-bold">Top Hits</h1>
        <p className="text-neutral-400">Top trending tracks this week</p>
      </header>

      <div className="space-y-2">
        {songs.map((song) => (
          <Track
            key={song.id}
            src={song.src}
            position={1}
            title={song.title}
            artist={song.artist}
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
