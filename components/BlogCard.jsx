import Image from 'next/image';
import Link from 'next/link';
import { Clock3, MessageCircle } from 'lucide-react';

export default function BlogCard({ blog }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/20 md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-5">
      <Link href={`/blog/${blog.slug}`} className="relative block overflow-hidden rounded-xl">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          width={1200}
          height={675}
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-full md:max-h-[220px]"
        />
      </Link>
      <div className="mt-4 min-w-0 space-y-3 md:mt-0">
        <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">{blog.category}</span>
        <Link href={`/blog/${blog.slug}`} className="block text-xl font-semibold text-textPrimary hover:text-primary">
          {blog.title}
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm text-textSecondary">
          <Image src={blog.author.avatar} alt={blog.author.name} width={28} height={28} className="rounded-full" />
          <span>{blog.author.name}</span>
          <span className="inline-flex items-center gap-1"><MessageCircle size={14} />{blog.commentsCount}</span>
          <span className="inline-flex items-center gap-1"><Clock3 size={14} />{blog.readTime} min</span>
        </div>
        <p className="text-sm leading-6 text-textSecondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">{blog.excerpt}</p>
        <div className="flex items-center justify-between">
          <Link href={`/blog/${blog.slug}`} className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-orange-600">
            Read More
          </Link>
          <span className="text-xs text-textSecondary">{new Date(blog.publishedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border pt-3">
          {blog.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-background px-2 py-1 text-xs text-textSecondary">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
