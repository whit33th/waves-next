import AnimatedBackground from "@/components/UI/AnimatedBackground";
import Controller from "../Controller/controller";
import Search from "../Search/Search";
import TrackCoverLayout from "../TrackCoverLayout/TrackCoverLayout";
import Queue from "./Queue";
import Navbar from "./navbar";

export default function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* added relative for absolute Queue */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        <main className="flex-1 overflow-auto">
          <Search />

          <div className="*:p-6">{children}</div>
        </main>
        <Queue />
      </div>

      <Controller />

      <div className="block md:hidden">
        <Navbar />
      </div>
      <AnimatedBackground />
      <TrackCoverLayout />
    </div>
  );
}
