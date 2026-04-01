import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

/**
 * Get paginated blogs with search and filter options.
 * @param {{search?: string, category?: string, page?: string|number, limit?: string|number, sort?: 'latest'|'oldest'}} params
 */
export const fetchBlogs = async (params = {}) => {
  const { data } = await api.get('/blogs', { params });
  return data;
};

/**
 * Get one blog by slug.
 * @param {string} slug
 */
export const fetchBlogBySlug = async (slug) => {
  const { data } = await api.get(`/blogs/${slug}`);
  return data;
};

/**
 * Create a blog.
 * @param {object} payload
 */
export const createBlog = async (payload) => {
  const { data } = await api.post('/blogs', payload);
  return data;
};

/**
 * Update a blog by id.
 * @param {string} id
 * @param {object} payload
 */
export const updateBlog = async (id, payload) => {
  const { data } = await api.put(`/blogs/${id}`, payload);
  return data;
};

/**
 * Delete a blog by id.
 * @param {string} id
 */
export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/${id}`);
  return data;
};

/**
 * Get latest five blogs.
 */
export const fetchRecentBlogs = async () => {
  const { data } = await api.get('/blogs/recent');
  return data;
};

/**
 * Get all available categories.
 */
export const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};

/**
 * Build a backend API URL with query parameters.
 * @param {string} path
 * @param {Record<string, string|number>} params
 */
const buildApiUrl = (path, params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) query.set(key, String(value));
  });
  return `${API_BASE_URL}${path}?${query.toString()}`;
};

/**
 * Fetch blogs on the server with no cache.
 * @param {{search?: string, category?: string, page?: string|number, limit?: string|number, sort?: 'latest'|'oldest'}} params
 */
export const fetchBlogsServer = async (params = {}) => {
  const response = await fetch(buildApiUrl('/blogs', params), { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

/**
 * Fetch a single blog on the server with no cache.
 * @param {string} slug
 */
export const fetchBlogBySlugServer = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, { cache: 'no-store' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch blog');
  const payload = await response.json();
  return payload.data;
};

export default api;
