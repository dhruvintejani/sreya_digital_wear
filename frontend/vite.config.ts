import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Target modern browsers — smaller bundle
    target: 'es2020',

    // Increase chunk size warning threshold (default 500kb is too low for React apps)
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        // Manual chunk splitting — separates vendor libs from app code.
        // Browser caches vendor chunk separately so returning users
        // don't re-download React/framer-motion on every deploy.
        manualChunks: {
          // Core React
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library (large — separate chunk)
          'vendor-motion': ['framer-motion'],
          // Form + validation
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // UI utilities
          'vendor-ui': ['axios', 'sonner', 'clsx', 'tailwind-merge'],
          // Select components (react-select is large)
          'vendor-select': ['react-select', 'react-select/creatable'],
        },
      },
    },

    // Enable source maps for production error tracking (optional)
    sourcemap: false,

    // Minify with esbuild (faster than terser, nearly as small)
    minify: 'esbuild',
  },

  // Dev server config
  server: {
    port: 5174,
    // Proxy API calls in development to avoid CORS during local dev
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },

  // Optimize dependencies — pre-bundle these on startup so
  // first page load in dev isn't slow
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'axios',
      'zustand',
      'sonner',
      'react-hook-form',
      'zod',
      '@hookform/resolvers/zod',
      'react-select',
      'react-select/creatable',
    ],
  },
});
