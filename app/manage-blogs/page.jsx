import BlogManager from '@/components/BlogManager';

export const metadata = {
  title: 'Manage Blogs',
  description: 'Create, edit, and delete blogs through the API-backed management dashboard.',
  alternates: {
    canonical: '/manage-blogs'
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function ManageBlogsPage() {
  return <BlogManager />;
}
