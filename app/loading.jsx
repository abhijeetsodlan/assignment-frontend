import SkeletonCard from '@/components/SkeletonCard';

export default function Loading() {
  return (
    <div className="grid gap-8 lg:grid-cols-[65%_35%]">
      <SkeletonCard />
      <div className="space-y-4">
        <div className="h-28 animate-pulse rounded-2xl bg-white dark:bg-slate-800" />
        <div className="h-36 animate-pulse rounded-2xl bg-white dark:bg-slate-800" />
        <div className="h-60 animate-pulse rounded-2xl bg-white dark:bg-slate-800" />
      </div>
    </div>
  );
}


