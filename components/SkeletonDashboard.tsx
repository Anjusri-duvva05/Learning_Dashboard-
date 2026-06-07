export default function SkeletonDashboard() {
  return (
    <section
      className="min-h-screen p-4 pb-20 md:p-6 lg:p-8 md:pb-8"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div className="grid auto-rows-min gap-4 lg:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Hero skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <SkeletonCard className="h-36" />
        </div>

        {/* Activity skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2">
          <SkeletonCard className="h-80" />
        </div>

        {/* Stats skeleton */}
        <div className="col-span-1">
          <SkeletonCard className="h-64" />
        </div>

        {/* Course card skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="col-span-1">
            <SkeletonCard className="h-52" />
          </div>
        ))}
      </div>
    </section>
  );
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full rounded-2xl border border-border overflow-hidden ${className}`}
    >
      <div className="shimmer-bg h-full w-full" />
    </div>
  );
}
