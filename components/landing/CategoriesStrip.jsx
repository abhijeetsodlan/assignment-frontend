'use client';

export default function CategoriesStrip() {
  const categories = ['Technology', 'Travel', 'Health', 'Lifestyle', 'Finance', 'Mindfulness', 'Poetry', 'Science'];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
      <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-secondary">✦ Explore by topic</p>
      <div className="group overflow-hidden">
        <div className="flex min-w-max animate-[marquee_24s_linear_infinite] gap-3 [animation-play-state:running] group-hover:[animation-play-state:paused]">
          {[...categories, ...categories].map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-full border border-border bg-surface px-5 py-2 text-sm text-textSecondary transition-all duration-300 hover:border-primary hover:text-primary">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
