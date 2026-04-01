'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchRecentBlogs } from '@/lib/api';

export default function RecentPosts() {
  const [state, setState] = useState({ data: [], loading: true, error: '' });

  useEffect(() => {
    fetchRecentBlogs().then((res) => setState({ data: res.data, loading: false, error: '' })).catch(() => setState({ data: [], loading: false, error: 'Failed to load recent posts' }));
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <h3 className="mb-3 text-sm font-semibold text-textPrimary">Recent Posts</h3>
      {state.loading && <p className="text-sm text-textSecondary">Loading recent posts...</p>}
      {state.error && <p className="text-sm text-secondary">{state.error}</p>}
      {!state.loading && !state.error && !state.data.length && <p className="text-sm text-textSecondary">No recent posts found.</p>}
      <div className="space-y-3">
        {state.data.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`} className="flex gap-3 rounded-xl p-1 transition-all duration-300 hover:bg-background">
            <Image src={blog.thumbnail} alt={blog.title} width={60} height={60} className="h-[60px] w-[60px] rounded object-cover" />
            <div>
              <p className="text-sm font-medium text-textPrimary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">{blog.title}</p>
              <p className="text-xs text-textSecondary">{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
