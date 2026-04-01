import SkeletonCard from '@/components/SkeletonCard';

export default function Loading() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:px-6 lg:grid-cols-[65%_35%]">
      <SkeletonCard />
      <div className="space-y-4">
        <div className="h-28 animate-pulse rounded-2xl border border-border bg-surface" />
        <div className="h-36 animate-pulse rounded-2xl border border-border bg-surface" />
        <div className="h-60 animate-pulse rounded-2xl border border-border bg-surface" />
      </div>
    </div>
  );
}
