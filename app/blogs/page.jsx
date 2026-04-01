import { Suspense } from 'react';
import BlogDiscoverControls from '@/components/BlogDiscoverControls';
import BlogList from '@/components/BlogList';
import Pagination from '@/components/Pagination';
import { fetchBlogsServer } from '@/lib/api';

export const metadata = {
  title: 'Blogs | BlogSphere',
  description: 'Browse the latest stories across technology, travel, health, lifestyle, and finance.'
};

export default async function BlogsPage({ searchParams }) {
  const resolvedParams = searchParams || {};

  try {
    const result = await fetchBlogsServer({
      search: resolvedParams.search || '',
      category: resolvedParams.category || '',
      page: String(resolvedParams.page || '1'),
      limit: String(resolvedParams.limit || '6'),
      sort: resolvedParams.sort || 'latest'
    });

    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 xl:pr-[23rem]">
        <section className="min-w-0">
          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold">Latest Stories</h1>
          </div>

          <Suspense fallback={null}>
            <BlogDiscoverControls total={result.pagination.total} />
          </Suspense>

          <BlogList blogs={result.data} />
          <Suspense fallback={null}>
            <Pagination page={result.pagination.page} pages={result.pagination.pages} />
          </Suspense>
        </section>
      </div>
    );
  } catch (_error) {
    return (
      <div className="mx-auto mt-10 w-full max-w-7xl rounded-2xl border border-border bg-surface p-8 text-secondary">
        Unable to load blogs right now. Please try again.
      </div>
    );
  }
}
