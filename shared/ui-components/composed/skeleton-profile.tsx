export function SkeletonProfile() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="skeleton h-48 w-full" />
      <div className="relative px-6 pb-6">
        <div className="skeleton absolute -top-12 left-6 h-24 w-24 rounded-full" />
        <div className="pt-16">
          <div className="skeleton h-6 w-52" />
          <div className="mt-2 skeleton h-4 w-72" />
        </div>
      </div>
    </div>
  );
}
