import AnimatedBackground from "@/components/UI/AnimatedBackground";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Suspense } from "react";
import Controller from "../Controller/controller";
import Search from "../Search/Search";
import UniversalSidebar from "./UniversalSidebar";
import Navbar from "./navbar";
import TrackCoverLayout from "../TrackCoverLayout/TrackCoverLayout";

export default function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col overflow-hidden md:flex-row">
        <div className="bg-dark order-3 md:order-1">
          <Navbar />
        </div>

        <aside className="order-4 flex-shrink-0 md:order-2">
          <Suspense
            fallback={<div className="hidden w-80 md:block">Loading...</div>}
          >
            <UniversalSidebar />
          </Suspense>
        </aside>

        <div className="relative order-1 flex flex-1 flex-col overflow-hidden md:order-3">
          <AnimatedBackground />

          <main className="flex flex-1 flex-col overflow-hidden">
            <Search />
            <div className="flex-1 overflow-auto overflow-x-hidden">
              <TrackCoverLayout>{children}</TrackCoverLayout>
            </div>
          </main>

          <Controller />
        </div>
      </div>
    </SidebarProvider>
  );
}
