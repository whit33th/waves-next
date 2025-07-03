import Image from "next/image";
import Link from "next/link";

export default function MainPageCover() {
  return (
    <div className="mx-12 flex flex-col gap-6">
      <div className="flex h-[calc(100dvh-165px)] flex-col items-center justify-center gap-6">
        <Image
          src={"/img/albums/arcane.png"}
          alt="playing now"
          width={400}
          height={400}
          className="aspect-square rounded-lg object-contain"
        />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-medium sm:text-2xl">
            Arcane - Main Theme
          </h1>
          <Link
            href={""}
            className="text-xs font-medium text-neutral-400/90 transition hover:opacity-80 sm:text-sm"
          >
            Arcane Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
