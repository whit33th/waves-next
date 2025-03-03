import AnimatedBackground from "@/components/UI/AnimatedBackground";
import Controller from "../Controller/controller";
import Search from "../Search/Search";
import Navbar from "./navbar";
import Songs from "./songs";
import { Suspense } from "react";

export default function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden h-full md:flex">
        <Navbar />
        <Suspense fallback={<div className="w-64">Loading...</div>}>
          <Songs />
        </Suspense>
      </aside>
      <main className="relative flex flex-1 flex-col overflow-hidden">
        <AnimatedBackground />
        <div className="flex-1 overflow-auto overflow-x-hidden">
          <Search />
          {children}
        </div>
        <Controller />
      </main>
    </div>
  );
}
