import React from "react";
import { Play, Heart } from "lucide-react";
import Image from "next/image";

interface MusicItemProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  type?: "album" | "playlist" | "podcast";
}

const MusicItem = ({
  title,
  subtitle,
  imageUrl,
  type = "album",
}: MusicItemProps) => (
  <div className="bg-card/40 hover:bg-card/60 group relative rounded-xl p-4 transition-all">
    <div className="relative aspect-square rounded-lg">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-all group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button className="rounded-full bg-white/10 p-2 backdrop-blur-md transition-transform hover:scale-105">
          <Heart className="h-5 w-5" />
        </button>
        <button className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg transition-transform hover:scale-105">
          <Play fill="currentColor" className="h-5 w-5" />
        </button>
      </div>
    </div>
    <div className="mt-4 space-y-1">
      <h3 className="line-clamp-1 font-medium">{title}</h3>
      <p className="text-muted-foreground line-clamp-2 text-sm">{subtitle}</p>
    </div>
  </div>
);

export const MusicGrid = ({ items }: { items: MusicItemProps[] }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
    {items.map((item, i) => (
      <MusicItem key={i} {...item} />
    ))}
  </div>
);
