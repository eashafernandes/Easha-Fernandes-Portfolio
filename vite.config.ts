
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Set this to your repository name
  base: '/portfolio/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
