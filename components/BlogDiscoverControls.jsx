'use client';

import { useEffect, useState } from 'react';
import CategoryFilter from '@/components/CategoryFilter';
import MobileBlogExplore from '@/components/MobileBlogExplore';
import RecentPosts from '@/components/RecentPosts';
import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/Sidebar';
import SortSelect from '@/components/SortSelect';

export default function BlogDiscoverControls({ total }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const sync = (event) => setIsDesktop(event.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', sync);

    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  if (!isDesktop) {
    return <MobileBlogExplore total={total} />;
  }

  return (
    <Sidebar>
      <SortSelect />
      <SearchBar total={total} />
      <CategoryFilter />
      <RecentPosts />
    </Sidebar>
  );
}
