// // import axios from 'axios';

// // const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// // export const api = axios.create({
// //   baseURL: BASE_URL,
// //   headers: { 'Content-Type': 'application/json' },
// // });

// // // Attach access token to every request
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('access_token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // // Auto-refresh on 401
// // api.interceptors.response.use(
// //   (res) => res,
// //   async (error) => {
// //     const original = error.config;
// //     if (error.response?.status === 401 && !original._retry) {
// //       original._retry = true;
// //       const refreshToken = localStorage.getItem('refresh_token');
// //       if (refreshToken) {
// //         try {
// //           const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
// //             refresh_token: refreshToken,
// //           });
// //           localStorage.setItem('access_token', data.access_token);
// //           localStorage.setItem('refresh_token', data.refresh_token);
// //           original.headers.Authorization = `Bearer ${data.access_token}`;
// //           return api(original);
// //         } catch {
// //           localStorage.removeItem('access_token');
// //           localStorage.removeItem('refresh_token');
// //           window.location.href = '/auth';
// //         }
// //       } else {
// //         window.location.href = '/auth';
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // // ─── Auth ────────────────────────────────────────────────────────────────────
// // export const authApi = {
// //   signup: (data: { email: string; full_name: string; password: string }) =>
// //     api.post('/auth/signup', data).then((r) => r.data),
// //   login: (data: { email: string; password: string }) =>
// //     api.post('/auth/login', data).then((r) => r.data),
// //   refresh: (refresh_token: string) =>
// //     api.post('/auth/refresh', { refresh_token }).then((r) => r.data),
// // };

// // // ─── Products ────────────────────────────────────────────────────────────────
// // export const productsApi = {
// //   list: (params?: { category?: string; search?: string }) =>
// //     api.get('/products/', { params }).then((r) => r.data),
// //   get: (id: string) => api.get(`/products/${id}`).then((r) => r.data),
// //   create: (data: unknown) => api.post('/products/', data).then((r) => r.data),
// //   update: (id: string, data: unknown) =>
// //     api.put(`/products/${id}`, data).then((r) => r.data),
// //   delete: (id: string) => api.delete(`/products/${id}`),
// //   stats: () => api.get('/products/stats/dashboard').then((r) => r.data),
// // };

// // // ─── Production ──────────────────────────────────────────────────────────────
// // export const productionApi = {
// //   list: (params?: { category?: string; search?: string }) =>
// //     api.get('/production/', { params }).then((r) => r.data),
// //   get: (id: string) => api.get(`/production/${id}`).then((r) => r.data),
// //   create: (data: unknown) => api.post('/production/', data).then((r) => r.data),
// //   update: (id: string, data: unknown) =>
// //     api.put(`/production/${id}`, data).then((r) => r.data),
// //   delete: (id: string) => api.delete(`/production/${id}`),
// // };

// // // ─── Categories ──────────────────────────────────────────────────────────────
// // export const categoriesApi = {
// //   list: () => api.get('/categories/').then((r) => r.data),
// //   create: (name: string) => api.post('/categories/', { name }).then((r) => r.data),
// //   update: (id: string, name: string) =>
// //     api.put(`/categories/${id}`, { name }).then((r) => r.data),
// //   listSizes: () => api.get('/categories/sizes').then((r) => r.data),
// //   createSize: (name: string) =>
// //     api.post('/categories/sizes', { name }).then((r) => r.data),
// //   updateSize: (id: string, name: string) =>
// //     api.put(`/categories/sizes/${id}`, { name }).then((r) => r.data),
// // };

// // // ─── Uploads ─────────────────────────────────────────────────────────────────
// // export const uploadsApi = {
// //   uploadImage: async (file: File): Promise<{ url: string; public_id: string }> => {
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     const { data } = await api.post('/uploads/image', formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' },
// //     });
// //     return data;
// //   },
// //   deleteImage: (publicId: string) =>
// //     api.delete(`/uploads/image/${publicId}`).then((r) => r.data),
// // };


// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// export const api = axios.create({
//   baseURL: BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;
//     if (error.response?.status === 401 && !original._retry) {
//       original._retry = true;
//       const refreshToken = localStorage.getItem('refresh_token');
//       if (refreshToken) {
//         try {
//           const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
//             refresh_token: refreshToken,
//           });
//           localStorage.setItem('access_token', data.access_token);
//           localStorage.setItem('refresh_token', data.refresh_token);
//           original.headers.Authorization = `Bearer ${data.access_token}`;
//           return api(original);
//         } catch {
//           localStorage.removeItem('access_token');
//           localStorage.removeItem('refresh_token');
//           window.location.href = '/auth';
//         }
//       } else {
//         window.location.href = '/auth';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // ─── Auth ────────────────────────────────────────────────────────────────────
// export const authApi = {
//   signup: (data: { email: string; full_name: string; password: string }) =>
//     api.post('/auth/signup', data).then((r) => r.data),
//   login: (data: { email: string; password: string }) =>
//     api.post('/auth/login', data).then((r) => r.data),
//   refresh: (refresh_token: string) =>
//     api.post('/auth/refresh', { refresh_token }).then((r) => r.data),
// };

// // ─── Products ────────────────────────────────────────────────────────────────
// export const productsApi = {
//   list: (params?: { category?: string; search?: string }) =>
//     api.get('/products/', { params }).then((r) => r.data),
//   get: (id: string) => api.get(`/products/${id}`).then((r) => r.data),
//   create: (data: unknown) => api.post('/products/', data).then((r) => r.data),
//   update: (id: string, data: unknown) =>
//     api.put(`/products/${id}`, data).then((r) => r.data),
//   delete: (id: string) => api.delete(`/products/${id}`),
//   stats: () => api.get('/products/stats/dashboard').then((r) => r.data),
// };

// // ─── Production ──────────────────────────────────────────────────────────────
// export const productionApi = {
//   list: (params?: { category?: string; search?: string }) =>
//     api.get('/production/', { params }).then((r) => r.data),
//   get: (id: string) => api.get(`/production/${id}`).then((r) => r.data),
//   create: (data: unknown) => api.post('/production/', data).then((r) => r.data),
//   update: (id: string, data: unknown) =>
//     api.put(`/production/${id}`, data).then((r) => r.data),
//   // No manual delete exposed to frontend
// };

// // ─── Cloths ──────────────────────────────────────────────────────────────────
// export const clothsApi = {
//   list: (params?: { search?: string }) =>
//     api.get('/cloths/', { params }).then((r) => r.data),
//   get: (id: string) => api.get(`/cloths/${id}`).then((r) => r.data),
//   update: (id: string, data: unknown) =>
//     api.put(`/cloths/${id}`, data).then((r) => r.data),
//   // No manual create/delete — auto-managed via product create/delete
// };

// // ─── Categories ──────────────────────────────────────────────────────────────
// export const categoriesApi = {
//   list: () => api.get('/categories/').then((r) => r.data),
//   create: (name: string) => api.post('/categories/', { name }).then((r) => r.data),
//   update: (id: string, name: string) =>
//     api.put(`/categories/${id}`, { name }).then((r) => r.data),
//   listSizes: () => api.get('/categories/sizes').then((r) => r.data),
//   createSize: (name: string) =>
//     api.post('/categories/sizes', { name }).then((r) => r.data),
//   updateSize: (id: string, name: string) =>
//     api.put(`/categories/sizes/${id}`, { name }).then((r) => r.data),
// };

// // ─── Uploads ─────────────────────────────────────────────────────────────────
// export const uploadsApi = {
//   uploadImage: async (file: File): Promise<{ url: string; public_id: string }> => {
//     const formData = new FormData();
//     formData.append('file', file);
//     const { data } = await api.post('/uploads/image', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return data;
//   },
//   deleteImage: (publicId: string) =>
//     api.delete(`/uploads/image/${publicId}`).then((r) => r.data),
// };

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          original.headers.Authorization = `Bearer ${data.access_token}`;
          return api(original);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/';
        }
      } else {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  signup: (data: { email: string; full_name: string; password: string }) =>
    api.post('/auth/signup', data).then((r) => r.data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data).then((r) => r.data),
  refresh: (refresh_token: string) =>
    api.post('/auth/refresh', { refresh_token }).then((r) => r.data),
  // OTP is verified on frontend — this just updates the password in DB
  resetPassword: (email: string, new_password: string) =>
    api.post('/auth/reset-password', { email, new_password }).then((r) => r.data),
};

// ─── Products ────────────────────────────────────────────────────────────────
export const productsApi = {
  list: (params?: { category?: string; search?: string }) =>
    api.get('/products/', { params }).then((r) => r.data),
  get: (id: string) => api.get(`/products/${id}`).then((r) => r.data),
  create: (data: unknown) => api.post('/products/', data).then((r) => r.data),
  update: (id: string, data: unknown) =>
    api.put(`/products/${id}`, data).then((r) => r.data),
  delete: (id: string) => api.delete(`/products/${id}`),
  stats: () => api.get('/products/stats/dashboard').then((r) => r.data),
};

// ─── Production ──────────────────────────────────────────────────────────────
export const productionApi = {
  list: (params?: { category?: string; search?: string }) =>
    api.get('/production/', { params }).then((r) => r.data),
  get: (id: string) => api.get(`/production/${id}`).then((r) => r.data),
  create: (data: unknown) => api.post('/production/', data).then((r) => r.data),
  update: (id: string, data: unknown) =>
    api.put(`/production/${id}`, data).then((r) => r.data),
};

// ─── Cloths ──────────────────────────────────────────────────────────────────
export const clothsApi = {
  list: (params?: { search?: string }) =>
    api.get('/cloths/', { params }).then((r) => r.data),
  get: (id: string) => api.get(`/cloths/${id}`).then((r) => r.data),
  update: (id: string, data: unknown) =>
    api.put(`/cloths/${id}`, data).then((r) => r.data),
};

// ─── Categories ──────────────────────────────────────────────────────────────
export const categoriesApi = {
  list: () => api.get('/categories/').then((r) => r.data),
  create: (name: string) => api.post('/categories/', { name }).then((r) => r.data),
  update: (id: string, name: string) =>
    api.put(`/categories/${id}`, { name }).then((r) => r.data),
  listSizes: () => api.get('/categories/sizes').then((r) => r.data),
  createSize: (name: string) =>
    api.post('/categories/sizes', { name }).then((r) => r.data),
  updateSize: (id: string, name: string) =>
    api.put(`/categories/sizes/${id}`, { name }).then((r) => r.data),
};

// ─── Uploads ─────────────────────────────────────────────────────────────────
export const uploadsApi = {
  uploadImage: async (file: File): Promise<{ url: string; public_id: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  deleteImage: (publicId: string) =>
    api.delete(`/uploads/image/${publicId}`).then((r) => r.data),
};