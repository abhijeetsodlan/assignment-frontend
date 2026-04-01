'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenText, FilePenLine, House, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const itemBaseClass =
    'flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 transform-gpu hover:scale-110 hover:animate-navbar-item-vibrate active:scale-95';
  const inactiveClass = 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white';
  const activeClass = 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900';

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 w-fit max-w-[calc(100vw-1.5rem)] -translate-x-1/2 rounded-full border border-slate-300/80 bg-white/90 p-2 backdrop-blur-xl dark:border-slate-700/70 dark:bg-[#0A0A0F]/90">
      <div className="flex items-center justify-center gap-2 overflow-visible">
        <Link href="/" aria-label="Home" className={`${itemBaseClass} ${pathname === '/' ? activeClass : inactiveClass}`}>
          <House size={20} />
        </Link>

        <Link
          href="/blogs"
          aria-label="Blogs"
          className={`${itemBaseClass} ${pathname === '/blogs' || pathname.startsWith('/blog/') ? activeClass : inactiveClass}`}
        >
          <BookOpenText size={20} />
        </Link>

        <Link
          href="/manage-blogs"
          aria-label="Manage Blogs"
          className={`${itemBaseClass} ${pathname === '/manage-blogs' ? activeClass : inactiveClass}`}
        >
          <FilePenLine size={20} />
        </Link>

        <button type="button" aria-label="Toggle theme" onClick={toggleTheme} className={`${itemBaseClass} ${inactiveClass}`}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
