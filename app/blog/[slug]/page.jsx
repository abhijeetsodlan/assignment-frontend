import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock3, MessageCircle, Sparkles } from 'lucide-react';
import { fetchBlogBySlugServer } from '@/lib/api';

export async function generateMetadata({ params }) {
  const blog = await fetchBlogBySlugServer(params.slug);
  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: `${blog.title} | BlogSphere`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.thumbnail]
    }
  };
}

export default async function BlogDetailPage({ params }) {
  const blog = await fetchBlogBySlugServer(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_58%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.14),_transparent_32%)]" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:px-6 md:pb-24 md:pt-10">
        <Link href="/blogs" className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-medium text-textSecondary backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary">
          <ArrowLeft size={16} />
          Back to all posts
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
          <div className="relative">
            <Image src={blog.thumbnail} alt={blog.title} width={1800} height={1000} className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[440px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-5 top-5 flex flex-wrap gap-3 sm:left-8 sm:top-8">
              <span className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-secondary/30">
                {blog.category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur">
                <Sparkles size={14} />
                Featured Reading
              </span>
            </div>
          </div>

          <div className="grid gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-10 lg:py-10">
            <div className="min-w-0">
              <h1 className="max-w-4xl font-display text-4xl leading-[1.02] tracking-tight text-textPrimary sm:text-5xl lg:text-6xl">
                {blog.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-textSecondary sm:text-xl">
                {blog.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-sm sm:gap-5 sm:p-5">
                <Image src={blog.author.avatar} alt={blog.author.name} width={56} height={56} className="h-14 w-14 rounded-full border border-border object-cover" />
                <div className="min-w-[160px]">
                  <p className="text-sm text-textSecondary">Written by</p>
                  <p className="text-base font-semibold text-textPrimary">{blog.author.name}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-textSecondary sm:gap-5">
                  <span className="inline-flex items-center gap-2"><CalendarDays size={16} />{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 size={16} />{blog.readTime} min read</span>
                  <span className="inline-flex items-center gap-2"><MessageCircle size={16} />{blog.commentsCount} comments</span>
                </div>
              </div>
            </div>

            <aside className="space-y-4 lg:pl-2">
              <div className="rounded-2xl border border-border bg-background/70 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textSecondary">Reading Notes</p>
                <p className="mt-4 text-sm leading-7 text-textSecondary">
                  This page is designed for focused reading, with wider rhythm, stronger hierarchy, and cleaner spacing for long-form content.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textSecondary">Topics</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-textSecondary">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 rounded-[2rem] border border-border bg-surface px-5 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.12)] sm:px-8 lg:px-10 lg:py-10">
            <div
              className="mx-auto max-w-3xl text-[1.02rem] leading-8 text-textSecondary
                [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline
                [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:bg-background/80 [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:text-lg [&_blockquote]:italic [&_blockquote]:text-textPrimary
                [&_code]:rounded-md [&_code]:bg-background [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.95em] [&_code]:text-textPrimary
                [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-textPrimary
                [&_h3]:mt-10 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-textPrimary
                [&_hr]:my-10 [&_hr]:border-border
                [&_img]:my-8 [&_img]:rounded-2xl
                [&_li]:leading-8 [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:pl-6
                [&_p]:my-6 [&_p]:text-lg [&_p]:leading-9
                [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-[#0b1220] [&_pre]:p-5 [&_pre]:text-[0.95rem] [&_pre]:leading-7 [&_pre]:text-slate-100
                [&_strong]:font-semibold [&_strong]:text-textPrimary
                [&_table]:my-8 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-2xl [&_table]:border [&_table]:border-border
                [&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-3 [&_th]:bg-background [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-textPrimary
                [&_ul]:my-6 [&_ul]:space-y-3 [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          <aside className="self-start lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textSecondary">About the author</p>
              <div className="mt-5 flex items-center gap-4">
                <Image src={blog.author.avatar} alt={blog.author.name} width={56} height={56} className="h-14 w-14 rounded-full border border-border object-cover" />
                <div>
                  <p className="text-lg font-semibold text-textPrimary">{blog.author.name}</p>
                  <p className="text-sm text-textSecondary">Publishing practical ideas for builders and teams.</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-background p-4 text-sm leading-7 text-textSecondary">
                Use this article as a working reference while you build. The layout is tuned for long-form reading, quick scanning, and jumping between sections.
              </div>
            </div>
          </aside>
        </section>
      </div>
    </article>
  );
}
