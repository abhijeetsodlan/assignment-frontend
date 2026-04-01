'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'latest';

  const onChange = (event) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', event.target.value);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <label className="flex items-center justify-between gap-3 text-sm font-medium text-textPrimary">
        <span>Sort Posts</span>
        <select value={sort} onChange={onChange} className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-textPrimary outline-none transition-all duration-300 focus:border-primary">
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </label>
    </div>
  );
}
