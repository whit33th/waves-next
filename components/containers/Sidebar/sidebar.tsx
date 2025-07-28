import AnimatedBackground from "@/components/UI/AnimatedBackground";
import Controller from "../Controller/controller";
import Search from "../Search/Search";
import TrackCoverLayout from "../TrackCoverLayout/TrackCoverLayout";
import UniversalSidebar from "./UniversalSidebar";
import Navbar from "./navbar";

export default function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      <div className="bg-dark order-3 md:order-1">
        <Navbar />
      </div>

      <aside className="order-4 flex-shrink-0 md:order-2">
        <UniversalSidebar />
      </aside>

      <div className="relative order-1 flex flex-1 flex-col overflow-hidden md:order-3">
        <AnimatedBackground />

        <main className="flex flex-1 flex-col overflow-hidden">
          <Search />
          <div className="flex-1 overflow-auto overflow-x-hidden">
            <TrackCoverLayout />
            <div className="*:p-6">{children}</div>
          </div>
        </main>

        <Controller />
      </div>
    </div>
  );
}
