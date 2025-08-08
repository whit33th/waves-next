"use client";

import DefaultBtn from "@/components/UI/buttons/defaultBtn";
import AudioInput from "@/components/UI/inputs/AudioInput";
import ImageInput from "@/components/UI/inputs/ImageInput";
import { useCreateAlbum } from "@/helpers/hooks/albums";
import { useCreateTracks } from "@/helpers/hooks/tracks";
import { useCreateUser } from "@/helpers/hooks/users";
import { Album, Music, User } from "lucide-react";
import { useState } from "react";
import TextInput from "../../components/UI/inputs/textInput";
import TrackList from "./_components/trackList/TrackList";

export default function AddTrackPage() {
  const [coverImg, setCoverImg] = useState<File | null>(null);
  const [trackList, setTrackList] = useState<File[]>([]);
  const [albumTitle, setAlbumTitle] = useState("");

  const createUser = useCreateUser();
  const createAlbum = useCreateAlbum();
  const createTracks = useCreateTracks();

  function handleAddTracks(files: FileList | null) {
    if (!files || files.length === 0) {
      alert("No files selected or files are invalid.");
      return;
    }
    let added = 0;
    const newFiles: File[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) return;
      if (trackList.some((t) => t.name === file.name)) return;
      newFiles.push(file);
      added++;
    });
    if (newFiles.length) {
      setTrackList((prev) => {
        const all = [...prev, ...newFiles];
        if (all.length === 1) {
          setAlbumTitle(all[0].name.replace(/\.[^/.]+$/, ""));
        } else if (all.length > 1) {
          setAlbumTitle("");
        }
        return all;
      });
    }
    if (!added) alert("No new valid tracks were added.");
  }
  function handleDeleteTrack(index: number) {
    setTrackList((prev) => {
      const newTracks = prev.filter((_, i) => i !== index);
      if (newTracks.length === 1) {
        setAlbumTitle(newTracks[0].name.replace(/\.[^/.]+$/, ""));
      } else if (newTracks.length === 0) {
        setAlbumTitle("");
      }
      // если больше одного — не меняем albumTitle
      return newTracks;
    });
  }

  const isSingle = trackList.length === 1;
  const isAlbum = trackList.length > 1;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const user = await createUser(formData);
    const album = await createAlbum({
      userId: user,
      albumTitle,
      cover: coverImg as File,
    });

    await createTracks({
      userId: user,
      albumId: album,
      trackList: trackList,
    });
  }
  return (
    <section className="p-6">
      <div className=" ">
        <div className="mb-8">
          <h1 className="text-text-primary mb-2 text-3xl font-bold">
            {isSingle
              ? "We about to create a single"
              : isAlbum
                ? "We about to create an album"
                : "We about to add tracks"}
          </h1>
          <p className="text-text-secondary">
            {isSingle
              ? "You are publishing a single. Title will match the track name."
              : isAlbum
                ? "You are publishing an album. Set album title and add tracks."
                : "Upload your music track(s) and fill in the information"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <TextInput
                icon={User}
                placeholder="Artist name *"
                name="artist"
                onChange={() => {}}
                classNames="!outline-blue-500"
              />

              <TextInput
                icon={isSingle ? Music : Album}
                placeholder={isSingle ? "Track Title" : "Album Title"}
                name="albumTitle"
                value={albumTitle ?? ""}
                onChange={(e) => setAlbumTitle(e.target.value)}
                disabled={isSingle}
              />

              <div className="flex flex-col gap-4">
                <ImageInput
                  id="cover-upload"
                  label="Cover Image"
                  onClick={setCoverImg}
                />
                <AudioInput handleAddTracks={handleAddTracks} />
              </div>
            </div>

            <TrackList
              tracks={trackList}
              setTracks={setTrackList}
              handleDeleteTrack={handleDeleteTrack}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <DefaultBtn
              type="submit"
              text={
                !trackList.length
                  ? "Add tracks to publish"
                  : trackList.length === 1
                    ? "Publish as Single"
                    : `Publish as Album`
              }
              disabled={!trackList.length}
              className="bg-primary hover:bg-primary/90 !text-button-text"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
