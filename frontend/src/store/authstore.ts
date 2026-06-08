// import { create } from 'zustand';
// import { authApi } from '@/lib/api';

// export interface AuthUser {
//   id: string;
//   email: string;
//   full_name: string;
//   created_at: string;
// }

// interface AuthState {
//   user: AuthUser | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;

//   login: (email: string, password: string) => Promise<void>;
//   signup: (email: string, fullName: string, password: string) => Promise<void>;
//   logout: () => void;
//   initFromStorage: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,

//   initFromStorage: () => {
//     const token = localStorage.getItem('access_token');
//     const userRaw = localStorage.getItem('auth_user');
//     if (token && userRaw) {
//       try {
//         const user = JSON.parse(userRaw) as AuthUser;
//         set({ user, isAuthenticated: true });
//       } catch {
//         localStorage.removeItem('auth_user');
//       }
//     }
//   },

//   login: async (email, password) => {
//     set({ isLoading: true });
//     try {
//       const data = await authApi.login({ email, password });
//       localStorage.setItem('access_token', data.access_token);
//       localStorage.setItem('refresh_token', data.refresh_token);
//       localStorage.setItem('auth_user', JSON.stringify(data.user));
//       set({ user: data.user, isAuthenticated: true });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   signup: async (email, fullName, password) => {
//     set({ isLoading: true });
//     try {
//       const data = await authApi.signup({ email, full_name: fullName, password });
//       localStorage.setItem('access_token', data.access_token);
//       localStorage.setItem('refresh_token', data.refresh_token);
//       localStorage.setItem('auth_user', JSON.stringify(data.user));
//       set({ user: data.user, isAuthenticated: true });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   logout: () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     localStorage.removeItem('auth_user');
//     set({ user: null, isAuthenticated: false });
//   },
// }));


import { create } from 'zustand';
import { authApi } from '@/lib/api';

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, fullName: string, password: string) => Promise<void>;
  logout: () => void;
  initFromStorage: () => void;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  initFromStorage: () => {
    const token = localStorage.getItem('access_token');
    const userRaw = localStorage.getItem('auth_user');
    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw) as AuthUser;
        set({ user, isAuthenticated: true });
      } catch {
        localStorage.removeItem('auth_user');
      }
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      set({ user: data.user, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (email, fullName, password) => {
    set({ isLoading: true });
    try {
      const data = await authApi.signup({ email, full_name: fullName, password });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      set({ user: data.user, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('auth_user');
    set({ user: null, isAuthenticated: false });
  },

  resetPassword: async (email, newPassword) => {
    await authApi.resetPassword(email, newPassword);
  },
}));