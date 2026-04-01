import { fetchBlogsServer } from '@/lib/api';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap() {
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    }
  ];

  try {
    const result = await fetchBlogsServer({ page: 1, limit: 1000, sort: 'latest' });
    const blogRoutes = (result.data || []).map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.publishedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (_error) {
    return staticRoutes;
  }
}
