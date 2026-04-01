'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetchCategories } from '@/lib/api';

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') || 'All';
  const [state, setState] = useState({ data: [], loading: true, error: '' });

  useEffect(() => {
    fetchCategories().then((res) => setState({ data: res.data, loading: false, error: '' })).catch(() => setState({ data: [], loading: false, error: 'Failed to load categories' }));
  }, []);

  const onSelect = (name) => {
    const params = new URLSearchParams(searchParams.toString());
    if (name === 'All') params.delete('category'); else params.set('category', name);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <h3 className="mb-3 text-sm font-semibold text-textPrimary">Categories</h3>
      {state.loading && <p className="text-sm text-textSecondary">Loading categories...</p>}
      {state.error && <p className="text-sm text-secondary">{state.error}</p>}
      {!state.loading && !state.error && (
        <div className="flex flex-wrap gap-2">
          {['All', ...state.data.map((item) => item.name)].map((name) => (
            <button key={name} type="button" onClick={() => onSelect(name)} className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${active === name ? 'bg-primary text-white' : 'border border-border bg-background text-textSecondary hover:border-primary hover:text-primary'}`}>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
