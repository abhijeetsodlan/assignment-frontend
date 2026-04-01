import BlogManager from '@/components/BlogManager';

export const metadata = {
  title: 'Manage Blogs | BlogSphere',
  description: 'Create, edit, and delete blogs through the API-backed management dashboard.'
};

export default function ManageBlogsPage() {
  return <BlogManager />;
}
