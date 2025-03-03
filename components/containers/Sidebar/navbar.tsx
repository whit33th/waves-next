import VibeMeter from "@/components/UI/widgets/bpmMeter";
import { Home, Library, Heart, Mic, TrendingUp, Flame, Podcast, Radio } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Links = [
  { icon: <Home size={20} />, label: "Home", href: "/" },
  { icon: <Library size={20} />, label: "Playlist", href: "/library" },
  { icon: <Podcast size={20} />, label: "Favorites", href: "/podcast" },
  { icon: <Radio size={20} />, label: "Podcast", href: "/radio" },
  { icon: <Flame size={20} />, label: "New Hits", href: "/trends" },
];
const NavMenu = (
  <div className="flex flex-col gap-y-7">
    {Links.map((item, index) => (
      <Link
        href={item.href}
        key={index}
        className="flex cursor-pointer items-center gap-x-2 text-neutral-400 transition hover:opacity-80"
      >
        {item.icon}
      </Link>
    ))}
  </div>
);

const Logo = (
  <div>
    <Image
      src={"/reference/ref.png"}
      alt="Your logo"
      width={40}
      height={40}
      className="aspect-square rounded-full"
    />
  </div>
);
export default function Navbar() {
  return (
    <div className="flex h-full flex-col items-center justify-between gap-y-2 border-r border-[--border] p-2">
      <div className="flex flex-col gap-y-4">
        <VibeMeter />
        {/* <Back /> */}
      </div>

      {NavMenu}
      {Logo}
    </div>
  );
}
