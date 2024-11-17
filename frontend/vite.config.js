import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server (change the port if your backend is running on a different port)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
