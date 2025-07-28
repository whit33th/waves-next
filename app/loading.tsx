import { AlbumGridSkeleton } from "@/components/UI/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="p-6 backdrop-blur-sm">
      <section className="space-y-12">
        <AlbumGridSkeleton />
        <AlbumGridSkeleton />
        <AlbumGridSkeleton />
      </section>
    </div>
  );
}
