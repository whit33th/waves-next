"use client";
import { useState, useEffect } from "react";
import {
  getAllTracks,
  uploadTrack,
  addTrackToUser,
} from "@/app/actions/musicActions";
import { Track } from "@prisma/client";

export default function MusicApp() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const userId = "user-id";

  console.log(tracks);

  useEffect(() => {
    const fetchTracks = async () => {
      const fetchedTracks = await getAllTracks();
      setTracks(fetchedTracks);
    };
    fetchTracks();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    try {
      await uploadTrack(file);
      const updatedTracks = await getAllTracks();
      setTracks(updatedTracks);
    } catch (error) {
      console.error("Error uploading track:", error);
      alert("An error occurred while uploading.");
    }
  };

  const handleAddTrackToUser = async (trackId: string) => {
    try {
      await addTrackToUser(userId, trackId);
      alert("Track added to your collection!");
    } catch (error) {
      console.error("Error adding track:", error);
      alert("An error occurred while adding track.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-bold">Music Application</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="mt-2 bg-green-500 px-4 py-2 text-white"
      >
        Upload
      </button>

      <ul className="mt-4 grid gap-4">
        {tracks?.map((t) => (
          <li key={t.id} className="rounded-lg border p-4">
            <p className="font-semibold">
              {t.title} - {t.artist}
            </p>
            <audio controls src={t.fileUrl} className="w-full" />
            <button
              onClick={() => handleAddTrackToUser(t.id)}
              className="mt-2 rounded bg-blue-500 px-3 py-1 text-white"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
