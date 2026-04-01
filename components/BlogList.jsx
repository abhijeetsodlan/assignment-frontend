import BlogCard from './BlogCard';

export default function BlogList({ blogs }) {
  if (!blogs.length) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center text-textSecondary">
        No blogs found for the selected filters.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
