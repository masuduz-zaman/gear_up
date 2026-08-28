export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>

      <div className="space-y-3">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>
    </div>
  );
}