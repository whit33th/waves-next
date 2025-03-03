import AdditionalArtistMusic from "@/components/containers/AdditionalArtistMusic/AdditionalArtistMusic";
import MainPageCover from "@/components/containers/MainPageCover/MainPageCover";
export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-12">
      <MainPageCover />
      <AdditionalArtistMusic />
    </div>
  );
}
