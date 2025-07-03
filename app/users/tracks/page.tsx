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
  const userId = "user-id"; // Здесь указывается ID пользователя

  console.log(tracks)
  
  useEffect(() => {
    // Загружаем все треки при монтировании компонента
    const fetchTracks = async () => {
      const fetchedTracks = await getAllTracks();
      setTracks(fetchedTracks);
    };
    fetchTracks();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Выберите файл!");

    try {
      await uploadTrack(file);
      const updatedTracks = await getAllTracks(); // Загружаем обновленный список треков
      setTracks(updatedTracks);
    } catch (error) {
      console.error("Ошибка при загрузке трека:", error);
      alert("Произошла ошибка при загрузке.");
    }
  };

  const handleAddTrackToUser = async (trackId: string) => {
    try {
      await addTrackToUser(userId, trackId);
      alert("Трек добавлен в вашу коллекцию!");
    } catch (error) {
      console.error("Ошибка при добавлении трека:", error);
      alert("Произошла ошибка при добавлении трека.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-bold">Музыкальное приложение</h1>

      {/* Форма для загрузки файла */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="mt-2 bg-green-500 px-4 py-2 text-white"
      >
        Загрузить
      </button>

      {/* Список треков */}
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
              Добавить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
