'use client';

export default function Error({ reset }) {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textSecondary">Article Error</p>
      <h2 className="mt-3 text-3xl font-semibold text-textPrimary">Something went wrong</h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-textSecondary">We could not load this article right now. Try again to restore the reading page.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
