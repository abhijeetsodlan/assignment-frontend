'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function Counter({ target }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(Math.ceil(target / 40), 1);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(current);
      if (current >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{value.toLocaleString()}+</span>;
}

export default function StatsBar() {
  const items = [
    { value: 50, label: 'Blog Posts' },
    { value: 12, label: 'Categories' },
    { value: 10000, label: 'Monthly Reads' }
  ];

  return (
    <section className="border-y border-border bg-surface px-4 py-6 md:py-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-3 md:gap-0 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/80 bg-background/60 px-3 py-4 text-center backdrop-blur-sm md:rounded-none md:border-0 md:bg-transparent md:px-6"
          >
            <p className="text-xl font-bold text-primary sm:text-2xl md:text-3xl"><Counter target={item.value} /></p>
            <p className="mt-1 text-[11px] leading-tight tracking-[0.14em] text-textSecondary sm:text-xs md:text-sm md:tracking-wide">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}