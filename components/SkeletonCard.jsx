export default function SkeletonCard() {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-border bg-surface p-4">
          <div className="aspect-video rounded-xl bg-border" />
          <div className="mt-4 h-4 w-24 rounded bg-border" />
          <div className="mt-3 h-6 w-3/4 rounded bg-border" />
          <div className="mt-3 h-4 w-1/2 rounded bg-border" />
          <div className="mt-3 h-4 w-full rounded bg-border" />
        </div>
      ))}
    </div>
  );
}
