'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchBlogs } from '@/lib/api';
import { fadeUp, staggerContainer } from '@/lib/animations';

function SkeletonCard() {
  return <div className="h-[360px] animate-pulse rounded-2xl border border-border bg-surface" />;
}

export default function FeaturedBlogs() {
  const [state, setState] = useState({ data: [], loading: true, error: '' });

  useEffect(() => {
    fetchBlogs({ featured: 'true', limit: 3 })
      .then((res) => setState({ data: res.data, loading: false, error: '' }))
      .catch(() => setState({ data: [], loading: false, error: 'Unable to load featured stories.' }));
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
      <h2 className="font-display text-3xl text-textPrimary">Featured Stories</h2>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="mt-2 h-[3px] w-10 origin-left bg-secondary" />
      {state.error && <p className="mt-4 text-sm text-secondary">{state.error}</p>}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 grid gap-6 md:grid-cols-3">
        {state.loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        {!state.loading &&
          state.data.map((blog, index) => (
            <motion.article key={blog._id} variants={fadeUp} custom={index} className="overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
              <Link href={`/blog/${blog.slug}`} className="relative block aspect-video">
                <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs text-white">{blog.category}</span>
              </Link>
              <div className="space-y-3 p-5">
                <Link href={`/blog/${blog.slug}`} className="block font-display text-xl text-textPrimary transition-all duration-300 hover:text-primary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                  {blog.title}
                </Link>
                <p className="text-sm text-textSecondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-textSecondary">
                  <span>{blog.author?.name}</span>
                  <span>{blog.readTime} min read</span>
                </div>
                <div className="text-right">
                  <Link href={`/blog/${blog.slug}`} className="text-sm font-medium text-primary hover:underline">Read →</Link>
                </div>
              </div>
            </motion.article>
          ))}
      </motion.div>
    </section>
  );
}
