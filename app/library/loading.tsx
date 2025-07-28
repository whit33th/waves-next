export default function LibraryLoading() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-8 px-6 py-8">
      {/* Page title skeleton */}
      <div className="h-8 w-48 animate-pulse rounded bg-white/10" />

      {/* Tabs skeleton */}
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-20 animate-pulse rounded-lg bg-white/10"
          />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square w-full animate-pulse rounded-lg bg-white/10" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-white/8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
