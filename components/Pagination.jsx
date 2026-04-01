'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ page, pages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pages <= 1) return null;

  const goTo = (nextPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textSecondary disabled:opacity-50">Prev</button>
      {Array.from({ length: pages }).map((_, index) => {
        const num = index + 1;
        const active = num === page;
        return (
          <button key={num} type="button" onClick={() => goTo(num)} className={`rounded-lg px-3 py-2 text-sm ${active ? 'bg-primary text-white' : 'border border-border bg-surface text-textSecondary'}`}>
            {num}
          </button>
        );
      })}
      <button type="button" onClick={() => goTo(page + 1)} disabled={page === pages} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textSecondary disabled:opacity-50">Next</button>
    </div>
  );
}
