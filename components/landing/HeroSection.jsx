'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_32%_18%,rgba(148,163,184,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_78%_82%,rgba(148,163,184,0.08)_0%,transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(148,163,184,0.12)_0%,rgba(148,163,184,0.03)_32%,rgba(10,10,15,0)_58%,rgba(148,163,184,0.08)_100%)] bg-[length:220%_220%] animate-[ambientPan_20s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015),rgba(10,10,15,0)_28%,rgba(10,10,15,0.45)_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-secondary md:text-sm">Thoughtful writing for modern minds</p>

        <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight text-textPrimary md:text-6xl">
          Discover stories that sharpen ideas and slow down the noise.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-textSecondary md:text-lg">
          BlogSphere is a clean editorial space for technology, travel, health, lifestyle, and finance writing that is crafted to be read, not skimmed.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/blogs" className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700">
            Start Reading
          </Link>
        </div>
      </motion.div>

    </section>
  );
}
