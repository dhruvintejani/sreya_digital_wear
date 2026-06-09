import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-ui': ['axios', 'sonner', 'clsx', 'tailwind-merge'],
          'vendor-select': ['react-select', 'react-select/creatable'],
        },
      },
    },
    sourcemap: false,
    minify: 'esbuild',
  },

  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },

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