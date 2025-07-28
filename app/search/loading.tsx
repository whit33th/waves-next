export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-[1800px] px-6 py-8">
      {/* Search input skeleton */}
      <div className="mb-8 h-12 w-full animate-pulse rounded-lg bg-white/10" />

      {/* Search results sections */}
      <div className="space-y-8">
        {/* Top Result section */}
        <section className="space-y-4">
          <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
          <div className="flex max-w-2xl gap-6 rounded-xl bg-white/5 p-6">
            <div className="h-[180px] w-[180px] animate-pulse rounded-full bg-white/10" />
            <div className="flex flex-col justify-center space-y-4">
              <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-32 animate-pulse rounded bg-white/8" />
            </div>
          </div>
        </section>

        {/* Songs section */}
        <section className="space-y-4">
          <div className="h-6 w-20 animate-pulse rounded bg-white/10" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg bg-white/5 p-3"
              >
                <div className="h-10 w-10 animate-pulse rounded bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/8" />
                </div>
                <div className="h-4 w-16 animate-pulse rounded bg-white/8" />
              </div>
            ))}
          </div>
        </section>

        {/* Artists section */}
        <section className="space-y-4">
          <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square w-full animate-pulse rounded-full bg-white/10" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-white/8" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Albums section */}
        <section className="space-y-4">
          <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square w-full animate-pulse rounded-lg bg-white/10" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-white/8" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
