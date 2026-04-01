'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { LoaderCircle, Pencil, Plus, RefreshCcw, Search, Trash2, X } from 'lucide-react';
import { createBlog, deleteBlog, fetchBlogs, fetchCategories, updateBlog } from '@/lib/api';

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  thumbnail: '',
  category: '',
  tags: '',
  readTime: '5',
  commentsCount: '0',
  publishedAt: '',
  isFeatured: false,
  authorName: '',
  authorAvatar: ''
};

const toDateTimeInputValue = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const fromBlogToForm = (blog) => ({
  title: blog.title || '',
  excerpt: blog.excerpt || '',
  content: blog.content || '',
  thumbnail: blog.thumbnail || '',
  category: blog.category || '',
  tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
  readTime: String(blog.readTime ?? 5),
  commentsCount: String(blog.commentsCount ?? 0),
  publishedAt: toDateTimeInputValue(blog.publishedAt),
  isFeatured: Boolean(blog.isFeatured),
  authorName: blog.author?.name || '',
  authorAvatar: blog.author?.avatar || ''
});

const buildPayload = (form) => ({
  title: form.title.trim(),
  excerpt: form.excerpt.trim(),
  content: form.content.trim(),
  thumbnail: form.thumbnail.trim(),
  category: form.category.trim(),
  tags: form.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean),
  readTime: Number(form.readTime) || 0,
  commentsCount: Number(form.commentsCount) || 0,
  publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
  isFeatured: form.isFeatured,
  author: {
    name: form.authorName.trim(),
    avatar: form.authorAvatar.trim()
  }
});

function BlogEditorModal({ open, categories, form, selectedId, submitting, onChange, onClose, onSubmit }) {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm">
      <button type="button" aria-label="Close editor" className="absolute inset-0" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 top-6 mx-auto max-w-4xl overflow-hidden rounded-t-[2rem] border border-border bg-surface shadow-[0_-20px_80px_rgba(0,0,0,0.35)] sm:top-10 sm:rounded-[2rem]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Blog Editor</p>
            <h2 className="mt-1 text-2xl font-semibold text-textPrimary">{selectedId ? 'Edit Blog' : 'Create Blog'}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border bg-background p-2 text-textSecondary transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-7rem)] overflow-y-auto px-5 py-5 sm:px-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Title</span>
                <input name="title" value={form.title} onChange={onChange} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Category</span>
                <input
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  list="blog-categories"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary"
                />
                <datalist id="blog-categories">
                  {categories.map((category) => <option key={category._id} value={category.name} />)}
                </datalist>
              </label>
            </div>

            <label className="space-y-2 text-sm text-textSecondary">
              <span>Excerpt</span>
              <textarea name="excerpt" value={form.excerpt} onChange={onChange} required rows={3} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
            </label>

            <label className="space-y-2 text-sm text-textSecondary">
              <span>Content (HTML supported)</span>
              <textarea name="content" value={form.content} onChange={onChange} required rows={12} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Thumbnail URL</span>
                <input name="thumbnail" value={form.thumbnail} onChange={onChange} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Tags (comma separated)</span>
                <input name="tags" value={form.tags} onChange={onChange} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Author Name</span>
                <input name="authorName" value={form.authorName} onChange={onChange} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Author Avatar URL</span>
                <input name="authorAvatar" value={form.authorAvatar} onChange={onChange} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Read Time</span>
                <input type="number" min="1" name="readTime" value={form.readTime} onChange={onChange} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Comments Count</span>
                <input type="number" min="0" name="commentsCount" value={form.commentsCount} onChange={onChange} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm text-textSecondary">
                <span>Published At</span>
                <input type="datetime-local" name="publishedAt" value={form.publishedAt} onChange={onChange} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none transition-all duration-300 focus:border-primary" />
              </label>
            </div>

            <label className="inline-flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-textPrimary">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={onChange} className="h-4 w-4 rounded border-border" />
              Mark as featured
            </label>

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-textPrimary transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && <LoaderCircle size={16} className="animate-spin" />}
                {selectedId ? 'Update Blog' : 'Create Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const [blogRes, categoryRes] = await Promise.all([
        fetchBlogs({ page: 1, limit: 100, sort: 'latest' }),
        fetchCategories()
      ]);

      setBlogs(blogRes.data || []);
      setCategories(categoryRes.data || []);
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'Failed to load blog manager data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredBlogs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return blogs;

    return blogs.filter((blog) => {
      const haystack = [blog.title, blog.category, blog.author?.name, blog.slug].join(' ').toLowerCase();
      return haystack.includes(normalized);
    });
  }, [blogs, query]);

  const featuredCount = useMemo(() => blogs.filter((blog) => blog.isFeatured).length, [blogs]);

  const resetForm = () => {
    setSelectedId('');
    setForm(emptyForm);
  };

  const openCreate = () => {
    resetForm();
    setFeedback({ type: '', message: '' });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    resetForm();
  };

  const handleEdit = (blog) => {
    setSelectedId(blog._id);
    setForm(fromBlogToForm(blog));
    setFeedback({ type: '', message: '' });
    setIsEditorOpen(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      const payload = buildPayload(form);

      if (selectedId) {
        await updateBlog(selectedId, payload);
        setFeedback({ type: 'success', message: 'Blog updated successfully.' });
      } else {
        await createBlog(payload);
        setFeedback({ type: 'success', message: 'Blog created successfully.' });
      }

      closeEditor();
      await loadData();
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'Failed to save blog.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}"? This action cannot be undone.`);
    if (!confirmed) return;

    setFeedback({ type: '', message: '' });

    try {
      await deleteBlog(blog._id);
      setFeedback({ type: 'success', message: 'Blog deleted successfully.' });
      await loadData();
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'Failed to delete blog.' });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Management</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-textSecondary">
            Keep the manager focused on decisions: scan posts fast, open the editor only when needed, and push every change through the live API.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
          >
            <Plus size={16} />
            Create Blog
          </button>
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-textPrimary transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
          <Link href="/blogs" className="inline-flex items-center rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-textPrimary transition-all duration-300 hover:border-primary hover:text-primary">
            View Public Blogs
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-textSecondary">Total Posts</p>
          <p className="mt-2 text-3xl font-semibold text-textPrimary">{blogs.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-textSecondary">Featured</p>
          <p className="mt-2 text-3xl font-semibold text-textPrimary">{featuredCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-textSecondary">Visible Rows</p>
          <p className="mt-2 text-3xl font-semibold text-textPrimary">{filteredBlogs.length}</p>
        </div>
      </div>

      {feedback.message && (
        <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${feedback.type === 'error' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
          {feedback.message}
        </div>
      )}

      <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-[0_20px_80px_rgba(0,0,0,0.12)] sm:p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-textPrimary">Existing Blogs</h2>
            <p className="mt-1 text-sm text-textSecondary">Compact view with quick actions for edit and delete.</p>
          </div>
          <label className="relative block w-full md:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts in manager"
              className="w-full rounded-2xl border border-border bg-background px-10 py-3 text-sm text-textPrimary outline-none transition-all duration-300 focus:border-primary"
            />
          </label>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-background/50 px-4 py-16 text-textSecondary">
            <LoaderCircle size={18} className="mr-2 animate-spin" />
            Loading blogs...
          </div>
        ) : filteredBlogs.length ? (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <article key={blog._id} className="rounded-2xl border border-border bg-background/60 p-4 transition-all duration-300 hover:border-primary/50">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface">
                      <Image src={blog.thumbnail} alt={blog.title} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-textSecondary">
                        <span>{blog.category}</span>
                        <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                        {blog.isFeatured && <span className="rounded-full bg-primary/15 px-2 py-1 text-primary">Featured</span>}
                      </div>
                      <h3 className="mt-2 truncate text-xl font-semibold text-textPrimary">{blog.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-textSecondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">{blog.excerpt}</p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-textSecondary">
                        <span>Author: {blog.author?.name}</span>
                        <span>{blog.readTime} min read</span>
                        <span>{blog.commentsCount} comments</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2 self-start">
                    <button
                      type="button"
                      onClick={() => handleEdit(blog)}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-textPrimary transition-all duration-300 hover:border-primary hover:text-primary"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background/50 px-4 py-16 text-center text-textSecondary">
            No blogs matched this search.
          </div>
        )}
      </section>

      <BlogEditorModal
        open={isEditorOpen}
        categories={categories}
        form={form}
        selectedId={selectedId}
        submitting={submitting}
        onChange={handleChange}
        onClose={closeEditor}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
