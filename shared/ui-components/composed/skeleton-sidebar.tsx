export function SkeletonSidebar() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="skeleton mb-4 h-4 w-36" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="skeleton h-9 w-9 rounded-full" />
            <div className="skeleton h-3 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
