'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar({ total }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const [value, setValue] = useState(urlSearch);
  const debouncedValue = useDebounce(value, 300);
  const lastAppliedSearch = useRef(urlSearch);

  useEffect(() => {
    if (urlSearch !== lastAppliedSearch.current) {
      setValue(urlSearch);
      lastAppliedSearch.current = urlSearch;
    }
  }, [urlSearch]);

  useEffect(() => {
    if (debouncedValue === lastAppliedSearch.current) return;

    const params = new URLSearchParams(searchParams.toString());
    const trimmedValue = debouncedValue.trim();

    if (trimmedValue) params.set('search', trimmedValue);
    else params.delete('search');

    params.set('page', '1');
    lastAppliedSearch.current = debouncedValue;
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, router, searchParams]);

  const showText = useMemo(() => (urlSearch ? `Showing ${total} results for '${urlSearch}'` : `Showing ${total} posts`), [total, urlSearch]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search blog posts"
          className="w-full rounded-lg border border-border bg-background px-10 py-2 pr-4 text-sm text-textPrimary outline-none transition-all duration-300 focus:border-primary"
        />
      </div>
      <p className="mt-2 text-xs text-textSecondary">{showText}</p>
    </div>
  );
}
