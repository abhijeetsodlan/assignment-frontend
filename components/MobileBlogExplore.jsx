'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';
import CategoryFilter from '@/components/CategoryFilter';
import RecentPosts from '@/components/RecentPosts';
import SearchBar from '@/components/SearchBar';
import SortSelect from '@/components/SortSelect';

export default function MobileBlogExplore({ total }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="mb-6 xl:hidden">
      <SearchBar total={total} />

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-textPrimary transition-all duration-300 hover:border-primary hover:text-primary"
        >
          <SlidersHorizontal size={16} />
          Explore posts
        </button>
        <div className="inline-flex items-center gap-2 rounded-2xl bg-background px-4 py-3 text-xs font-medium text-textSecondary">
          <Sparkles size={14} />
          Filters and discovery
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm">
          <button type="button" aria-label="Close explore panel" className="absolute inset-0" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] border border-border bg-background p-4 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-border" />
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textSecondary">Explore</p>
                <h2 className="mt-2 text-2xl font-semibold text-textPrimary">Find the right story faster</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border bg-surface p-2 text-textSecondary transition-all duration-300 hover:border-primary hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 pb-4">
              <SortSelect />
              <CategoryFilter />
              <RecentPosts />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
