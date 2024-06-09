import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig({
  plugins: [macrosPlugin(), react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://son-server.fly.dev/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});