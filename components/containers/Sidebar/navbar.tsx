"use client";

import { Flame, Home, Library, Podcast, Radio } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  { icon: <Home size={20} />, label: "Home", href: "/" },
  {
    icon: <Library size={20} />,
    label: "Library",
    href: "/library",
    sidebarView: "queue" as const,
  },
  { icon: <Podcast size={20} />, label: "Podcasts", href: "/podcast" },
  { icon: <Radio size={20} />, label: "Radio", href: "/radio" },
  { icon: <Flame size={20} />, label: "Trends", href: "/trends" },
];
const NavMenu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-x-6 md:flex-col md:gap-x-0 md:gap-y-7">
      {Links.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`flex cursor-pointer flex-col items-center gap-x-2 transition hover:opacity-80 md:flex-row ${
            pathname === item.href ? "text-white" : "text-neutral-400"
          }`}
        >
          {item.icon}
          <span className="text-xs md:hidden">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

const Logo = (
  <Link href={"/profile"}>
    <Image
      src={"/reference/ref.png"}
      alt="Your logo"
      width={36}
      height={36}
      className="aspect-square rounded-full"
    />
  </Link>
);

export default function Navbar() {
  return (
    <nav className="border-border z-40 flex flex-row items-center justify-center gap-x-6 border-t bg-black/90 px-4 py-3 backdrop-blur-sm md:relative md:right-auto md:bottom-auto md:left-auto md:z-auto md:h-full md:flex-col md:items-center md:justify-between md:gap-x-0 md:gap-y-7 md:border-t-0 md:p-2 md:backdrop-blur-none">
      {Logo}
      <NavMenu />

      <div className="hidden md:flex md:flex-col md:gap-y-4">
        {/* <VibeMeter /> */}
      </div>
    </nav>
  );
}
