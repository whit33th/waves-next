// const playlists = [
//   {
//     title: "Favorite Tracks",
//     subtitle: "Made for you",
//     imageUrl: "/img/albums/arcane.png",
//     type: "playlist" as const,
//   },
//   {
//     title: "Recently Played",
//     subtitle: "Your history",
//     imageUrl: "/img/albums/ogbuda.png",
//     type: "playlist" as const,
//   },
//   {
//     title: "My Playlist #1",
//     subtitle: "42 tracks",
//     imageUrl: "/img/albums/szn.png",
//     type: "playlist" as const,
//   },
//   {
//     title: "Rock Collection",
//     subtitle: "67 tracks",
//     imageUrl: "/img/albums/image.png",
//     type: "album" as const,
//   },
// ];

export default function LibraryPage() {
  return (
    <div className="relative z-10 backdrop-blur-sm">
      <div className="space-y-6 p-6">
        <header>
          <h1 className="mb-2 text-3xl font-bold text-white">Your Library</h1>
          <p className="text-neutral-300">
            Your playlists, albums and favorite tracks
          </p>
        </header>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Recently Created
          </h2>
          {/* <AlbumSection items={playlists} /> */}
        </section>
      </div>
    </div>
  );
}
