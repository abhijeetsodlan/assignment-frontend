import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/10 blur-3xl" />
        <div className="absolute left-[40%] top-[38%] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-[58%] top-[55%] h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl rounded-3xl border border-border bg-surface/70 p-10 text-center md:p-14">
        <h2 className="font-display text-4xl text-textPrimary md:text-5xl">Ready to explore?</h2>
        <p className="mt-3 text-textSecondary">Hundreds of stories waiting for you.</p>
        <Link href="/blogs" className="mt-8 inline-flex rounded-full bg-primary px-12 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-primary/30">
          Enter the Blog →
        </Link>
      </div>
    </section>
  );
}
