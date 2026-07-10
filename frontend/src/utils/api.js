export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Banner
export const getBanner = () => request('/banner');
export const updateBanner = (payload) => request('/banner', { method: 'PUT', body: JSON.stringify(payload) });

// Services
export const getServices = () => request('/services');
export const createService = (payload) => request('/services', { method: 'POST', body: JSON.stringify(payload) });
export const updateService = (id, payload) => request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteService = (id) => request(`/services/${id}`, { method: 'DELETE' });

// Projects
export const getProjects = () => request('/projects');
export const createProject = (payload) => request('/projects', { method: 'POST', body: JSON.stringify(payload) });
export const updateProject = (id, payload) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteProject = (id) => request(`/projects/${id}`, { method: 'DELETE' });

// Testimonials
export const getTestimonials = () => request('/testimonials');
export const createTestimonial = (payload) => request('/testimonials', { method: 'POST', body: JSON.stringify(payload) });
export const updateTestimonial = (id, payload) => request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTestimonial = (id) => request(`/testimonials/${id}`, { method: 'DELETE' });

// Blogs
export const getBlogs = () => request('/blogs');
export const createBlog = (payload) => request('/blogs', { method: 'POST', body: JSON.stringify(payload) });
export const updateBlog = (id, payload) => request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteBlog = (id) => request(`/blogs/${id}`, { method: 'DELETE' });

